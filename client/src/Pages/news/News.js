import React, { useState, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import Navbar from "../../Components/navbar/Navbar";
import Sidebar from "../../Components/sidebar/Sidebar";
// import api from "../../http";
import NewsTable from '../news/NewsTable';
import './news.css';
import LinearProgress from "@mui/material/LinearProgress";



const News = () => {

    const [showSidebar, setShowSidebar] = useState(true)
    const toggleSideBar = () => {
        setShowSidebar(!showSidebar)
    }
    return (
        <div className="main">
            {showSidebar ? <div className="Sidebar"><Sidebar /></div> : <div className="SidebarSmall"><Sidebar /></div>}
            <div className="flex-container" style={showSidebar ? { marginLeft: '258px' } : { marginLeft: '95px' }}>
                <Navbar toggleSideBar={toggleSideBar} />
                
                <div className="NewsPage">
                    <div className="sortAndActions p-2 bg-info bg-opacity-10">
                        <h2>All News</h2>
                        
                        
                        <button className="btn btn-primary" style={{ padding: '0.5rem' }} type="button">
                            <a href="/news/push" style={{ color: '#fff', textDecoration: 'none' }}>Push News</a>
                        </button>
                    </div>
                    <div className="news">
                        <NewsTable />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default News
