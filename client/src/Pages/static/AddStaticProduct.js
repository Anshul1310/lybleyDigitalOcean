import Sidebar from "../../Components/sidebar/Sidebar"
import Navbar from "../../Components/navbar/Navbar"
import React, { useState } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import api from "../../http";
import './staticProducts.css'

const AddStaticProduct = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState();
    const [measuringUnit, setMeasuringUnit] = useState();
    const [image, setImage] = useState();
    const [price, setPrice] = useState();
    const [location, setLocation] = useState();

    const handleClick = (e) => {
        e.preventDefault()
        api.post("/api/product-price/add", {
            title, measuringUnit, image, price, location
        }).then((data) => {
            navigate("/staticProducts")
        }).catch((err) => {
            // alert("Network Conncetion Error");
            // console.log(err);
        });
    }

    const handleChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            setImage(reader.result);
        }
    }

    const [showSidebar, setShowSidebar] = useState(true)
    const toggleSideBar = () => {
        setShowSidebar(!showSidebar)
    }
    return (
        <div className="main">
            {showSidebar ? <div className="Sidebar"><Sidebar /></div> : <div className="SidebarSmall"><Sidebar /></div>}
            <div className="flex-container" style={showSidebar ? { marginLeft: '258px' } : { marginLeft: '95px' }}>
                <Navbar toggleSideBar={toggleSideBar} />
                <div className="addStaticProductPage">
                    <div className="flex-container d-flex flex-row align-items-center align-self-center">
                        <a href='/staticProducts' className="arrowBack"><ArrowBackIcon style={{ fontSize: '30px' }} className="arrowBack" /></a>
                        <h2 style={{ marginLeft: "17px", textDecoration: 'underline' }}>Add Product</h2>
                    </div>
                    <div className="container border p-4 mb-2 border-opacity-50">
                        <form>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon3">Product Name</span>
                                <input type="text" className="form-control" onChange={(e) => setTitle(e.target.value)} placeholder="Ex-Cookie" id="basic-url" aria-describedby="basic-addon3" />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon3">Unit Of Measurement</span>
                                <input type="text" className="form-control" onChange={(e) => setMeasuringUnit(e.target.value)} placeholder="Ex-kg" id="basic-url" aria-describedby="basic-addon3" />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon3">Price</span>
                                <input type="text" className="form-control" onChange={(e) => setPrice(e.target.value)} placeholder="Ex-$750" id="basic-url" aria-describedby="basic-addon3" />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon3">Location</span>
                                <input type="text" className="form-control" onChange={(e) => setLocation(e.target.value)} placeholder="Random" id="basic-url" aria-describedby="basic-addon3" />
                            </div>
                            <div className="input-group mb-3">
                                <input type="file" className="form-control" id="inputGroupFile02" onChange={(e) => handleChange(e)} />
                                {/* <img width="100%" height="100%" src={image} /> */}
                                <label className="input-group-text" htmlFor="inputGroupFile02">Upload</label>
                            </div>
                            <button type="submit" className="btn btn-primary" onClick={(e) => handleClick(e)}>Add Product</button>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AddStaticProduct