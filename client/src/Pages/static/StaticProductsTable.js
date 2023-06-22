import React from 'react'
import TableRow from "./TableRow";
import api from "../../http";
import baseUrl from "../../http/Constant";
import { useState, useEffect } from "react";
import products from '../../StaticProductsData'

const StaticProductsTable = ({ modalOpen }) => {
    const functio = () => {
        modalOpen()
    }
    const [products, setProducts] = useState([]);

    useEffect(() => {
        api.get("/api/product-price/all", {

        }).then((data) => {
            console.log(data.data)
            setProducts(data.data);
        }).catch((err) => {
            // alert("Network Conncetion Error");
            console.log(err);
        });
    }, [])

    return (
        <table className='table table-striped' style={{ marginBottom: '0' }}>
            <thead>
                <tr>
                    <th scope="col">PHOTO</th>
                    <th scope="col">NAME</th>
                    <th scope="col">UNIT OF MEASUREMENT</th>
                    <th scope="col">DATE</th>
                    <th scope="col">LOCATION</th>
                    <th scope="col">PRICE AT</th>
                    <th scope="col">EDIT</th>
                    <th scope="col">REMOVE</th>
                </tr>
            </thead>
            <tbody>
                {
                    products.map((data, key) => {
                        return <TableRow price={data.price} location={data.location} date={data.date} id={data._id} image={baseUrl + "" + data.image} title={data.title} measuringUnit={data.measuringUnit} key={key} modalOpen={modalOpen} />
                    })
                }

            </tbody>
        </table>
    )
}

export default StaticProductsTable