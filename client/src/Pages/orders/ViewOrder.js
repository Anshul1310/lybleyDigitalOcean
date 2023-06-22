import "./orders.css";
import React, { useState, useEffect } from 'react'
import Sidebar from "../../Components/sidebar/Sidebar"
import Navbar from "../../Components/navbar/Navbar"
import TableRow from "./TableRow";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import api from "../../http";
import baseUrl from "../../http/Constant";
import EditIcon from '@mui/icons-material/Edit';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import items from '../../ProductsData'

const ViewOrder = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { from } = location.state;
    const [status, setStatus] = useState(from.status)
    const [date, setDate] = useState(from.date);
    const [name, setName] = useState("");
    const [note, setNote] = useState(from.note)
    const [buyer, setBuyer] = useState(from.buyer);
    const [items, setItems] = useState(from.items);
    const [orderId, setOrderId] = useState(from.orderId)

    const downloadinvoice=(e)=>{
 

    api({
        method:"post",
        url:"/api/order/download",
        responseType: 'blob',
        data: {orderId:orderId}
    }).then((data) => {
        window.open(URL.createObjectURL(data.data)); console.log(data)
    }).catch((err) => {
        console.log(err)
    });
    }
    const cancelOrder = (e) => {
        api.post("/api/order/cancelOrder", {
            ...from
        }).then((data) => {
            navigate("/orders");
        }).catch((err) => {
            alert("Network Conncetion Error");
            console.log(err);
        });
    }

    useEffect(() =>{
        api.get("/api/buyers/find/id/"+from.buyer).then((data) => {
                setName(data.data.name);
        }).catch((err) => {
            // alert("Network Conncetion Error");
            // console.log(err);
        });
    },[]);

    const handleChange = (e) => {
        api.post("/api/order/update", {
            status, date, note, buyer, items, orderId
        }).then((data) => {
            alert("Sucess")
            navigate("/orders");

        }).catch((err) => {
            // alert("Network Conncetion Error");
            // console.log(err);
        });
    }
    const [showSidebar, setShowSidebar] = useState(true)
    const toggleSideBar = () => {
        setShowSidebar(!showSidebar)
    }
    return (
        <div className="main">
            {showSidebar ? <div className="Sidebar"><Sidebar /></div> : <div className="SidebarSmall"><Sidebar /></div>}
            <div className="container1" style={showSidebar ? { marginLeft: '258px' } : { marginLeft: '95px' }}>
                <Navbar toggleSideBar={toggleSideBar} />
                <div className="OrdersPage">
                    <div className="viewOrderHead">
                        <Link to='/orders' className="arrowBack"><ArrowBackIcon style={{ fontSize: '30px' }} className="arrowBack" /></Link>
                        <h2 style={{ marginLeft: "17px", textDecoration: 'underline' }}>Order Details</h2>
                    </div>
                    <div className="row g-3">
                        <div className="col-md-6">
                            <div className="input-group">
                                <div className="input-group-text">Buyer</div>
                                <input type="text" className="form-control" id="autoSizingInputGroup" value={name} onChange={(e) => setBuyer(e.target.value)} placeholder="Cortie Gemson" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="input-group">
                                <div className="input-group-text">Order ID</div>
                                <input type="text" className="form-control" id="autoSizingInputGroup" value={orderId} placeholder="John Doe" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="input-group">
                                <div className="input-group-text">Notes</div>
                                <input type="text" className="form-control" onChange={(e) => setNote(e.target.value)} value={note} id="autoSizingInputGroup" placeholder="Imported Perfumes" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="input-group">
                                <div className="input-group-text">Date</div>
                                <input type="text" className="form-control" id="autoSizingInputGroup" placeholder="03/09/2022" disabled value={date} />
                            </div>
                        </div>
                        <div className="col-md-6 input-group">
                            <label className="input-group-text" htmlFor="inputGroupSelect01">Status</label>
                            <select className="form-select" id="inputGroupSelect01" onChange={(e) => setStatus(e.target.value)} value={status}>
                                <option value="dispatched">Dispatched</option>
                                <option value="preparing">Preparing</option>
                                <option value="onTheWay">On The Way</option>
                                <option value="delivered">Delievered</option>
                            </select>
                        </div>
                        <div className="d-flex" style={{ columnGap: '10px' }}>
                            <button type="submit" className="btn btn-success" onClick={(e) => handleChange(e.target.value)}><EditIcon /> Edit Order</button>
                            <button type="submit" className="btn btn-danger" onClick={(e) => cancelOrder(e.target.value)}>Cancel Order</button>
                            <button type="submit" className="btn btn-danger" onClick={(e) => downloadinvoice(e.target.value)}>Download Invoice</button>

                            <Link className="btn btn-danger" to="/orders" role="button"><CloseIcon />Close</Link>
                        </div>
                    </div>
                </div>


                <div className="OrdersPageTable">
                    <table className='table table-primary table-striped' style={{ marginBottom: '0' }}>
                        <thead>
                            <tr>
                                <th scope="col">IMAGE</th>
                                <th scope="col">TITLE</th>
                                <th scope="col">PRICE</th>
                                <th scope="col">MEASURING UNIT</th>
                                <th scope="col">QUANTITY</th>
                                <th scope="col">SELLER</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                items.map((data, key) => {
                                    return <TableRow key={key} quantity={data.quantity} title={data.title} image={data.image} measuringUnit={data.measuringUnit} price={data.price} stock={data.stock} seller={data.seller} />
                                })
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ViewOrder;
