const Order=require("../models/Order");
const Settings =require("../models/Settings");
const Transaction =require("../models/Transaction");
const Buyer=require("../models/Buyer");
const options = require('../helpers/options');

const fs = require('fs');
const dayjs=require("dayjs");

const niceInvoice = require("nice-invoice");



const path = require('path');

const Product =require("../models/Product");
const router = require("express").Router();
  var FCM = require('fcm-node');
  const Notification=require("../models/Notification");

    var serverKey = 'AAAA6cImtQQ:APA91bF7yvHb9UUP4rQSNzmnIdGDDHnS8K4xWWwhcoe2kfwcsBShrlf9knU-vVXCV3AxCqBTtqz3poVvQkTntkgFptCqhNqKOvx47aHWqbc8zg48pFSxsXJW-IzHzSBNU8IZcX96Ovmw';
    var fcm = new FCM(serverKey);



	const generatePdf = async (order,req, res) => {

		const buyer=await Buyer.findOne({_id:order.buyer});
		var created_date = new Date(order.createdAt);
		var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
		var year = created_date.getFullYear();
		var month = months[created_date.getMonth()];
		var date = created_date.getDate();
		let items=[];
		let sum=0;
		for(let i=0;i<order.items.length;i++){
			let item=order.items[i].title;
			let quantity=Number(order.items[i].quantity);
			let price=Number(order.items[i].price);
			let description="";
			let tax="0%";
			sum+=(price*quantity);
			const obj={item, quantity, price, description,tax}
			console.log(obj)

			items[i]=obj;
		}
		
		const invoiceDetail = {
			shipping: {
			  name: buyer.name,
			  address: order.address,
			  city: "",
			  state: "",
			  country: "",
			  postal_code: 94111
			},
			items,
			subtotal: sum,
			total: order.totalPrice,
			order_number: order.orderId,
			header:{
				company_name: "Lybley Marketplace",
				company_logo: "logo.png",
				company_address: "A-9, A Block, Sector 59, Noida, Uttar Pradesh 201309"
			},
			footer:{
				text:"Lybley India Pvt Ltd"
			},
			currency_symbol:"&", 
			date: {
			  billing_date: date +" "+month+" "+year,
			  
			}
		};
		niceInvoice(invoiceDetail, "./docs/invoice.pdf");
	}





router.post("/download",async (req,res)=>{
	try{
		const order=await Order.findOne({orderId:req.body.orderId});
		generatePdf(order,req,res).then((data)=>{
			var data =fs.readFileSync('./docs/invoice.pdf');
res.contentType("application/pdf");
res.send(data);
		});
		
	}catch(er){
		console.log(er)
		res.status(400).json({msg:er});
	}
})






const sendOrderNotification=(orderId, status, fcmToken)=>{
	var message = {
		to:fcmToken,
			notification: {
				title: "Order Notification",
				body: "Your order("+orderId+") from Lybley is "+status
			},
	 };
fcm.send(message, async function (err, response) {
});
}



const sendOrderNotificationAdmin=(orderId)=>{
	var message = {
		to:"/topics/admin",
			notification: {
				title: "Order Notification",
				body: "New order("+orderId+") received. "
			},
	 };

fcm.send(message, async function (err, response) {
});
}

router.post("/add",async (req,res)=>{
	try{
		console.log(req.body);
		const obj=await Settings.findOne();
		const number=obj.orderIndex;
		await Settings.updateOne({
			orderIndex:number+1
		})
		const orderNumber="Order Id: #"+number;
		const order=await Order.create({...req.body, orderId:orderNumber});
		req.body.items.map(async (value)=>{
				const {seller, price, quantity, productId}=value;
				const productTemp=await Product.findOne({_id:productId});
				const quant=(productTemp.stock)-quantity;
				const sold=(productTemp.sold)+quantity;
				const product=await Product.updateOne({_id:productId},{
					"$set":{stock:quant, sold:sold}
				})
			})
			sendOrderNotificationAdmin(orderNumber);

		res.status(200).json(order);
	}catch(er){
		console.log(er);
		res.status(400).json({msg:"error"});
	}
})

