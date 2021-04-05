import React from 'react';

const Transaction = (transaction) => {
       return (
        <tr>
            <td>{transaction.date}</td>
            <td>{transaction.Amount}</td>
            <td>{transaction.Category}</td>
        </tr>
    )
}

export default Transaction;