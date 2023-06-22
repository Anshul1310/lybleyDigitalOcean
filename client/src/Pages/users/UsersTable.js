import React from 'react'
import { Link } from 'react-router-dom'
import TableRow from "./TableRow";
import ReactDOM from 'react-dom'
import { useState, useEffect } from "react";
import Users from '../../Users'
import api from "../../http";

const UsersTable = (props) => {
    const [buyers, setBuyers] = useState([]);
    useEffect(() => {
        api.get("/api/buyers/" + props.status).then((data) => {
            try {
                setBuyers(data.data);
            } catch (e) {

            }

        }).catch((err) => {
            // alert("Network Conncetion Error");
            console.log(err);
        });
    }, [props.status]);

    return (
        <table className='table table-striped' style={{ marginBottom: '0' }}>
            <thead>
                <tr>

                    <th scope="col">ID</th>
                    <th scope="col">ORGANISATION</th>
                    <th scope="col">CONTACT PERSON</th>
                    <th scope="col">CONTACT NUMBER</th>
                    <th scope="col">CUSTOMER TYPE</th>
                    <th scope="col">CUSTOMER LEVEL</th>
                    <th scope="col">STATUS</th>
                    <th scope="col">EDIT</th>
                </tr>
            </thead>
            <tbody>
                {buyers.map((data, id) => {
                    return <TableRow key={id} _id={data._id} shopOuter={data.shopOuter} shopInner={data.shopInner} name={data.name} gst={data.gst} organization={data.organization} email={data.email} phone={data.phone} additional_number={data.additional_number} contact_person={data.contact_person} status={data.status} address={data.address} pan={data.pan} level={data.level} type={data.type} />
                })}
            </tbody>
        </table>
    )
}

export default UsersTable

