import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import api from "../../http";
import React from 'react'
const TableRow = (props) => {

    const handleDelete = (e) => {
        api.post("/api/stores/delete", {
            id: props.id
        }).then((data) => {
            window.location.reload();
        }).catch((err) => {
            // alert("Network Conncetion Error");
            console.log(err);
        });
    }

    const handleEdit = (e) => {
        localStorage.setItem("lastStore", props.id);
        props.modalOpen();
    }

    return (
        <tr>

            <td>{props.name}</td>
            <td>{props.location}</td>
            <td>{props.capacity}</td>
            <td>
                <div style={{ color: '#05b171', cursor: 'pointer' }} onClick={handleEdit}><EditIcon /></div>
            </td>
            <td>
                <div className="deleteIcon" ><DeleteIcon onClick={(e) => handleDelete(e)} /></div>
            </td>
        </tr>
    );
}

export default TableRow;