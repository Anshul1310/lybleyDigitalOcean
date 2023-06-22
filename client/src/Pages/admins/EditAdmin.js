import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import api from "../../http";
import Sidebar from "../../Components/sidebar/Sidebar"
import Navbar from "../../Components/navbar/Navbar"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const EditAdmin = () => {
    const location = useLocation();
    const { from } = location.state;
    console.log(from);
    const [name, setName] = useState(from.name);
    const [email, setEmail] = useState(from.email);
    const [password, setPassword] = useState(from.password);
    let access = from.access;
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault()
        api.post("/api/admin/update", {
            name, email, id: from.id, password, access
        }).then((data) => {
            navigate("/admins");

        }).catch((err) => {
            alert("Network Conncetion Error");
            console.log(err);
        });
    }

    useEffect(() => {
        console.log(from.access)
    })

    const handleAccessChange = (e) => {
        console.log(access);
        let key = e.target.name;
        let value = e.target.checked;
        access[key] = value
        console.log(access);
    }

    const [showSidebar, setShowSidebar] = useState(true)
    const toggleSideBar = () => {
        setShowSidebar(!showSidebar)
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
                            <h2 style={{ marginLeft: "17px", textDecoration: 'underline' }}>Edit Admin</h2>
                        </div>
                        <div className="container border p-4 mb-2 border-opacity-50">
                            <form>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon3">Name</span>
                                    <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} id="basic-url" aria-describedby="basic-addon3" />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon3">Email</span>
                                    <input type="text" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} id="basic-url" aria-describedby="basic-addon3" />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon3">Password</span>
                                    <input type="text" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} id="basic-url" aria-describedby="basic-addon3" />
                                </div>
                                <fieldset className="row mb-3">
                                    <legend className="col-form-label col-sm-1 pt-0">Access</legend>
                                    <div className="col-sm-10">
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" defaultChecked={access.products} onChange={(e) => handleAccessChange(e)} />
                                            <label className="form-check-label" htmlFor="inlineCheckbox1">Add Product</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" defaultChecked={access.sellers} onChange={(e) => handleAccessChange(e)} />
                                            <label className="form-check-label" htmlFor="inlineCheckbox1">Add Seller</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" defaultChecked={access.stores} onChange={(e) => handleAccessChange(e)} />
                                            <label className="form-check-label" htmlFor="inlineCheckbox1">Add Stores</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" defaultChecked={access.buyers} onChange={(e) => handleAccessChange(e)} />
                                            <label className="form-check-label" htmlFor="inlineCheckbox1">Add Buyers</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" defaultChecked={access.admin} onChange={(e) => handleAccessChange(e)} />
                                            <label className="form-check-label" htmlFor="inlineCheckbox1">Add Admins</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" defaultChecked={access.earnings} onChange={(e) => handleAccessChange(e)} />
                                            <label className="form-check-label" htmlFor="inlineCheckbox1">Earnings Page</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" defaultChecked={access.notifications} onChange={(e) => handleAccessChange(e)} />
                                            <label className="form-check-label" htmlFor="inlineCheckbox1">Push Notification</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" defaultChecked={access.news} onChange={(e) => handleAccessChange(e)} />
                                            <label className="form-check-label" htmlFor="inlineCheckbox1">Add News</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" defaultChecked={access.categories} onChange={(e) => handleAccessChange(e)} />
                                            <label className="form-check-label" htmlFor="inlineCheckbox1">Add Categories</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" defaultChecked={access.orders} onChange={(e) => handleAccessChange(e)} />
                                            <label className="form-check-label" htmlFor="inlineCheckbox1">Orders</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" defaultChecked={access.staticProducts} onChange={(e) => handleAccessChange(e)} />
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

export default EditAdmin