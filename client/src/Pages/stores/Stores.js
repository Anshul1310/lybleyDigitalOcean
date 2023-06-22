import Sidebar from "../../Components/sidebar/Sidebar"
import Navbar from "../../Components/navbar/Navbar"
import React, { useState, useRef } from 'react'
import StoresTable from './StoresTable';
import { NavLink, Link } from 'react-router-dom';
import './stores.css'
import api from "../../http";

const Stores = () => {

    const [name, setName] = useState();
    const [capacity, setCapacity] = useState();
    const [location, setLocation] = useState();
    const [id, setId] = useState();

    const setModelDetail = () => {
        api.post("/api/stores/find", { id: localStorage.getItem("lastStore") }).then((data) => {
            console.log(data.data);
            setName(data.data.name);
            setCapacity(data.data.capacity);
            setLocation(data.data.location);
        }).catch((err) => {
            alert("Network Conncetion Error");
            console.log(err);
        });
    }
    const close = useRef(null)
    const handleEdit = () => {
        api.post("/api/stores/update", { name, location, capacity, id: localStorage.getItem("lastStore") }).then((data) => {
            close.current.click()
            window.location.reload();
        }).catch((err) => {
            alert("Network Conncetion Error");
            console.log(err);
        });
    }

    const open = useRef(null)
    const modalOpen = () => {
        open.current.click();
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
                <div className="StoresPage">
                    <div className="sortAndActions p-2 bg-info bg-opacity-10">
                        <h2>Stores List</h2>
                        <div className="btn-group">
                            <button type="button" className="btn btn-info dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                Action
                            </button>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to="#">All</Link></li>
                                <li><Link className="dropdown-item" to="#">Pending</Link></li>
                                <li><Link className="dropdown-item" to="#">Rejected</Link></li>
                                <li><Link className="dropdown-item" to="#">Verified</Link></li>
                            </ul>
                        </div>
                        <form className="d-flex align-items-center" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button type="button" className="btn btn-outline-primary" style={{ padding: '0px 10px', height: '35px' }}>Search</button>
                        </form>
                        <button className="btn btn-primary" style={{ padding: '0.5rem' }} type="button">
                            <a href="/addStores" style={{ color: '#fff', textDecoration: 'none' }}>Add Store</a>
                        </button>
                    </div>
                    <div className="allStores">
                        <StoresTable modalOpen={modalOpen} />
                    </div>
                </div>
            </div>


            {/* Edit modal */}
            <button type="button" ref={open} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#editModal">
                Launch demo modal
            </button>
            <div className="modal" id="editModal" tabIndex="-1" aria-labelledby="editModal" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Store Details</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput" className="form-label">Store Name</label>
                                <input type="text" className="form-control" id="formGroupExampleInput" onChange={(e) => setName(e.target.value)} value={name} placeholder="Example-JBM Mall" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput" className="form-label">Store Location</label>
                                <input type="text" className="form-control" id="formGroupExampleInput" onChange={(e) => setLocation(e.target.location)} value={location} placeholder="Example-Random location" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput" className="form-label">Store Capacity</label>
                                <input type="text" className="form-control" id="formGroupExampleInput" onChange={(e) => setCapacity(e.target.value)} value={capacity} placeholder="Example-1000" />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={close}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={(e) => handleEdit(e)}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Stores