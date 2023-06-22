import Sidebar from "../../Components/sidebar/Sidebar"
import Navbar from "../../Components/navbar/Navbar"
import React, { useState, useRef } from 'react'
import SellersTable from '../sellers/SellersTable'
import { NavLink, Link } from 'react-router-dom';
import './seller.css'

const Sellers = () => {

    const [status, setStatus] = useState("verified");
    const [showSidebar, setShowSidebar] = useState(true)
    const toggleSideBar = () => {
        setShowSidebar(!showSidebar)
    }
    return (
        <div className="main">
            {showSidebar ? <div className="Sidebar"><Sidebar /></div> : <div className="SidebarSmall"><Sidebar /></div>}
            <div className="flex-container" style={showSidebar ? { marginLeft: '258px' } : { marginLeft: '95px' }}>
                <Navbar toggleSideBar={toggleSideBar} />
                <div className="SellersPage">
                    <div className="sortAndActions p-2 bg-info bg-opacity-10">
                        <h2>Sellers List</h2>
                        <div className="btn-group">
                            <select name="sorting" value={status} onChange={(e) => setStatus(e.target.value)} id="sorting">
                                <option value="pending">Pending</option>
                                <option value="rejected">Rejected</option>
                                <option value="verified">Verified</option>
                            </select>
                        </div>
                        <form className="d-flex align-items-center" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button type="button" className="btn btn-outline-primary" style={{ padding: '0px 10px', height: '35px' }}>Search</button>
                        </form>
                        <button className="btn btn-primary" style={{ padding: '0.5rem' }} type="button">
                            <a href="/addSeller" style={{ color: '#fff', textDecoration: 'none' }}>Add Seller</a>
                        </button>
                    </div>
                    <div className="allSellers">
                        <SellersTable status={status} />
                    </div>
                </div>
            </div>

            {/* Add Seller modal */}
            {/* <div className="modal" id="addModal" tabIndex="-1" aria-labelledby="addModal" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content" style={{ height: '484px' }}>
                        <div className="modal-header">
                            <h5 className="modal-title">Add Seller</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body" style={{ height: '484px', overflowY: 'scroll' }}>
                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput" className="form-label">Name</label>
                                <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Example-John Doe" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput" className="form-label">Gender</label>
                                <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Example-male" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput" className="form-label">Age</label>
                                <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Example-28" />
                            </div>
                            <div class="mb-3">
                                <label for="inputState" class="form-label">Category</label>
                                <select id="inputState" class="form-select">
                                    <option defaultValue>Select Region</option>
                                    <option value="1">Tigray</option>
                                    <option value="2">Afar</option>
                                    <option value="3">Amhara</option>
                                    <option value="4">Oromia</option>
                                    <option value="4">Somali</option>
                                    <option value="4">Benishangul-Gumuz</option>
                                    <option value="4">SNNPR</option>
                                    <option value="4">Gambella</option>
                                    <option value="4">Harari</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput" className="form-label">Zone</label>
                                <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Example-North Gondar" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput" className="form-label">Woreda</label>
                                <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Example-woreda" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput" className="form-label">Kebele</label>
                                <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Example-kebele" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput" className="form-label">Phone Number</label>
                                <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Example-+251 398198287" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput" className="form-label">Email</label>
                                <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Example-johndoe@gmail.com" />
                            </div>
                            <div class="mb-3">
                                <label for="inputState" class="form-label">Select Type</label>
                                <select id="inputState" class="form-select">
                                    <option defaultValue>Select Category</option>
                                    <option value="1">Multi Farmer</option>
                                    <option value="2">Producer</option>
                                    <option value="3">Importer</option>
                                    <option value="4">Distributor</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="inputState" class="form-label">Select Level</label>
                                <select id="inputState" class="form-select">
                                    <option value="1">Level 1</option>
                                    <option value="2">Level 2</option>
                                    <option value="3">Level 3</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput" className="form-label">Book Number</label>
                                <input type="text" className="form-control" id="formGroupExampleInput" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput" className="form-label">TIN</label>
                                <input type="text" className="form-control" id="formGroupExampleInput" />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div> */}

            {/* Edit Seller modal */}
            {/* <button type="button" ref={open} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#editModal">
                Launch demo modal
            </button>
            <div className="modal" id="editModal" tabIndex="-1" aria-labelledby="editModal" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content" style={{ height: '484px' }}>
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Seller Details</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body" style={{ height: '484px', overflowY: 'scroll' }}>
                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput" className="form-label">Name</label>
                                <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Example-John Doe" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput" className="form-label">Gender</label>
                                <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Example-male" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput" className="form-label">Age</label>
                                <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Example-28" />
                            </div>
                            <div class="mb-3">
                                <label for="inputState" class="form-label">Category</label>
                                <select id="inputState" class="form-select">
                                    <option defaultValue>Select Region</option>
                                    <option value="1">Tigray</option>
                                    <option value="2">Afar</option>
                                    <option value="3">Amhara</option>
                                    <option value="4">Oromia</option>
                                    <option value="4">Somali</option>
                                    <option value="4">Benishangul-Gumuz</option>
                                    <option value="4">SNNPR</option>
                                    <option value="4">Gambella</option>
                                    <option value="4">Harari</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput" className="form-label">Zone</label>
                                <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Example-North Gondar" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput" className="form-label">Woreda</label>
                                <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Example-woreda" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput" className="form-label">Kebele</label>
                                <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Example-kebele" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput" className="form-label">Phone Number</label>
                                <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Example-+251 398198287" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput" className="form-label">Email</label>
                                <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Example-johndoe@gmail.com" />
                            </div>
                            <div class="mb-3">
                                <label for="inputState" class="form-label">Select Type</label>
                                <select id="inputState" class="form-select">
                                    <option defaultValue>Select Category</option>
                                    <option value="1">Multi Farmer</option>
                                    <option value="2">Producer</option>
                                    <option value="3">Importer</option>
                                    <option value="4">Distributor</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="inputState" class="form-label">Select Level</label>
                                <select id="inputState" class="form-select">
                                    <option value="1">Level 1</option>
                                    <option value="2">Level 2</option>
                                    <option value="3">Level 3</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput" className="form-label">Book Number</label>
                                <input type="text" className="form-control" id="formGroupExampleInput" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput" className="form-label">TIN</label>
                                <input type="text" className="form-control" id="formGroupExampleInput" />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div> */}

        </div>
    )
}

export default Sellers