import React, { useState, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import Navbar from "../../Components/navbar/Navbar";
import Sidebar from "../../Components/sidebar/Sidebar";
// import api from "../../http";
import OrdersTable from '../ordersTable/OrdersTable';
import './orders.css';


const Orders = () => {
    const [status, setStatus] = useState("all");
    const [showSidebar, setShowSidebar] = useState(true)
    const toggleSideBar = () => {
        setShowSidebar(!showSidebar)
    }
    return (
        <div className="main">
            {showSidebar ? <div className="Sidebar"><Sidebar /></div> : <div className="SidebarSmall"><Sidebar /></div>}
            <div className="flex-container" style={showSidebar ? { marginLeft: '258px' } : { marginLeft: '95px' }}>
                <Navbar toggleSideBar={toggleSideBar} />
                <div className="OrdersPage">
                    <div className="sortAndActions p-2 bg-info bg-opacity-10">
                        <h2>All Orders</h2>
                        <div className="btn-group">
                            <button type="button" onChange={(e) => setStatus(e.target.value)} className="btn btn-info dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                Action
                            </button >
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to="#">Dispatched</Link></li>
                                <li><Link className="dropdown-item" to="#">Preparing</Link></li>
                                <li><Link className="dropdown-item" to="#">OnTheWay</Link></li>
                                <li><Link className="dropdown-item" to="#">Delievered</Link></li>
                            </ul>
                        </div>
                        <form className="d-flex align-items-center" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button type="button" className="btn btn-outline-primary" style={{ padding: '0px 10px', height: '35px' }}>Search</button>
                        </form>
                    </div>
                    <div className="orders">
                        <OrdersTable status={status} />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Orders
