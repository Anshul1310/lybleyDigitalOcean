import "./Products.css";
import Sidebar from "../../Components/sidebar/Sidebar"
import Navbar from "../../Components/navbar/Navbar"
import { useLocation } from 'react-router-dom'
import VisibilityIcon from '@mui/icons-material/Visibility';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import React from 'react'
import baseUrl from "../../http/Constant";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useNavigate } from 'react-router-dom'
import api from "../../http";
import LinearProgress from "@mui/material/LinearProgress";

import { useEffect, useState, useRef } from "react";
import { Editor } from '@tinymce/tinymce-react';

const AddProduct = () => {
    const location = useLocation();
    const [image1,setImage1]=useState("");
    const [image2,setImage2]=useState("");
    const [image3,setImage3]=useState("");
    const [image4,setImage4]=useState("");
    
    const navigate = useNavigate();
    const [id, setId] = useState(null);
    const [sellers, setSellers] = useState([]);
    const [stores, setStores] = useState([]);
    const [store, setStore] = useState(null);
    const [stock, setStock] = useState(1);
    const [variant, setVariant]=useState("");
    const [details,setDetails] = useState(null);
    const [customerPrice, setCustomerPrice] = useState(null);
    const [seller, setSeller] = useState(null);
    const [categories, setCategories] = useState([]);
    const [title, setTitle] = useState("");
    const [deliveryCharge, setDeliveryCharge] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [isChanged, setIsChanged] = useState(false);
    const [measuringUnit, setMeasuringUnit] = useState("");
    const [price, setPrice] = useState("");
    const [brand, setBrand] = useState("");
    const [slashedPrice, setSlashePrice] = useState("");
    const [moq, setMoq] = useState("");
    const [image, setImage] = useState("#");
    useEffect(() => {
        if (location.state != null) {
            let from = location.state.from;
            if (from != null) {
                setTitle(from.title);
                setDescription(from.description);
                setCategory(from.category);
                setMoq(from.moq);
                setPrice(from.price);
                setDetails(from.details);
                setVariant(from.variant);
                setDeliveryCharge(from.deliveryCharge);
                setBrand(from.brand);
                setSeller(from.seller)
                setStock(from.stock)

                setImage1(from.image1)
                setImage2(from.image2)
                setImage3(from.image3)
                setImage4(from.image4)

                setStore(from.store)
                setCustomerPrice(from.customerPrice);
                setId(from._id);
                setSlashePrice(from.slashedPrice);
                setMeasuringUnit(from.measuringUnit);
                setMoq(from.moq)
                setImage(from.image);

            }
        }
        api.get("/api/categories/all").then((data) => {
            setCategories(data.data);
            if(location.state==undefined){
                setCategory(data.data[0].category);
            }
          
            api.get("/api/sellers/all/verified").then((data) => {
                setSellers(data.data);
                if(location.state==undefined){
                    setSeller(data.data[0]._id)

                }
                api.get("/api/stores/all").then((data) => {
                    setStores(data.data);
                    if(location.state==undefined){
                        setStore(data.data[0].name)
                    }
                    
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                alert("1Network Conncetion Error");
                console.log(err);
            });
        }).catch((err) => {
            alert("1Network Conncetion Error");
            console.log(err);
        });


    }, []);
    const uploadProduct = (e) => {
        setVisiblity("flex")
        e.preventDefault();
        if (id != null) {
            
            api.post("/api/product/update", {
                title, id, description,image1, image2,variant, image3, image4, category,customerPrice, brand,isChanged, deliveryCharge,stock, seller, details, store, measuringUnit, price, slashedPrice, moq, image: image.replace(baseUrl, "")
            }).then((data) => {
                setVisiblity("none")
                navigate("/products");
            }).catch((err) => {
                setVisiblity("none")
                alert(err.response.data);
            });
        } else {
            api.post("/api/product/add", {
                title, id, description,customerPrice,image1,variant, isText:true,image2, image3, image4, brand,category,deliveryCharge, stock, isChanged, seller,details, store, measuringUnit, price, slashedPrice, moq, image: image.replace(baseUrl, "")
            }).then((data) => {
                setVisiblity("none")
                navigate("/products");
            }).catch((err) => {
                setVisiblity("none")
                alert(err.response.data);
            });
        }
    }

    const [showSidebar, setShowSidebar] = useState(true)
    const toggleSideBar = () => {
        setShowSidebar(!showSidebar)
    }
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };
    const handleChange1 = (content, editor) => {
        setDescription(content)
    }
    const [visiblity,setVisiblity] = useState("none");



    const handleChange = (e) => {
        console.log(e.target.id)
        const file = e.target.files[0];
        //to convert file to base64 string
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            // setVisiblity("flex")
            api.post("/api/settings/upload", { image: reader.result, type:"product" }).then((data) => {
                setVisiblity("none")
                if (e.target.id == "image1") {
                    setImage1(baseUrl + "" + data.data)
                } else if (e.target.id == "image2") {
                    setImage2(baseUrl + "" + data.data)
                } else if (e.target.id == "image3") {
                    setImage3(baseUrl + "" + data.data)
                } else if (e.target.id == "image4") {
                    setImage4(baseUrl + "" + data.data)
                } else if(e.target.id == "image"){
                    setImage(baseUrl + "" + data.data)
                }

            }).catch((err) => {
                console.log(err);
            });
        }
    }




    return (
        <>
            <div className="main">
                {showSidebar ? <div className="Sidebar"><Sidebar /></div> : <div className="SidebarSmall"><Sidebar /></div>}
                <div className="flex-container" style={showSidebar ? { marginLeft: '258px' } : { marginLeft: '95px' }}>
                    <Navbar toggleSideBar={toggleSideBar} />
                    <LinearProgress variant="indeterminate" 
                      value={0} 
                      style={{"display":visiblity}}
                      />
                    <div className="Addproductpage">
                        <div className="flex-container d-flex flex-row align-items-center align-self-center">
                            <a href='/products' className="arrowBack"><ArrowBackIcon style={{ fontSize: '30px' }} className="arrowBack" /></a>
                            <h2 style={{ marginLeft: "17px", textDecoration: 'underline' }}>{window.location.pathname === '/addproduct' ? "Add" : "Edit"} Product</h2>
                        </div>
                        <div className="container border p-4 mb-2 border-opacity-50">
                            <form>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon3">Product Name</span>
                                    <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} id="basic-url" aria-describedby="basic-addon3" placeholder="Ex=Iphone13" />
                                </div>
                                <Editor
                                    apiKey='tn5tqwvxpo8nwxc0wrxzysxl5grquiu07q1nrshi30ynb9ps'
                                    onInit={(evt, editor) => editorRef.current = editor}
                                    value={description}
                                    init={{
                                        height: 200,
                                        menubar: false,
                                        plugins: [
                                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                                        ],
                                        toolbar: 'undo redo | blocks | image ' +
                                            'bold italic forecolor | alignleft aligncenter ' +
                                            'alignright alignjustify | bullist numlist outdent indent | ' +
                                            'removeformat | help',
                                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                    }}
                                    onEditorChange={handleChange1}
                                />
                                <button onClick={log} style={{ display: 'none' }}>Log editor content</button>
                                {/* <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon3">Product Description</span>
                                    <input type="text" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} id="basic-url" aria-describedby="basic-addon3" placeholder="Ex-The iPhone 13 models come in 5.4 and 6.1-inch sizes, with the 5.4-inch iPhone 13 Pro positioned as Apple's smallest iPhone" />
                                </div> */}
                                <div className="input-group mb-3" style={{ marginTop: '15px' }}>
                                    <label className="input-group-text" htmlFor="inputGroupSelect01">Category</label>
                                    <select  value={category}  id="inputGroupSelect01" name="category" onChange={(e) => setCategory(e.target.value)} className="form-select">
                                        {
                                            categories.map((data, id) => {
                                                return <option value={data.name}>{data.name}</option>
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="input-group mb-3">
                                    <label className="input-group-text" htmlFor="inputGroupSelect01">Sellers</label>
                                    <select id="inputGroupSelect01"  onChange={(e) => setSeller(e.target.value)} className="form-select" value={seller}>
                                        {
                                            sellers.map((data, id) => {
                                                return <option value={data._id}>{data._id}</option>

                                            })
                                        }
                                    </select>
                                </div>
                                <div className="input-group mb-3">
                                    <label className="input-group-text" htmlFor="inputGroupSelect01">Store</label>
                                    <select id="inputGroupSelect01" onChange={(e) => setStore(e.target.value)} className="form-select" value={store} >
                                        {
                                            stores.map((data, id) => {
                                                return <option value={data.name}>{data.name}</option>

                                            })
                                        }
                                    </select>
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon3">Unit Of Measurement</span>
                                    <input type="text" className="form-control" value={measuringUnit} onChange={(e) => { setMeasuringUnit(e.target.value) }} id="basic-url" aria-describedby="basic-addon3" placeholder="Ex-kg" />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon3">Available Stock</span>
                                    <input type="text" className="form-control" value={stock} onChange={(e) => { setStock(e.target.value) }} id="basic-url" aria-describedby="basic-addon3" placeholder="Ex-1000" />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon3">Details</span>
                                    <input type="textarea" className="form-control" value={details} onChange={(e) => { setDetails(e.target.value) }} id="basic-url" aria-describedby="basic-addon3" placeholder="e.g. field1:value; field2:value" />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon3">Customer Price</span>
                                    <input type="text" className="form-control" value={customerPrice} onChange={(e) => { setCustomerPrice(e.target.value) }} id="basic-url" aria-describedby="basic-addon3" placeholder="Ex. 1000" />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon3">Slashed Price</span>
                                    <input type="text" className="form-control" value={slashedPrice} onChange={(e) => setSlashePrice(e.target.value)} id="basic-url" aria-describedby="basic-addon3" placeholder="Ex-100" />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon3">Brand</span>
                                    <input type="text" className="form-control" value={brand} onChange={(e) => setBrand(e.target.value)} id="basic-url" aria-describedby="basic-addon3" placeholder="Orient" />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon3">Delivery Charge</span>
                                    <input type="text" className="form-control" value={deliveryCharge} onChange={(e) => setDeliveryCharge(e.target.value)} id="basic-url" aria-describedby="basic-addon3" placeholder="Orient" />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon3">Minimum Order quantity</span>
                                    <input type="text" className="form-control" value={moq} onChange={(e) => setMoq(e.target.value)} id="basic-url" aria-describedby="basic-addon3" placeholder="Ex-100" />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon3">price</span>
                                    <input type="text" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} id="basic-url" aria-describedby="basic-addon3" placeholder="Ex-100" />
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon3">Variant</span>
                                    <input type="text" className="form-control" value={variant} onChange={(e) => setVariant(e.target.value)} id="basic-url" aria-describedby="basic-addon3" placeholder="Ex-100" />
                                </div>




                                {/* This is images */}
                                <div>
                                <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon2">Image0</span>

                                    <input type="file" onChange={(e) => handleChange(e)} className="inputFile" id="image" />
                                    <input type="text" placeholder='banner' className="form-control" id="banner4" value={image} />

                                    <span className="input-group-text" id="basic-addon2" ><a target="_blank" href={image}><VisibilityIcon /></a></span>
                                    <span className="input-group-text" id="basic-addon2"> <label htmlFor="image" className="input-group-text" ><UploadFileIcon /></label></span>

                                </div>
                            </div>


                                <div>
                                <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon2">Image1</span>

                                    <input type="file" onChange={(e) => handleChange(e)} className="inputFile" id="image1" />
                                    <input type="text" placeholder='banner' className="form-control" id="banner4" value={image1} />

                                    <span className="input-group-text" id="basic-addon2" ><a target="_blank" href={image1}><VisibilityIcon /></a></span>
                                    <span className="input-group-text" id="basic-addon2"> <label htmlFor="image1" className="input-group-text" ><UploadFileIcon /></label></span>

                                </div>
                            </div>



                            <div>
                                <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon2">Image2</span>

                                    <input type="file" onChange={(e) => handleChange(e)} className="inputFile" id="image2" />
                                    <input type="text" placeholder='banner' className="form-control" id="banner4" value={image2} />

                                    <span className="input-group-text" id="basic-addon2" ><a target="_blank" href={image2}><VisibilityIcon /></a></span>
                                    <span className="input-group-text" id="basic-addon2"> <label htmlFor="image2" className="input-group-text" ><UploadFileIcon /></label></span>

                                </div>
                            </div>



                            <div>
                                <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon2">Image3</span>

                                    <input type="file" onChange={(e) => handleChange(e)} className="inputFile" id="image3" />
                                    <input type="text" placeholder='banner' className="form-control" id="banner4" value={image3} />

                                    <span className="input-group-text" id="basic-addon2" ><a target="_blank" href={image3}><VisibilityIcon /></a></span>
                                    <span className="input-group-text" id="basic-addon2"> <label htmlFor="image3" className="input-group-text" ><UploadFileIcon /></label></span>

                                </div>
                            </div>



                            <div>
                                <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon2">Image4</span>

                                    <input type="file" onChange={(e) => handleChange(e)} className="inputFile" id="image4" />
                                    <input type="text" placeholder='banner' className="form-control" id="banner4" value={image4} />

                                    <span className="input-group-text" id="basic-addon2" ><a target="_blank" href={image4}><VisibilityIcon /></a></span>
                                    <span className="input-group-text" id="basic-addon2"> <label htmlFor="image4" className="input-group-text" ><UploadFileIcon /></label></span>

                                </div>
                            </div>

                                <button type="submit" className="btn btn-primary" onClick={(e) => uploadProduct(e)}>Add Product</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddProduct