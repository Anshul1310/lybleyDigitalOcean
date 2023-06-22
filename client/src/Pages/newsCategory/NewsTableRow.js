import React from 'react'
import api from "../../http";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
const NewsTableRow = (props) => {

    const handleDelete = (e) => {
        api.post("/api/newscategories/delete", {
            id: props.id
        }).then((data) => {
            window.location.reload();
        }).catch((err) => {
            alert("Network Conncetion Error");
            console.log(err);
        });
    }

    const hEdit = () => {
        localStorage.setItem("lastNewsCategory", props.id);
        props.modalOpen();
    }

    return (
        <tr>
            <td>
                <img src={props.image} alt="cookie" />
            </td>
            <td>{props.name}</td>
            <td>
                <div style={{ color: '#05b171', cursor: 'pointer' }} onClick={() => hEdit()}><EditIcon /></div>
            </td>
            <td>
                <div className="deleteIcon" onClick={(e) => handleDelete(e)}><DeleteIcon /></div>
            </td>
        </tr>
    )
}

export default NewsTableRow;