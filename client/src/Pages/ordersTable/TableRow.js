import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs';


function TableRow(props) {
    const [date, setDate] = useState(dayjs(props.createdAt).format('DD/MM/YY'));

    return (
        <tr>

            <td>{props.orderId}</td>
            <td>{props.buyer}</td>
            <td>{date}</td>
            <td>
                <span>{props.status}</span>
            </td>
            <td>{props.totalPrice}</td>
            <td>
                <Link className="btn btn-info" to="/viewOrder" role="button" state={{ from: { ...props, date } }}>View</Link>
            </td>
        </tr>
    )
}

export default TableRow