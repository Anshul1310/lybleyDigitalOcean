import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react'
import api from "../../http";
import { Link } from "react-router-dom";

const TableRow = (props) => {
    const handleDelete = () => {
        api.post("/api/admin/delete", {
            id: props.id
        }).then((data) => {
            window.location.reload();
        }).catch((err) => {
            alert("Network Conncetion Error");
            console.log(err);
        });
    }

    const { email, name, id, password, access } = props;
    return (
        <tr>

            <td>{id}</td>
            <td>{name}</td>
            <td>{password}</td>
            <td>
                <Link className="btn btn-primary" to="/viewAdmin" role="button" state={{ from: { name, email, password, id, access } }}>View</Link>
            </td>
            <td>
                <div className="deleteIcon" onClick={(e) => handleDelete(e)} ><DeleteIcon /></div>
            </td>

        </tr>);
}

export default TableRow;