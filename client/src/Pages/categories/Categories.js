import React, { useState, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import Navbar from "../../Components/navbar/Navbar";
import Sidebar from "../../Components/sidebar/Sidebar";
import api from "../../http";
import CategoriesTable from '../categories/CategoriesTable';
import ProductsTable from '../productsTable/ProductsTable'
import './categories.css';


const Categories = () => {
    const [lastCat, setlastCat] = useState("all");
    const [image, setImage] = useState(null);
    const [name, setName] = useState(null);
    const close = useRef(null)
    const close1 = useRef(null)

    const updateData = () => {
        api.post("/api/categories/update", {
            id: localStorage.getItem("lastCategory"), image, name
        }).then((data) => {
            close.current.click();
            setImage(null)
            setName(null)
            window.location.reload();
        }).catch((err) => {
            alert("Network Conncetion Error");
            console.log(err);
        });
    }

    const deleteCategory = (e) => {
        api.post("/api/categories/delete", {
            id:  localStorage.getItem("lastCat")
        }).then((data) => {
            console.log(data)
            window.location.reload();
        }).catch((err) => {
            alert("Network Conncetion Error");
            console.log(err);
        });
    }

    const handleClick = (e) => {
        api.post("/api/categories/add", {
            name, image
        }).then((data) => {
            // close1.current.click();
            window.location.reload();
        }).catch((err) => {
            alert("Network Conncetion Error");
            console.log(err);
        });
    }
    const handleImageChnage = (e) => {
        const file = e.target.files[0];
        //to convert file to base64 string
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            setImage(reader.result);
        }
    }

    const open = useRef(null)
    const deleteOpen = useRef(null)
    const modalOpen = () => {
        open.current.click()
    }
    const deleteModalOpen = () => {
        deleteOpen.current.click()
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
                <div className="categoriesPage">
                    <div className="sortAndActions p-2 bg-info bg-opacity-10">
                        <h2>All Categories</h2>
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
                        <button type="button" className="btn btn-primary" style={{ padding: '0.5rem' }} data-bs-toggle="modal" data-bs-target="#addModal">Add Category</button>
                    </div>
                    <div className="categories">
                        <CategoriesTable modalOpen={modalOpen} deleteModalOpen={deleteModalOpen} />
                    </div>
                </div>
            </div>

            {/*Add Category Modal */}
            <div className="modal" id="addModal" tabIndex="-1" aria-labelledby="addModal" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add category</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput" className="form-label">Category</label>
                                <input type="text" className="form-control" id="formGroupExampleInput" onChange={(e) => setName(e.target.value)} placeholder="Example-Vegetables" />
                            </div>
                            <div className="input-group mb-3">
                                <input type="file" className="form-control" id="inputGroupFile02" onChange={(e) => handleImageChnage(e)} />
                                <label className="input-group-text" htmlFor="inputGroupFile02">Upload</label>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={close1}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={(e) => handleClick(e)}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Category Modal */}
            <button type="button" ref={open} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#editModal">
                Launch demo modal
            </button>
            <div className="modal" id="editModal" tabIndex="-1" aria-labelledby="editModal" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit category</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput" className="form-label">Category</label>
                                <input type="text" className="form-control" id="formGroupExampleInput" onChange={(e) => setName(e.target.value)} placeholder="Example-Vegetables" />
                            </div>
                            <div className="input-group mb-3">
                                <input type="file" className="form-control" id="inputGroupFile02" onChange={(e) => handleImageChnage(e)} />
                                <label className="input-group-text" htmlFor="inputGroupFile02" >Upload</label>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={close}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={() => updateData()}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete category modal */}
            <button type="button" ref={deleteOpen} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#deleteModal">
                Launch demo modal
            </button>
            <div className="modal" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModal" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Delete category</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body" style={{ height: '350px', overflowY: 'scroll' }}>
                            <ProductsTable lastCat={lastCat} />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={(e) => deleteCategory(e)}>Delete1</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Categories
