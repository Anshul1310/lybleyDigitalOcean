import React, { useState } from 'react'
import api from "../../http";

function TableRow(props) {
    return (

        <tr>
            <td>{props.name}</td>
            <td>{props.phone}</td>
            <td>{props.city}</td>
            <td>{props.category}</td>

        </tr>

    )
}

export default TableRow