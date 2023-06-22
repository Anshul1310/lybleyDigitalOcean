import React from 'react'
import TableRow from "./TableRow";
import api from "../../http";
import { useEffect, useState } from "react";
import data from '../../StoresData'

const StoresTable = ({ modalOpen }) => {
    const [stores, setStores] = useState([]);
    useEffect(() => {
        api.get("/api/stores/all").then((data) => {
            console.log(data.data);
            setStores(data.data)
        }).catch((err) => {
            // alert("Network Conncetion Error");
            console.log(err);
        });
    }, [])
    return (
        <table className='table table-striped' style={{ marginBottom: '0' }}>
            <thead>
                <tr>
                    <th scope="col">STORE NAME</th>
                    <th scope="col">STORE LOCATION</th>
                    <th scope="col">STORE CAPACITY</th>
                    <th scope="col">EDIT</th>
                    <th scope="col">DELETE</th>
                </tr>
            </thead>
            <tbody>{
                stores.map((data, key) => {
                    return <TableRow id={data._id} key={key} modalOpen={modalOpen} name={data.name} location={data.location} capacity={data.capacity} />
                })

            }
            </tbody>
        </table>
    )
}

export default StoresTable