import React from 'react'
import { useEffect, useState } from "react";
import TableRow from "./TableRow";
import ProductsData from '../../ProductsData';
import api from "../../http";
import baseUrl from "../../http/Constant";


const ProductsTable = ({ modalOpen, lastCat }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        console.log(lastCat + "");
        api.get(`/api/product/${lastCat}`).then((data) => {
            setProducts(data.data);
        }).catch((err) => {
            console.log(err);
        });
    }, [lastCat])

    return (
        <table className='table table-striped' style={{ marginBottom: '0' }}>
            <thead>
                <tr>
                    <th scope="col">PHOTO</th>
                    <th scope="col">NAME</th>
                    <th scope="col">Measuring Unit</th>
                    <th scope="col">PRICE</th>
                    <th scope="col">SELLER</th>
                    <th scope="col">STOCK</th>
                    <th scope="col">STORE</th>
                    <th scope="col">CUSTOMER PRICE</th>

                    <th scope="col">CREATED AT</th>
                    <th scope="col">EDIT</th>
                    <th scope="col">REMOVE</th>
                </tr>
            </thead>
            <tbody>
                {products.map((data, id) => {
                    return <TableRow key={id} customerPrice={data.customerPrice} image1={data.image1}  image2={data.image2}  image3={data.image3} variant={data.variant}  image4={data.image4} customerPrice={data.customerPrice} deliveryCharge={data.deliveryCharge} brand={data.brand} details={data.details} stock={data.stock} moq={data.moq} store={data.store} seller={data.seller} createdAt={data.createdAt} _id={data._id} title={data.title} description={data.description} category={data.category} image={baseUrl + "" + data.image} price={data.price} slashedPrice={data.slashedPrice} measuringUnit={data.measuringUnit} />
                })}
            </tbody>
        </table>
    )
}

export default ProductsTable