router.get("/seller/stats/:id",async (req, res)=>{
	try{
		const obj=await Order.find( { _id:req.params.id,$where: function() { 
		    today = new Date(); //
		    today.setHours(0,0,0,0);
		    return (this._id.getTimestamp() >= today)
		} } );
	}catch(e){
		console.log(e);
	}
	
})

router.post("/cancelOrder",async (req, res)=>{
	try{
		console.log(req.body);
		req.body.items.map(async (value)=>{
				const {seller, price, quantity, productId}=value;
				const productTemp=await Product.findOne({_id:productId});
				const quant=parseInt(productTemp.stock)+parseInt(quantity);
				console.log(quant);
				const product=await Product.updateOne({_id:productId},{
					"$set":{stock:quant}
				})
			})
		const news=await Order.deleteOne({orderId:req.body.orderId});
		res.status(200).json("success");
	}catch(e){
		console.log(e);
	}
	
})

router.get("/recent",async (req,res)=>{
	try{
		const product=await Order.find().sort({"_id":-1}).limit(5);
		res.status(200).json(product);
	}catch(er){
		res.status(404).json({msg:"Something went wrong"})
		console.log(er);
	}
})



router.post("/update",async (req,res)=>{
	try{
		await Order.updateOne({orderId:req.body.orderId},{
			"$set":{
				...req.body
			}
		});

		const buyer=await Buyer.findOne({_id:req.body.buyer});
		const order=await Order.findOne({orderId:req.body.orderId});
		if(req.body.status=="delivered"){
			order._doc.items.map(async (value)=>{
				const {seller, price, quantity, productId}=value;

				const  transaction=await Transaction.create({
				payout:(price*quantity),
				seller,
				type:"credit",
				})
			})
		}else{
			res.status(200).json(order);

		}
		sendOrderNotification(req.body.orderId, req.body.status, buyer.fcmToken);
		res.status(200).json("success");

	}catch(er){
		console.log(er);
		res.status(400).json("error");
	}
})


router.get("/all",async (req,res)=>{
	try{
		const order=await Order.find().sort({"_id":-1});;
		res.status(200).json(order);
	}catch(er){
		res.status(400).json("error");
	}
})
router.get("/find/user/:id",async (req,res)=>{
	try{
		const order=await Order.find({buyer:req.params.id}).sort({"_id":-1});;
		res.status(200).json(order);
	}catch(er){
		res.status(400).json({msg:"error"});
	}
})




router.get("/find/seller/:id",async (req,res)=>{
	try{
		const order=await Order.find({seller:req.params.id}).sort({"_id":-1});;
		res.status(200).json(order);
	}catch(er){
		res.status(400).json("error");
	}
})

router.get("/dispatched",async (req,res)=>{
	try{
		const order=await Order.find({status:"dispatched"}).sort({"_id":-1});;
		res.status(200).json(order);
	}catch(er){
		res.status(400).json("error");
	}
})

router.get("/delivered",async (req,res)=>{
	try{
		const order=await Order.find({status:"delivered"}).sort({"_id":-1});;
		res.status(200).json(order);
	}catch(er){
		res.status(400).json("error");
	}
})

router.get("/onTheWay",async (req,res)=>{
	try{
		const order=await Order.find({status:"preparing"}).sort({"_id":-1});;
		res.status(200).json(order);
	}catch(er){
		res.status(400).json("error");
	}
})

router.get("/preparing",async (req,res)=>{
	try{
		const order=await Order.find({status:"preparing"}).sort({"_id":-1});;
		res.status(200).json(order);
	}catch(er){
		res.status(400).json("error");
	}
})

router.get("/:id",async (req,res)=>{
	try{
		const order=await Order.find({_id:req.params.id}).sort({"_id":-1});;
		res.status(200).json(order);
	}catch(er){
		res.status(400).json({msg:"error"});
	}
})

module.exports=router;
