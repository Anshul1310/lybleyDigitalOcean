import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import React, { useState } from 'react'
import api from "../../http";
import dayjs from 'dayjs';
import { Link } from "react-router-dom";

const TableRow = (props) => {
    const [date, setDate] = useState(dayjs(props.createdAt).format('DD/MM/YY'));

    const handleEdit = (e) => {

    }
    const handleClick = (e) => {
        api.post("/api/news/delete", {
            id: props.id
        }).then((data) => {
            window.location.reload();
        }).catch((err) => {
            // alert("Network Conncetion Error");
            console.log(err);
        });
    }
    return (
        <tr>
            <td>
                <img src={props.image} />
            </td>
            <td>{props.title}</td>
            <td>{props.category}</td>
            <td>{props.date}</td>
            <td>{props.description}</td>
            <td>
                <Link className="btn btn-primary" role="button" to="/news/edit" state={{ from: props }} >View</Link>
            </td>
            <td>
                <div className="deleteIcon" onClick={(e) => handleClick(e)}><DeleteIcon /></div>
            </td>
        </tr >
    );
}

export default TableRow;