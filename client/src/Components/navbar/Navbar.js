import React, { useState, useEffect, useRef } from 'react'
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MenuIcon from '@mui/icons-material/Menu';
import api from "../../http";
import "./navbar.css"

const Navbar = ({ toggleSideBar }) => {
    const [zone, setZone] = useState("");

    useEffect(() => {
        api.get("/api/settings/zone").then((data) => {
            setZone(data.data);
        }).catch((err) => {
           
        });
    }, [])

    const close = useRef(null)

    const handleChange = (e) => {
        api.post("/api/settings/zone", {
            zone
        }).then((data) => {
            console.log(data.data)
            close.current.click();
            alert("Upload Successfull");
        }).catch((err) => {
            console.log(err);
        });
    }
    return (
        <>
            <nav className="navbar" style={{ backgroundColor: '#fff', boxShadow: '0rem 0.2rem 1rem #dddddd' }}>
                <div className="container-fluid">
                    <a className="icon2 mx-2"><MenuIcon onClick={() => toggleSideBar()} /></a>
                    <form className="d-flex align-items-center" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button type="button" className="btn btn-outline-primary" style={{ padding: '0px 10px', height: '35px' }}>Search</button>
                    </form>
                    <div className='mx-2'>
                        <a className="icon1 mx-2"><SettingsIcon data-bs-toggle="modal" data-bs-target="#editModal1" /></a>
                        <a className="icon1 mx-2" href='/notification'><NotificationsNoneIcon /></a>
                    </div>
                </div>
            </nav>

            <div className="modal" id="editModal1" tabIndex="-1" aria-labelledby="editModal1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Enter ZONES separated by comma</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput" className="form-label">ZONE</label>
                                <input type="text" className="form-control" id="formGroupExampleInput" onChange={(e) => setZone(e.target.value)} placeholder={zone} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={close}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={(e) => handleChange(e)}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar