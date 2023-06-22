import React, { useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import api from "../../http";
import dayjs from 'dayjs';
import VisibilityIcon from '@mui/icons-material/Visibility';

function TableRow(props) {
    const [date, setDate] = useState(dayjs(props.createdAt).format('DD/MM/YY'));
    const handleEdit =async () => {
        await localStorage.setItem("lastPayment", props.id);
        props.functio();
    }
    return (

        <tr>
            <td>{props.seller}</td>
            <td>{props.payout}</td>
            <td>{props.createdAt}</td>
            <td>{props.status.toUpperCase()}</td>
            <td>
                <div style={{ color: '#05b171', cursor: 'pointer' }} onClick={() => handleEdit()}><EditIcon /></div>
            </td>

        </tr>

    )
}

export default TableRow