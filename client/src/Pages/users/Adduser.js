import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from "../../Components/navbar/Navbar";
import Sidebar from "../../Components/sidebar/Sidebar";
import api from "../../http";
import './Users.css';


const Adduser = () => {
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault()
        api.post("/api/buyers/add", {
            name, email, pan, additional_number, organization
            , address, phone, type, contact_person, gst,level, status: "verified"
        }).then((data) => {
            navigate("/users");
            console.log(data.data);
        }).catch((err) => {
            alert("Network Conncetion Error");
            console.log(err);
        });
    }


    const [email, setEmail] = useState();
    const [name, setName] = useState();
    const [pan, setPan] = useState();
    const [additional_number, setAdditionalNumber] = useState();
    const [organization, setOrganisation] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [gst,setGst] = useState("");
    const [type, setType] = useState("");
    const [contact_person, setContactPerson] = useState("");
    const [level, setLevel] = useState("");

    const [showSidebar, setShowSidebar] = useState(true)
    const toggleSideBar = () => {
        setShowSidebar(!showSidebar)
    }
    return (
        <>
            <div className="main">
                {showSidebar ? <div className="Sidebar"><Sidebar /></div> : <div className="SidebarSmall"><Sidebar /></div>}
                <div className="flex-container" style={showSidebar ? { marginLeft: '258px' } : { marginLeft: '95px' }}>
                    <Navbar toggleSideBar={toggleSideBar} />
                    <div className="Addproductpage">
                        <div className="flex-container d-flex flex-row align-items-center align-self-center">
                            <a href='/users' className='arrowBack'><ArrowBackIcon style={{ fontSize: '30px' }} className="arrowBack" /></a>
                            <h2 style={{ marginLeft: "17px", textDecoration: 'underline' }}>Add User</h2>
                        </div>
                        <div className="container border p-4 mb-2 border-opacity-50">
                            <form>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon3">Organization</span>
                                    <input type="text" className="form-control" onChange={(e) => { setOrganisation(e.target.value) }} id="basic-url" aria-describedby="basic-addon3" placeholder="Ex-orgXYZ" />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon3">Name</span>
                                    <input type="text" className="form-control" onChange={(e) => { setName(e.target.value) }} id="basic-url" aria-describedby="basic-addon3" placeholder="Ex-John Doe" />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon3">Contact Person</span>
                                    <input type="text" className="form-control" onChange={(e) => { setContactPerson(e.target.value) }} id="basic-url" aria-describedby="basic-addon3" placeholder="Ex-Susan Bond" />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon3">GST NUMBER</span>
                                    <input type="text" className="form-control" onChange={(e) => { setGst(e.target.value) }} id="basic-url" aria-describedby="basic-addon3" placeholder="Ex-Susan Bond" />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon3">Address</span>
                                    <input type="text" className="form-control" onChange={(e) => { setAddress(e.target.value) }} id="basic-url" aria-describedby="basic-addon3" placeholder="Ex-Bole Subcity Kebele 14 H.No179/B Addis Ababa 7512" />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon3">Phone Number</span>
                                    <input type="text" className="form-control" onChange={(e) => { setPhone(e.target.value) }} id="basic-url" aria-describedby="basic-addon3" placeholder="Ex - +251 398198287 " />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon3">Additional Phone Number</span>
                                    <input type="text" className="form-control" onChange={(e) => { setAdditionalNumber(e.target.value) }} id="basic-url" aria-describedby="basic-addon3" placeholder="Ex - +251 398198287 " />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon3">Email</span>
                                    <input type="text" className="form-control" id="basic-url" onChange={(e) => { setEmail(e.target.value) }}
                                        placeholder='Ex-johndoes@example.com ' aria-describedby="basic-addon3" />
                                </div>
                                <div className="input-group mb-3">
                                    <label className="input-group-text" htmlFor="inputGroupSelect01">Buyer Type</label>
                                    <select id="inputGroupSelect01" onChange={(e) => { setType(e.target.value) }} className="form-select">
                                        <option value="select">Select Category</option>
                                        <option value="Multi Farmer">Retailer</option>
                                        <option value="Producer">Supermarket</option>
                                        <option value="Importer">Unions</option>
                                        <option value="Distributor">Other groups</option>
                                    </select>
                                </div>
                                <div className="input-group mb-3">
                                    <label className="input-group-text" htmlFor="inputGroupSelect01">Buyer Level</label>
                                    <select id="inputGroupSelect01" onChange={(e) => { setLevel(e.target.value) }} className="form-select">
                                        <option value="1">Level 1</option>
                                        <option value="2">Level 2</option>
                                        <option value="3">Level 3</option>
                                    </select>
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon3">PAN</span>
                                    <input type="text" className="form-control" onChange={(e) => { setPan(e.target.value) }} id="basic-url" aria-describedby="basic-addon3" />
                                </div>
                                <button type="submit" className="btn btn-primary" onClick={(e) => handleClick(e)}>Add User</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Adduser