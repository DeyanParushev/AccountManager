import React, { Fragment } from 'react';

function BalanceBar({ transactions }) {
    let balance = 0;
    if (transactions && transactions.length > 0) {
        transactions.map(x => balance += Number(x.amount));
    }

    let fontColor = Number(balance) <= 0 ? 'red' : 'forestgreen';
    
    return (
        <Fragment>
            <tr>
                <td><b>Balance</b></td>
                <td></td>
                <td style={{ color: fontColor }}><b>{balance.toFixed(2)}</b></td>
                <td></td>
            </tr>
        </Fragment>
    )
}

export default BalanceBar;