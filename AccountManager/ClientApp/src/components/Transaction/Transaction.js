import React from 'react';
import { Link } from 'react-router-dom';

const Transaction = ({ transaction, transactionType, deleteFunction }) => {
    const transctionColors = {
        Incomes: 'lightgreen',
        Expenses: 'red',
    }

    const date = new Date(transaction.date);
    const shortDate = date.toLocaleDateString();

    return (
        <tr key={transaction.id}>
            <td>{shortDate}</td>
            <td>{transaction.category ? transaction.category.name : 'N/A'}</td>
            <td style={{ color: transctionColors[transactionType] }}><b>{transaction.amount}</b></td>
            <td>
                <Link to={`/${transactionType}/Details/${transaction.id}`}><i className="fas fa-info-circle"></i></Link>
                <Link to={`/${transactionType}/Edit/${transaction.id}`}><i className="fas fa-edit"></i></Link>
                <Link to={`/${transactionType}/Delete/${transaction.id}`}><i className="fas fa-trash-alt"></i></Link>
                {/* <span onClick={onDeleteHandler}><i className="fas fa-trash-alt"></i></span> */}
            </td>
        </tr>
    )
}

export default Transaction;