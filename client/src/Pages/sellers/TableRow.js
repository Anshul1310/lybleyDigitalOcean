import { Link } from "react-router-dom";
import api from "../../http";
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';

const TableRow = (props) => {
    const deleteSeller = (e) => {
        api.post("/api/sellers/delete", {
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
            <td>{props.id}</td>
            <td>{props.name}</td>
            <td>{props.email}</td>
            <td>{props.phone}</td>
            <td>{props.type}</td>
            <td>{props.level}</td>
            <td>
                <Link className="btn btn-primary" to="/viewSeller" role="button" state={{ from: props }}>View</Link>
            </td>
            <td><DeleteIcon className="deleteIcon" onClick={(e) => deleteSeller(e)} /></td>
        </tr>
    );
}

export default TableRow;