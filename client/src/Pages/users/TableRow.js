import EditIcon from '@mui/icons-material/Edit';
import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from "react-router-dom";
const TableRow = (props) => {

    const { organization, name, _id, phone, level, type } = props;

    return (
        <tr>

            <td>{_id}</td>
            <td>{organization}</td>
            <td>{name}</td>
            <td>{phone}</td>
            <td>{type}</td>
            <td>{level}</td>
            <td>
                <button type="button" style={{ cursor: 'auto', color: 'green', fontWeight: 'bold', border: 'none', background: '#f7f7f700' }}>Active</button>
            </td>
            <td>
                <Link className="btn btn-primary" to="/viewUser" role="button" state={{ from: props }}>View</Link>
            </td>
        </tr>
    );
}

export default TableRow;