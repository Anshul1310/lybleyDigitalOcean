import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import api from "../../http";
import Sidebar from "../../Components/sidebar/Sidebar"
import Navbar from "../../Components/navbar/Navbar"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const AddAdmin = () => {
    const [showSidebar, setShowSidebar] = useState(true)
    const toggleSideBar = () => {
        setShowSidebar(!showSidebar)
    }

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    let access = { "sellers": false, "categories": true, "earnings": false, "stores": false, "home": true, "staticProducts": false, "admin": false, "buyers": false, "news": false, "notifications": false, "products": false, "orders": false };
    const navigate = useNavigate();


    const handleClick = (e) => {
        e.preventDefault();
        api.post("/api/admin/add", {
            name, email, password, access
        }).then((data) => {
            navigate("/admins");
            console.log(data.data);
        }).catch((err) => {
            // alert("Network Conncetion Error");
            console.log(err);
        });
    }

    const handleAccessChange = (e) => {
        console.log(access);
        let key = e.target.name;
        let value = e.target.checked;
        access[key] = value
        console.log(access);
    }
    return (
        <>
            <div className="main">
                {showSidebar ? <div className="Sidebar"><Sidebar /></div> : <div className="SidebarSmall"><Sidebar /></div>}
                <div className="flex-container" style={showSidebar ? { marginLeft: '258px' } : { marginLeft: '95px' }}>
                    <Navbar toggleSideBar={toggleSideBar} />
                    <div className="AddAdminPage">
                        <div className="flex-container d-flex flex-row align-items-center align-self-center">
                            <a href='/admins' className="arrowBack"><ArrowBackIcon style={{ fontSize: '30px' }} className="arrowBack" /></a>
                            <h2 style={{ marginLeft: "17px", textDecoration: 'underline' }}>Add Admin</h2>
                        </div>
                        <div className="container border p-4 mb-2 border-opacity-50">
                            <form>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon3">Name</span>
                                    <input type="text" className="form-control" onChange={(e) => setName(e.target.value)} id="basic-url" aria-describedby="basic-addon3" />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon3">Email</span>
                                    <input type="text" className="form-control" onChange={(e) => setEmail(e.target.value)} id="basic-url" aria-describedby="basic-addon3" />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon3">Password</span>
                                    <input type="text" className="form-control" onChange={(e) => setPassword(e.target.value)} id="basic-url" aria-describedby="basic-addon3" />
                                </div>

                                <fieldset className="row mb-3">
                                    <legend className="col-form-label col-sm-1 pt-0">Access</legend>
                                    <div className="col-sm-10">
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" onChange={(e) => handleAccessChange(e)} />
                                            <label className="form-check-label" htmlFor="inlineCheckbox1">Add Product</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" onChange={(e) => handleAccessChange(e)} />
                                            <label className="form-check-label" htmlFor="inlineCheckbox1">Add Seller</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" defaultChecked={access.stores} onChange={(e) => handleAccessChange(e)} />
                                            <label className="form-check-label" htmlFor="inlineCheckbox1">Add Stores</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" onChange={(e) => handleAccessChange(e)} />
                                            <label className="form-check-label" htmlFor="inlineCheckbox1">Add Buyers</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" onChange={(e) => handleAccessChange(e)} />
                                            <label className="form-check-label" htmlFor="inlineCheckbox1">Add Admins</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" onChange={(e) => handleAccessChange(e)} />
                                            <label className="form-check-label" htmlFor="inlineCheckbox1">Earnings Page</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" onChange={(e) => handleAccessChange(e)} />
                                            <label className="form-check-label" htmlFor="inlineCheckbox1">Push Notification</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" onChange={(e) => handleAccessChange(e)} />
                                            <label className="form-check-label" htmlFor="inlineCheckbox1">Add News</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" onChange={(e) => handleAccessChange(e)} />
                                            <label className="form-check-label" htmlFor="inlineCheckbox1">Add Categories</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" onChange={(e) => handleAccessChange(e)} />
                                            <label className="form-check-label" htmlFor="inlineCheckbox1">Orders</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" onChange={(e) => handleAccessChange(e)} />
                                            <label className="form-check-label" htmlFor="inlineCheckbox1">Static Products</label>
                                        </div>
                                    </div>
                                </fieldset>


                                <button type="submit" className="btn btn-primary" onClick={(e) => handleClick(e)}>Add admin</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddAdmin