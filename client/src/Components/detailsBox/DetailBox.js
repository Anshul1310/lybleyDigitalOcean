import "./detailBox.css";
import { Link } from "react-router-dom";
import { FaUsers, FaDollarSign } from 'react-icons/fa'
import { MdInventory } from 'react-icons/md'
import { AiFillShop } from 'react-icons/ai'
import React, { useEffect, useState } from "react";
import api from "../../http/index";

const DetailBox = () => {
    const [productNo, setProductNo] = useState("");
    const [orderNo, setOrderNo] = useState("");
    const [userNo, setUserNo] = useState("");
    const [earning, setEarning] = useState("");
    useEffect(() => {
        api.get("/api/settings/cards", {

        }).then((data) => {

            setEarning(data.data.totalPrice);
            setUserNo(data.data.buyerNo);
            setProductNo(data.data.productNo);
            setOrderNo(data.data.orderNo);
        }).catch((err) => {
            // console.log(err);
        });
    }, [])
    return (
        <>
            <div className="hi">
                <div className="left_detail">
                    <span className="left_detaiL_heading">USERS
                    </span>

                    {/* <span className="left_details_number">13420
                    </span> */}
                    <span className="left_details_number">{userNo}
                    </span>

                    <Link to='/users'>
                        <span className="left_deatail_see_all_user">See all users
                        </span>
                    </Link>
                </div>
                <div className="right_detail">
                    <FaUsers />
                </div>
            </div>
            <div className="hi2">
                <div className="left_detail">
                    <span className="left_detaiL_heading">ORDERS
                    </span>

                    {/* <span className="left_details_number">498
                    </span> */}
                    <span className="left_details_number">{orderNo}
                    </span>

                    <Link to='/orders'>
                        <span className="left_deatail_see_all_user">See all orders
                        </span>
                    </Link>
                </div>
                <div className="right_detail">
                    <MdInventory style={{ color: '#D38312' }} />
                </div>
            </div>
            <div className="hi3">
                <div className="left_detail">
                    <span className="left_detaiL_heading">PRODUCTS
                    </span>

                    {/* <span className="left_details_number">49727
                    </span> */}
                    <span className="left_details_number">{productNo}
                    </span>

                    <Link to='/products'>
                        <span className="left_deatail_see_all_user">See all products
                        </span>
                    </Link>
                </div>
                <div className="right_detail">
                    <AiFillShop style={{ color: '#83a4d4' }} />
                </div>
            </div>
            <div className="hi4">
                <div className="left_detail">
                    <span className="left_detaiL_heading">EARNINGS
                    </span>

                    {/* <span className="left_details_number">48276
                    </span> */}
                    <span className="left_details_number">{earning}
                    </span>

                    <Link to='/earnings'>
                        <span className="left_deatail_see_all_user">See all earnings
                        </span>
                    </Link>
                </div>
                <div className="right_detail">
                    <FaDollarSign style={{ color: '#9d50bb' }} />
                </div>
            </div>
        </>
    )
}

export default DetailBox;