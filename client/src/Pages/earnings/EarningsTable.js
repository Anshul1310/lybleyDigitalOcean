import React, { useEffect, useState } from 'react'
import api from "../../http";
import payments from '../../EarningsData'
import TableRow from "./TableRow";



const EarningsTable = ({ modalOpen, status }) => {

    const [payments, setPayments] = useState([]);
    useEffect(() => {
        api.get("/api/transaction/" + status).then((data) => {
            setPayments(data.data);
        }).catch((err) => {
            alert("Network Conncetion Error");
            console.log(err);
        });
    }, [status])

    return (
        <table className='table table-striped' style={{ marginBottom: '0' }}>
            <thead>
                <tr>

                    <th scope="col">Seller ID</th>
                    <th scope="col">PAYOUT</th>
                    <th scope="col">CREATED AT</th>
                    <th scope="col">STATUS</th>
                    <th scope="col">EDIT</th>
                </tr>
            </thead>
            <tbody>
                {
                    payments.map((data, id, index) => {
                        return <TableRow key={id} functio={modalOpen} id={data._id} status={data.status} createdAt={data.createdAt} seller={data.seller} payout={data.payout} />
                    })
                }
            </tbody>
        </table>
    )
}

export default EarningsTable