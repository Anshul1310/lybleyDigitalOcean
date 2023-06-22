import React from 'react'
import api from "../../http";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const TableRow = (props) => {
    const handleDelete = (e) => {
        localStorage.setItem("lastCat", props.name);
        props.deleteModalOpen();
        // api.post("/api/categories/delete", {
        //     id: props.id
        // }).then((data) => {
        //     window.location.reload();
        // }).catch((err) => {
        //     alert("Network Conncetion Error");
        //     console.log(err);
        // });
    }

    const hEdit = () => {
        localStorage.setItem("lastCategory", props.id);
        props.modalOpen();
    }

    return (
        <>
            <tr>
                <td>
                    <img src={props.image} />
                </td>
                <td>{props.name}</td>
                <td>
                    <div style={{ color: '#05b171', cursor: 'pointer' }} onClick={(e) => hEdit()}><EditIcon /></div>
                </td>
                <td>
                    <div className="deleteIcon" onClick={(e) => handleDelete()}><DeleteIcon /></div>
                </td>
            </tr>
        </>
    )
}

export default TableRow;