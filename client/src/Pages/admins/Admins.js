import Sidebar from "../../Components/sidebar/Sidebar"
import Navbar from "../../Components/navbar/Navbar"
import React, { useState } from 'react'
import AdminsTable from './AdminsTable';
import { Link } from 'react-router-dom';
import './admins.css'

const Admins = () => {
    const [showSidebar, setShowSidebar] = useState(true)
    const toggleSideBar = () => {
        setShowSidebar(!showSidebar)
    }
    return (
        <div className="main">
            {showSidebar ? <div className="Sidebar"><Sidebar /></div> : <div className="SidebarSmall"><Sidebar /></div>}
            <div className="flex-container" style={showSidebar ? { marginLeft: '258px' } : { marginLeft: '95px' }}>
                <Navbar toggleSideBar={toggleSideBar} />
                <div className="AdminsPage">
                    <div className="sortAndActions p-2 bg-info bg-opacity-10">
                        <h2>Admins List</h2>
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
                            <a href="/addAdmin" style={{ color: '#fff', textDecoration: 'none' }}>Add Admin</a>
                        </button>
                    </div>
                    <div className="allAdmins">
                        <AdminsTable />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Admins