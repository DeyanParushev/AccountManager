import React, { useState, useEffect, useContext, Fragment } from 'react';
import UserContext from '../../contexts/UserContext';
import { GetOne } from '../../services/ApiService';
import Transaction from '../Transaction/Transaction';
import { Button, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import BackButton from '../utilities/BackButton';
import ApplicationRoutes from '../api-authorization/ApplicationRoutes';

function DetailsAccount({ match, history }) {
    const context = useContext(UserContext);
    const [account, setAccount] = useState({});
    const transactionTypes = {
        Incomes: 'Incomes',
        Expenses: 'Expenses',
    };

    useEffect(() => {
        if (!context.user.id) {
            history.push(ApplicationRoutes.Login);
        }

        let responseAccount = {};
        async function fetchData(userId, token) {
            const response = await GetOne(userId, 'Accounts', token);
            if (response.status === 200) {
                responseAccount = await response.json();
                setAccount(responseAccount);
            }
        }

        fetchData(match.params.id, context.user.token);
    }, [])

    const renderIncomes = () => {
        if (account.incomes !== undefined) {
            return (account.incomes.map(x => renderTransaction(x, transactionTypes.Incomes)));
        }
    }

    const renderTransaction = (transaction, transactionType) => {
        if (transaction.id) {
            return <Transaction key={transaction.id} transaction={transaction} transactionType={transactionType} />
        }
    }

    const renderExpenses = () => {
        if (account.expenses !== undefined) {
            return (account.expenses.map(x => renderTransaction(x, transactionTypes.Expenses)));
        }
    }

    return (
        <Fragment>
            <h1>Account details for <b>{account.name}</b></h1>
            <Link to={ApplicationRoutes.Incomes.Create(account.id)}><Button outline color='success'>Add income</Button></Link>
            <Link to={ApplicationRoutes.Expenses.Create(account.id)}><Button outline color='danger'>Add expense</Button></Link>
            <hr />
            <Table>
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
            </Table>
            <Link to={ApplicationRoutes.Accounts.Edit(account.id)}><Button outline color='primary'>Edit Account</Button></Link>
            <Link to={ApplicationRoutes.Accounts.Delete(account.id)}><Button outline color='danger'>Delete</Button></Link>
            <div>
                <BackButton history={history} />
            </div>
        </Fragment>
    )
}

export default DetailsAccount;