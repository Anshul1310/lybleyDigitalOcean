import React, { useEffect, useState } from 'react'
import api from "../../http";
import TableRow from "./TableRow";

const EarningsTable = () => {

    useEffect(()=>{
        api.get("/api/sell/all").then((data) => {
            console.log(data.data);
            setSells(data.data);
        }).catch((err) => {
            // alert("Network Conncetion Error");
            console.log(err);
        });
    },[])
    const [sells, setSells] = useState([]);
    return (
        <table className='table table-striped' style={{ marginBottom: '0' }}>
            <thead>
                <tr>

                    <th scope="col">NAME</th>
                    <th scope="col">PHONE</th>
                    <th scope="col">CITY</th>
                    <th scope="col">CATEGORY</th>
                </tr>
            </thead>
            <tbody>
                {
                    sells.map((data, id, index) => {
                        return <TableRow key={id} id={data._id} name={data.name} phone={data.phone} city={data.city} category={data.type} />
                    })
                }
            </tbody>
        </table>
    )
}

export default EarningsTable