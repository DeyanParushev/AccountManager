import React, { useState, useEffect, useContext, Fragment } from 'react';
import UserContext from '../../contexts/UserContext';
import { GetOne, GetAll } from '../../services/ApiService';
import Transaction from '../Transaction/Transaction';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

function DetailsAccount({ match }) {
    const context = useContext(UserContext);
    const [account, setAccount] = useState({});

    useEffect(() => {
        let responseAccount = {};
        async function fetchData(userId, token) {
            const response = await GetOne(userId, 'Accounts', token);
            responseAccount = await response.json();
            setAccount(responseAccount);
        }

        fetchData(match.params.accountId, context.user.token);
    }, [])

    const renderIncomes = () => {
        if (account.incomes !== undefined) {
            return (account.incomes.map(x => renderTransaction(x, 'Incomes')));
        }
    }

    const renderTransaction = (transaction, transactionType) => {
        if (transaction.id) {
            return <Transaction key={transaction.id} transaction={transaction} transactionType={transactionType} />
        }
    }

    const renderExpenses = () => {
        if (account.expenses !== undefined) {
            return (account.expenses.map(x => renderTransaction(x, 'Expenses')));
        }
    }

    return (
        <Fragment>
            <h1>Account details for {account.name}</h1>
            <p>{account.name}</p>
            <Link to={`/Incomes/Create/${account.id}`}><Button outline color='success'>Add income</Button></Link>
            <Link to={`/Expenses/Create/${account.id}`}><Button outline color='danger'>Add expense</Button></Link>
            <table>
                <thead>
                    <tr>
                        <td>Date</td>
                        <td>Category</td>
                        <td>Amount</td>
                        <td>Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {renderIncomes()}
                    {renderExpenses()}
                </tbody>
            </table>
        </Fragment>
    )
}

export default DetailsAccount;