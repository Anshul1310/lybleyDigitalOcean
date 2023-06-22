import React, { useState, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import Navbar from "../../Components/navbar/Navbar";
import Sidebar from "../../Components/sidebar/Sidebar";
import api from "../../http";
import baseUrl from "../../http/Constant";
import EarningsTable from '../earnings/EarningsTable';
import './earnings.css';


const Earnings = () => {
    const [payout, setPayout] = useState()
    const [seller, setSeller] = useState()
    const [transactionSlip, setTransactionSlip] = useState();
    const [transactionId, setTransactionId] = useState();

    const [status, setStatus] = useState("all")
    const close = useRef(null)

    const handleUpload = (e) => {
        api.post("/api/transaction/withdrawal/update", { transactionId: transactionId, id: localStorage.getItem("lastPayment"), transactionSlip }).then((data) => {
            close.current.click();
            window.location.reload();
        }).catch((err) => {
            alert("Network Conncetion Error");
            console.log(err);
        });
    }

    const handleChange = (e) => {
        const file = e.target.files[0];
        //to convert file to base64 string
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            setTransactionSlip(reader.result);
            console.log(reader.result);
        }
    }
    const open = useRef(null)
    const modalOpen = () => {
        open.current.click()

        api.post("/api/transaction/get/" + localStorage.getItem("lastPayment")).then((data) => {
            console.log(data)
            setPayout(data.data.payout);
            setSeller(data.data.seller);
            setTransactionSlip(baseUrl + data.data.transactionSlip);
            setTransactionId(data.data.transactionId)
            console.log(data.data);
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
        <div className="main">
            {showSidebar ? <div className="Sidebar"><Sidebar /></div> : <div className="SidebarSmall"><Sidebar /></div>}
            <div className="flex-container" style={showSidebar ? { marginLeft: '258px' } : { marginLeft: '95px' }}>
                <Navbar toggleSideBar={toggleSideBar} />
                <div className="earningsPage">
                    <div className="sortAndActions p-2 bg-info bg-opacity-10">
                        <h2>All Earnings</h2>
                        <div className="btn-group">
                            <button type="button" onChange={(e) => setStatus(e.target.value)} className="btn btn-info dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                Action
                            </button>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to="#">All</Link></li>
                                <li><Link className="dropdown-item" to="#">Initiated</Link></li>
                                <li><Link className="dropdown-item" to="#">Success</Link></li>
                            </ul>
                        </div>
                        <form className="d-flex align-items-center" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button type="button" className="btn btn-outline-primary" style={{ padding: '0px 10px', height: '35px' }}>Search</button>
                        </form>
                    </div>
                    <div className="earnings">
                        <EarningsTable modalOpen={modalOpen} status={status} />
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
                            <h5 className="modal-title">Edit earnings details</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput" className="form-label">Seller Name</label>
                                <input type="text" className="form-control" value={seller} id="formGroupExampleInput" placeholder="Example-Random XYZ" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput" className="form-label">Payout</label>
                                <input type="text" className="form-control" id="formGroupExampleInput" value={payout} placeholder="Example-No Expiry Date" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput" className="form-label">Transaction ID</label>
                                <input type="text" className="form-control" value={transactionId} onChange={(e) => setTransactionId(e.target.value)} id="formGroupExampleInput" placeholder="Example-100" />
                            </div>
                            <div className="input-group mb-3">
                                <input type="file" className="form-control" id="inputGroupFile02" onChange={(e) => { handleChange(e) }} />
                                <img width="100%" src={transactionSlip} height="100%" />
                                <label className="input-group-text" htmlFor="inputGroupFile02">Upload</label>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={close}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={(e) => handleUpload(e)}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

        </div >
    )
}

export default Earnings
