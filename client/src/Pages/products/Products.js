import Sidebar from "../../Components/sidebar/Sidebar"
import Navbar from "../../Components/navbar/Navbar"
import React, { useState, useRef } from 'react'
import ProductsTable from '../productsTable/ProductsTable';
import { NavLink, Link } from 'react-router-dom';
import './Products.css'

const Products = () => {
    const [readMore, setReadMore] = useState(true)
    const [readMore1, setReadMore1] = useState(true)
    const [readMore2, setReadMore2] = useState(true)
    const [readMore3, setReadMore3] = useState(true)

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
                <div className="ProductsPage">
                    <div className="sortAndActions p-2 bg-info bg-opacity-10">
                        <h2>Products List</h2>
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
                            <Link to="/addproduct" style={{ color: '#fff', textDecoration: 'none' }}>Add Product</Link>
                        </button>
                    </div>
                    <div className="allProducts">
                        <ProductsTable modalOpen={modalOpen} lastCat="all" />
                    </div>
                </div>
            </div>


            {/* Edit User modal */}
            <button type="button" ref={open} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#editModal">
                Launch demo modal
            </button>
            <div className="modal" id="editModal" tabIndex="-1" aria-labelledby="editModal" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content" style={{ height: '484px' }}>
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Product Details</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body" style={{ height: '484px', overflowY: 'scroll' }}>
                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput" className="form-label">Product Name</label>
                                <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Example-iPhone 13" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput" className="form-label">Description</label>
                                <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Example-The iPhone 13 models come in 5.4 and 6.1-inch sizes, with the 5.4-inch iPhone 13 Pro positioned as Apple's smallest iPhone" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput" className="form-label">Category</label>
                                <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Example-Mobiles" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput" className="form-label">Sellers</label>
                                <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Example-JBM" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput" className="form-label">Measuring Unit</label>
                                <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Example-kg" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput" className="form-label">Available Stock</label>
                                <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Example-No Expiry date" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput" className="form-label">Brand</label>
                                <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Orient" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput" className="form-label">Minimum Order Quantity</label>
                                <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Example-100" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput" className="form-label">Price</label>
                                <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Example-$200" />
                            </div>
                            <div className="input-group mb-3">
                                <input type="file" className="form-control" id="inputGroupFile02" />
                                <label className="input-group-text" htmlFor="inputGroupFile02">Upload</label>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Products