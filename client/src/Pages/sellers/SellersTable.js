import React from 'react'
import { useState, useEffect } from "react";
import TableRow from "./TableRow";
import api from "../../http";


const SellersTable = (props) => {
    const [sellers, setSellers] = useState([]);
    useEffect(() => {
        api.get("/api/sellers/all/" + props.status).then((data) => {
            console.log(data.data);
            setSellers(data.data);
        }).catch((err) => {
            alert("Network Conncetion Error");
            console.log(err);
        });
    }, [props.status]);


    return (
        <table className='table table-striped' style={{ marginBottom: '0' }}>
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">NAME</th>
                    <th scope="col">EMAIL</th>
                    <th scope="col">NUMBER</th>
                    <th scope="col">SELLER TYPE</th>
                    <th scope="col">SELLER LEVEL</th>
                    <th scope="col">VIEW</th>
                    <th scope="col">DELETE</th>
                </tr>
            </thead>
            <tbody>
                {sellers.map((data, id) => {
                    return <TableRow category={data.category} key={id} id={data._id} name={data.name} email={data.email} type={data.type} gender={data.gender} age={data.age} region={data.region} zone={data.zone} status={data.status} woreda={data.woreda} kebele={data.kebele} phone={data.phone}
                        additional_number={data.additional_number} level={data.level} bookNumber={data.bookNumber} tin={data.tin}
                    />
                })}
            </tbody>
        </table>
    )
}

export default SellersTable