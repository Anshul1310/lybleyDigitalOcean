import React, { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from "react-router-dom";
import dayjs from 'dayjs';
import api from "../../http";


const TableRow = (props) => {
    const [date, setDate] = useState(dayjs(props.createdAt).format('DD/MM/YYYY'));

    const handleDelete = () => {
        api.post("/api/product/delete", {
            id: props._id
        }).then((data) => {
            window.location.reload();
            console.log(data.data);
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
            <td>{props.measuringUnit}</td>
            <td>{props.price}</td>
            <td>{props.seller}</td>
            <td>{props.stock}</td>
            <td>{props.store}</td>
            <td>{props.customerPrice}</td>
            <td>{date}</td>
            <td>
                {/* <div style={{ color: '#05b171', cursor: 'pointer' }} onClick={() => props.modalOpen()} state={{ from: props }}><EditIcon /></div> */}
                <Link to='/editProduct' state={{ from: props }}><EditIcon /></Link>
            </td>
            <td>
                <div className="deleteIcon" onClick={(e) => handleDelete(e)}><DeleteIcon /></div>
            </td>
        </tr>
    )
}

export default TableRow;