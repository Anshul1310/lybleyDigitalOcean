import React from 'react'
import api from "../../http";
import { useEffect, useState } from "react";
import TableRow from "./TableRow";
import news from '../../NewsData'
import baseUrl from "../../http/Constant";

const NewsTable = ({ modalOpen }) => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        api.get("/api/news/all").then((data) => {
            console.log(data.data);
            setNews(data.data);
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
                    <th scope="col">Title</th>
                    <th scope="col">Category</th>
                    <th scope="col">Date</th>
                    <th scope="col">Description</th>
                    <th scope="col">Delete</th>
                    <th scope="col">Edit</th>
                </tr>
            </thead>
            <tbody>
                {
                    news.map((data, id, index) => {
                        return <TableRow key={id} date={data.createdAt} id={data._id} category={data.category} title={data.title} description={data.description} image={`${baseUrl}${data.image}`} modalOpen={modalOpen} />
                    })
                }
            </tbody>
        </table>
    )
}

export default NewsTable