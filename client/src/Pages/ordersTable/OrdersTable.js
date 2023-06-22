import React, { useState, useEffect } from 'react'
import TableRow from "./TableRow";
import orders from '../../OrdersData'
import api from "../../http";
import baseUrl from "../../http/Constant";
import { Link } from 'react-router-dom'

const OrdersTable = (props) => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        api.get("/api/order/" + props.status).then((data) => {
            console.log(data.data);
            setOrders(data.data);
        }).catch((err) => {
            alert("Network Conncetion Error");
            console.log(err);
        });
    }, [props.status])
    return (
        <table className='table table-striped' style={{ marginBottom: '0' }}>
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">BUYER</th>
                    <th scope="col">DATE</th>
                    <th scope="col">STATUS</th>
                    <th scope="col">TOTAL</th>
                    <th scope="col">VIEW</th>
                </tr>
            </thead>
            <tbody>
                {
                    orders.map((data, id, index) => {
                        return <TableRow orderId={data.orderId} items={data.items} totalPrice={data.totalPrice} status={data.status} buyer={data.buyer} date={data.createdAt} />
                    })
                }

            </tbody>
        </table>
    )
}

export default OrdersTable