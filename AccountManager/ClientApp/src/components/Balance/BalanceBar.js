import React, { Fragment } from 'react';

function BalanceBar({ transactions }) {
    let balance = 0;
    transactions.map(x => balance += Number(x.amount));
    const balanceColor = balance < 0 ? 'red' : 'darkgreen'
    return (
        <Fragment>
            <tr>
                <td><b>Balance</b></td>
                <td></td>
                <td style={{color: balanceColor}}><b>{balance.toFixed(2)}</b></td>
                <td></td>
            </tr>
        </Fragment>
    )
}

export default BalanceBar;