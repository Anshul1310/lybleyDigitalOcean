import React from 'react'
import Sidebar from "../../Components/sidebar/Sidebar"
import Navbar from "../../Components/navbar/Navbar"
import './stores.css'
import { useState } from "react";
import api from "../../http";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const AddStore = () => {
    const navigate = useNavigate();
    const [name, setName] = useState();
    const [location, setLocation] = useState();
    const [capacity, setCapacity] = useState();

    const handleClick = (e) => {
        e.preventDefault()
        api.post("/api/stores/add", {
            name, location, capacity
        }).then((data) => {
            navigate("/stores")
        }).catch((err) => {
            alert("Network Conncetion Error");
            console.log(err);
        });
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
                    <div className="addStorePage">
                        <div className="flex-container d-flex flex-row align-items-center align-self-center">
                            <a href='/stores' className="arrowBack"><ArrowBackIcon style={{ fontSize: '30px' }} className="arrowBack" /></a>
                            <h2 style={{ marginLeft: "17px", textDecoration: 'underline' }}>Add Stores</h2>
                        </div>
                        <div className="container border p-4 mb-2 border-opacity-50">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="formGroupExampleInput" className="form-label">Store Name</label>
                                    <input type="text" className="form-control" id="formGroupExampleInput" onChange={(e) => setName(e.target.value)} placeholder="Example-JBM Mall" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="formGroupExampleInput" className="form-label">Store Location</label>
                                    <input type="text" className="form-control" id="formGroupExampleInput" onChange={(e) => setLocation(e.target.value)} placeholder="Example-Random location" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="formGroupExampleInput" className="form-label">Store Capacity</label>
                                    <input type="text" className="form-control" id="formGroupExampleInput" onChange={(e) => setCapacity(e.target.value)} placeholder="Example-1000" />
                                </div>

                                <button type="submit" className="btn btn-primary" onClick={(e) => handleClick(e)}>Add store</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddStore