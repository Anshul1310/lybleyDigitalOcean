import Sidebar from "../../Components/sidebar/Sidebar"
import Navbar from "../../Components/navbar/Navbar"
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from "../../http";
import './notification.css'

const Notification = () => {
    const [title, setTitle] = useState("");
    const navigate = useNavigate();
    const [description, setDescription] = useState("");
    const [topic, setTopic] = useState("buyers");
    const handleClick = (e) => {
        api.post("/api/notification/send", { body: description, title, topic }).then((data) => {
            alert("Sent successfully")
            navigate("/notification")
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
                <div className="notificationPage">
                    <div className="pushNotification">
                        <h2>Push Notification</h2>
                    </div>
                    <form className="row g-5" style={{ justifyContent: 'center' }}>
                        <div className="col-12">
                            <div className="input-group">
                                <div className="input-group-text">Title</div>
                                <input type="text" className="form-control" onChange={(e) => setTitle(e.target.value)} id="autoSizingInputGroup" placeholder="Ex-Out Of Stock" />
                            </div>
                        </div>
                        <div className="col-md-6 input-group">
                            <label className="input-group-text" htmlFor="inputGroupSelect01">To</label>
                            <select className="form-select" id="inputGroupSelect01" onChange={(e) => setTopic(e.target.value)}>
                                <option defaultValue>Select</option>
                                <option value="buyers">Buyers</option>
                                <option value="sellers">Sellers</option>
                            </select>
                        </div>
                        <div class="input-group">
                            <span class="input-group-text">Message</span>
                            <textarea class="form-control" onChange={(e) => setDescription(e.target.value)} aria-label="With textarea" placeholder="Ex-Your listed items are out of stock"></textarea>
                        </div>
                        <div className="d-md-flex justify-content-md-center">
                            <button type="button" className="btn btn-primary" onClick={(e) => handleClick(e)}>Push Notification</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default Notification