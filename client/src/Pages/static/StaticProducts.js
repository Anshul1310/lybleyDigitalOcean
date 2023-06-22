import Sidebar from "../../Components/sidebar/Sidebar"
import Navbar from "../../Components/navbar/Navbar"
import React, { useState, useRef } from 'react'
import StaticProductsTable from './StaticProductsTable';
import { NavLink, Link } from 'react-router-dom';
import api from "../../http";
import './staticProducts.css'

const StaticProducts = () => {

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState(null);

    const [id, setId] = useState(localStorage.getItem("lastProduct"));
    const [measuringUnit, setMeasuringUnit] = useState("");
    const [location, setLocation] = useState("");
    const [flag, setFlag] = useState(1);
    const close = useRef(null)

    const setModelDetail = (id) => {
        api.post("/api/product-price/find", { id }).then((data) => {
            console.log(data.data)
            setTitle(data.data.title);
            setPrice(data.data.price);
            setMeasuringUnit(data.data.measuringUnit);
            setLocation(data.data.location);
        }).catch((err) => {
            alert("Network Conncetion Error");
            console.log(err);
        });
    }

    const handleEdit = (e) => {
        e.preventDefault()
        api.post("/api/product-price/update", { id, title, image, measuringUnit, price, location }).then((data) => {
            close.current.click();
            window.location.reload();
        }).catch((err) => {
            alert("Network Conncetion Error");
            console.log(err);
        });
    }


    const handleChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            setImage(reader.result);
        }
    }

    const open = useRef(null)
    const modalOpen = () => {
        open.current.click()
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
                <div className="staticProductsPage">
                    <div className="sortAndActions p-2 bg-info bg-opacity-10">
                        <h2>All Products</h2>
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
                            <a href="/addStaticProducts" style={{ color: '#fff', textDecoration: 'none' }}>Add Products</a>
                        </button>
                    </div>
                    <div className="staticProducts">
                        <StaticProductsTable modalOpen={modalOpen} />
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
                            <h5 className="modal-title">Edit Product Details</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput" className="form-label">Product Name</label>
                                <input type="text" className="form-control" onChange={(e) => setTitle(e.target.value)} value={title} id="formGroupExampleInput" placeholder="Example-Cookie" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput" className="form-label">Unit Of Measurement</label>
                                <input type="text" className="form-control" onChange={(e) => setMeasuringUnit(e.target.value)} value={measuringUnit} id="formGroupExampleInput" placeholder="Example-kg" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput" className="form-label">Price</label>
                                <input type="text" className="form-control" onChange={(e) => setPrice(e.target.value)} value={price} id="formGroupExampleInput" placeholder="Example-$750" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput" className="form-label">Location</label>
                                <input type="text" className="form-control" value={location} onChange={(e) => setLocation(e.target.value)} id="formGroupExampleInput" placeholder="Example-Random Location" />
                            </div>
                            <div className="input-group mb-3">
                                <input type="file" className="form-control" id="inputGroupFile02" />
                                <label className="input-group-text" htmlFor="inputGroupFile02" onChange={(e) => handleChange(e)} >Upload</label>
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

export default StaticProducts