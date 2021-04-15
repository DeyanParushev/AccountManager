import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

const Transaction = ({transaction, transactionType}) => {

    const date = new Date(transaction.date);
    const shortDate = date.toLocaleDateString();
    return (
            <tr key={transaction.id}>
                <td>{shortDate}</td>
                <td>{transaction.category}</td>
                <td>{transaction.amount}</td>
                <td>
                    <Link to={`/${transactionType}/Details/${transaction.id}`}><i className="fas fa-info-circle"></i></Link>
                    <Link to={`/${transactionType}/Edit/${transaction.id}`}><i className="fas fa-edit"></i></Link>
                    <Link to={`/${transactionType}/Delete/${transaction.id}`}><i className="fas fa-trash-alt"></i></Link>
                </td>
            </tr>
    )
}

export default Transaction;