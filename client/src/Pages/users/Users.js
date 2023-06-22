import Sidebar from "../../Components/sidebar/Sidebar"
import Navbar from "../../Components/navbar/Navbar"
import React, { useState, useRef } from 'react'
import UsersTable from './UsersTable';
import { NavLink, Link } from 'react-router-dom';
import './Users.css'

const Users = () => {

    const [query, setQuery] = useState("");

    const handleSearch = (e) => {
        if (e.target.value == "") {
            setStatus("all")
        } else {
            setStatus("search/" + e.target.value);
        }

    }

    const [status, setStatus] = useState("verified");
    const [showSidebar, setShowSidebar] = useState(true)
    const toggleSideBar = () => {
        setShowSidebar(!showSidebar)
    }
    const open = useRef(null)
    const modalOpen = () => {
        open.current.click()
    }
    return (
        <div className="main">
            {showSidebar ? <div className="Sidebar"><Sidebar /></div> : <div className="SidebarSmall"><Sidebar /></div>}
            <div className="flex-container" style={showSidebar ? { marginLeft: '258px' } : { marginLeft: '95px' }}>
                <Navbar toggleSideBar={toggleSideBar} />
                <div className="UsersPage">
                    <div className="sortAndActions p-2 bg-info bg-opacity-10">
                        <h2>Users List</h2>
                        <div className="btn-group">
                            {/* <button type="button" value={status} onChange={(e) => setStatus(e.target.value)} className="btn btn-info dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                Action
                            </button> */}
                            <select name="sorting" value={status} onChange={(e) => setStatus(e.target.value)} id="sorting">
                                <option value="pending">Pending</option>
                                <option value="rejected">Rejected</option>
                                <option value="all">All</option>
                                <option value="verified">Verified</option>
                            </select>
                        </div>
                        <form className="d-flex align-items-center" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => handleSearch(e)} />
                            <button type="button" className="btn btn-outline-primary" style={{ padding: '0px 10px', height: '35px' }}>Search</button>
                        </form>
                        <button className="btn btn-primary" style={{ padding: '0.5rem' }} type="button">
                            <a href="/adduser" style={{ color: '#fff', textDecoration: 'none' }}>Add User</a>
                        </button>
                    </div>
                    <div className="allUsers">
                        <UsersTable status={status} />
                    </div>
                </div>
            </div>

            {/* Add user modal */}
            {/* <div className="modal" id="addModal" tabIndex="-1" aria-labelledby="addModal" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content" style={{ height: '484px' }}>
                        <div className="modal-header">
                            <h5 className="modal-title">Add User</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body" style={{ height: '484px', overflowY: 'scroll' }}>
                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput" className="form-label">Organization</label>
                                <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Example-OrgXYZ" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput" className="form-label">Name</label>
                                <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Example-John Doe" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput" className="form-label">Contact Person</label>
                                <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Example-Susan Bond" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput" className="form-label">Address</label>
                                <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Example-Bole Subcity Kebele 14 H.No179/B Addis Ababa 7512" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput" className="form-label">Phone Number</label>
                                <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Example-+251 39819828" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput" className="form-label">Email</label>
                                <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Example-johndoe@gmail.com" />
                            </div>
                            <div class="mb-3">
                                <label for="inputState" class="form-label">Buyer Type</label>
                                <select id="inputState" class="form-select">
                                    <option defaultValue>Select Category</option>
                                    <option value="1">Retailer</option>
                                    <option value="2">Supermarket</option>
                                    <option value="3">Unions</option>
                                    <option value="4">Other groups</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="inputState" class="form-label">Buyer Level</label>
                                <select id="inputState" class="form-select">
                                    <option value="1">Level 1</option>
                                    <option value="2">Level 2</option>
                                    <option value="3">Level 3</option>
                                </select>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div> */}

            {/* Edit user modal */}
            {/* <button type="button" ref={open} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#editModal">
                Launch demo modal
            </button>
            <div className="modal" id="editModal" tabIndex="-1" aria-labelledby="editModal" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content" style={{ height: '484px' }}>
                        <div className="modal-header">
                            <h5 className="modal-title">User Details</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body" style={{ height: '484px', overflowY: 'scroll' }}>
                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput" className="form-label">Organization</label>
                                <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Example-OrgXYZ" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput" className="form-label">Name</label>
                                <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Example-John Doe" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput" className="form-label">Contact Person</label>
                                <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Example-Susan Bond" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput" className="form-label">Address</label>
                                <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Example-Bole Subcity Kebele 14 H.No179/B Addis Ababa 7512" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput" className="form-label">Phone Number</label>
                                <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Example-+251 39819828" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput" className="form-label">Email</label>
                                <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Example-johndoe@gmail.com" />
                            </div>
                            <div class="mb-3">
                                <label for="inputState" class="form-label">Buyer Type</label>
                                <select id="inputState" class="form-select">
                                    <option defaultValue>Select Category</option>
                                    <option value="1">Retailer</option>
                                    <option value="2">Supermarket</option>
                                    <option value="3">Unions</option>
                                    <option value="4">Other groups</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="inputState" class="form-label">Buyer Level</label>
                                <select id="inputState" class="form-select">
                                    <option value="1">Level 1</option>
                                    <option value="2">Level 2</option>
                                    <option value="3">Level 3</option>
                                </select>
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

export default Users