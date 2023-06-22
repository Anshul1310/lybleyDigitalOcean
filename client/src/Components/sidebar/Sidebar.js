import React, { useEffect } from "react";
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FeedIcon from '@mui/icons-material/Feed';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import SellIcon from '@mui/icons-material/Sell';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import "./sidebar.css";

const Sidebar = () => {
    const navigate = useNavigate();
    const logoutUser = (e) => {
        localStorage.removeItem("token")
        navigate("/login");
    }
    const function1 = () => {
        // var ul = document.getElementById("menuUl");
        // console.log(ul);
        // var li = ul.getElementsByClassName("item");
        // console.log(li);
        // for (var i = 0; i < li.length; i++) {
        //     li[i].addEventListener("click", function () {
        //         var current = document.getElementsByClassName("active");
        //         current[0].className = current[0].className.replace(" active", "");
        //         this.className += " active";
        //     });
        // }
        document.querySelectorAll('.link1').forEach(
            link => {
                if (link.href === window.location.href) {
                    link.setAttribute('aria-current', 'page')
                }
            }
        )
    }
    useEffect(() => {
        function1()
    }, [])

    return (
        <>
            <div className="top">
                <span className="heading">Admin Panel</span>
            </div>
            <div className="menu">
                MENU
            </div>

            <div className="center">
                <ul id="menuUl">
                    <li className="item" data-bs-toggle="tooltip" title="Dashboard">
                        <a href='/' className="link1">
                            <DashboardIcon className="icon" />
                            <span className="spanList">Dashboard</span>
                        </a>
                    </li>
                    <li className="item" data-bs-toggle="tooltip" title="Users">
                        <a href='/users' className="link1">
                            <PersonOutlineIcon className="icon" />
                            <span className="spanList">Users</span>
                        </a>
                    </li>
                    <li className="item" data-bs-toggle="tooltip" title="Products">
                        <a href='/products' className="link1">
                            <StoreMallDirectoryIcon className="icon" />
                            <span className="spanList">Products</span>
                        </a>
                    </li>
                    <li className="item" data-bs-toggle="tooltip" title="Sell on lybley">
                        <a href='/sellOnLybley' className="link1">
                            <SellIcon className="icon" />
                            <span className="spanList">Sell On Lybley</span>
                        </a>
                    </li>
                    {/* <li className="item" data-bs-toggle="tooltip" title="topDeals" style={{ borderBottom: '1px solid #e3e3e3' }}>
                        <a href='/topDeals' className="link1">
                            <LocalOfferIcon className="icon" />
                            <span className="spanList">Top Deals</span>
                        </a>
                    </li> */}
                    <li className="item" data-bs-toggle="tooltip" title="banner imgs">
                        <a href='/banner' className="link1">
                            <StoreMallDirectoryIcon className="icon" />
                            <span className="spanList">Banner Images</span>
                        </a>
                    </li>
                    <li className="item" data-bs-toggle="tooltip" title="Categories">
                        <a href='/categories' className="link1">
                            <CategoryOutlinedIcon className="icon" />
                            <span className="spanList">Categories</span>
                        </a>
                    </li>
                    <li className="item" data-bs-toggle="tooltip" title="Sellers">
                        <a href='/sellers' className="link1">
                            <LocalShippingOutlinedIcon className="icon" />
                            <span className="spanList">Sellers</span>
                        </a>
                    </li>
                    <li className="item" data-bs-toggle="tooltip" title="Stores" style={{ borderBottom: '1px solid #e3e3e3' }}>
                        <a href='/stores' className="link1">
                            <StoreMallDirectoryIcon className="icon" />
                            <span className="spanList">Stores</span>
                        </a>
                    </li>
                    <li className="item" data-bs-toggle="tooltip" title="news category">
                        <a href='/newsCategory' className="link1">
                            <CategoryOutlinedIcon className="icon" />
                            <span className="spanList">News Category</span>
                        </a>
                    </li>
                    <li className="item" data-bs-toggle="tooltip" title="Earnings">
                        <a href='/earnings' className="link1">
                            <AttachMoneyIcon className="icon" />
                            <span className="spanList">Earnings</span>
                        </a>
                    </li>
                    <li className="item" data-bs-toggle="tooltip" title="Orders">
                        <a href='/orders' className="link1">
                            <ShoppingBasketIcon className="icon" />
                            <span className="spanList">Orders</span>
                        </a>
                    </li>
                    <li className="item" data-bs-toggle="tooltip" title="Static product" style={{ borderBottom: '1px solid #e3e3e3' }}>
                        <a href='/staticProducts' className="link1">
                            <StoreMallDirectoryIcon className="icon" />
                            <span className="spanList">Static Products</span>
                        </a>
                    </li>
                    <li className="item" data-bs-toggle="tooltip" title="Notification">
                        <a href='/notification' className="link1">
                            <NotificationsNoneIcon className="icon" />
                            <span className="spanList">Notifications</span>
                        </a>
                    </li>
                    <li className="item" data-bs-toggle="tooltip" title="News">
                        <a href='/news' className="link1">
                            <FeedIcon className="icon" />
                            <span className="spanList">News</span>
                        </a>
                    </li>
                    <li className="item" data-bs-toggle="tooltip" title="Admins">
                        <a href='/admins' className="link1">
                            <SettingsIcon className="icon" />
                            <span className="spanList">Admins</span>
                        </a>
                    </li>

                    <li className="item" data-bs-toggle="tooltip" title="LogOut">
                        <a href="/login" className="link1">
                            <LogoutIcon className="icon" onClick={(e) => logoutUser(e)} />
                            <span className="spanList">Logout</span>
                        </a>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default Sidebar;