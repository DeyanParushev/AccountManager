import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

const Transaction = ({transaction, transactionType}) => {
    console.log(transaction);
    return (
            <tr key={transaction.id}>
                <td>{transaction.date}</td>
                <td>{transaction.category}</td>
                <td>{transaction.amount}</td>
                <td>
                    <Link to={`/${transactionType}/Details/${transaction.id}`}><Button outline color='info'>Details</Button></Link>
                    <Link to={`/${transactionType}/Edit/${transaction.id}`}><Button outline color='primary'>Edit</Button></Link>
                    <Link to={`/${transactionType}/Delete/${transaction.id}`}><Button outline color='danger'>Delete</Button></Link>
                </td>
            </tr>
    )
}

export default Transaction;