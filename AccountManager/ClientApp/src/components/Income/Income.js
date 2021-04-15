import React, { Fragment } from 'react';
import { useState, useEffect } from 'react';
import { GetAll} from '../../services/ApiService';
import Transaction from '../Transaction/Transaction';

const Income = () => {
    const [incomes] = useState([]);

    useEffect(() => {
        GetAll("dadawdaws", "Expenses")
            .then(res => console.log(res));
    }, []);

    return (
        <Fragment>
            <div>
                <h3>Incomes</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Category</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {incomes.map(x => <Transaction transaction={x} />)}
                    </tbody>
                </table>
            </div>
            {/* <Link to="/Incomes/Create/:accountId">Create new</Link> */}
        </Fragment>
    )
}

export default Income;
