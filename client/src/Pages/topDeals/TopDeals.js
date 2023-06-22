import Sidebar from "../../Components/sidebar/Sidebar"
import Navbar from "../../Components/navbar/Navbar"
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './topDeals.css'
import Cards from "./Cards";
import ProductsTable from '../productsTable/ProductsTable'

const TopDeals = () => {
    const [lastCat, setlastCat] = useState("all");
    const [showSidebar, setShowSidebar] = useState(true)
    const toggleSideBar = () => {
        setShowSidebar(!showSidebar)
    }
    return (
        <div className="main">
            {showSidebar ? <div className="Sidebar"><Sidebar /></div> : <div className="SidebarSmall"><Sidebar /></div>}
            <div className="flex-container" style={showSidebar ? { marginLeft: '258px' } : { marginLeft: '95px' }}>
                <Navbar toggleSideBar={toggleSideBar} />
                <div className="TopDealsPage">
                    <div className="sortAndActions p-2 bg-info bg-opacity-10">
                        <h2>Top Deals</h2>
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
                        <button className="btn btn-primary" style={{ padding: '0.5rem' }} type="button" data-bs-toggle="modal" data-bs-target="#addModal">Add Deals</button>
                    </div>
                    <div className="allDeals">
                        <Cards />
                    </div>
                </div>
            </div>

            {/*Add Deals Modal */}
            <div className="modal" id="addModal" tabIndex="-1" aria-labelledby="addModal" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add deals</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body" style={{ height: '350px', overflowY: 'scroll' }}>
                            <ProductsTable lastCat={lastCat} />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default TopDeals