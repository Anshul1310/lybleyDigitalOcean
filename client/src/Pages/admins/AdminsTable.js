import React, { useEffect, useState } from 'react';
import api from "../../http";
import TableRow from "./TableRow";
import admins from '../../AdminsData'

const AdminsTable = ({ modalOpen }) => {
    const [admins, setAdmin] = useState([]);

    useEffect(() => {
        api.get("/api/admin/all").then((data) => {

            setAdmin(data.data);
        }).catch((err) => {
            alert("Network Conncetion Error");
            console.log(err);
        });
    }, []);

    return (
        <table className='table table-striped' style={{ marginBottom: '0' }}>
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">NAME</th>
                    <th scope="col">PASSWORD</th>
                    <th scope="col">EDIT</th>
                    <th scope="col">DELETE</th>
                </tr>
            </thead>
            <tbody>
                {admins.map((data, id) => {
                    return <TableRow access={data.access} key={id} password={data.password} id={data._id} name={data.name} email={data.email} modalOpen={modalOpen} />;
                })}
            </tbody>
        </table>
    )
}

export default AdminsTable