import React, { useState, useEffect, useContext, Fragment } from 'react';
import UserContext from '../../contexts/UserContext';
import { GetOne } from '../../services/ApiService';
import Transaction from '../Transaction/Transaction';
import { Button, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import BackButton from '../utilities/BackButton';
import ApplicationRoutes from '../api-authorization/ApplicationRoutes';
import BalanceBar from '../Balance/BalanceBar';
import Sort from '../../utilityFunctions/SortingFunctions';
import CategoryFilter from '../FilterComponents/CategoryFilter';

function DetailsAccount({ match, history }) {
    const context = useContext(UserContext);
    const [account, setAccount] = useState({});
    const [transactions, setTransactions] = useState([]);
    const [filterredTransactions, setFilterredTransactions] = useState([]);

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
                const transactionList = responseAccount.incomes.concat(responseAccount.expenses);
                const sortedTransactions = Sort.ByDate(transactionList);
                setTransactions(sortedTransactions);
            }
        }

        fetchData(match.params.id, context.user.token);
    }, [])

    const renderTransactions = (transactionList) => {
        if (transactionList.length > 0) {
            return transactionList.map(x => <Transaction key={x.id} transaction={x} />);
        }
    }

    return (
        <Fragment>
            <h1>Account details for <b>{account.name}</b></h1>
            <Link to={ApplicationRoutes.Incomes.Create(account.id)}><Button outline color='success'>Add income</Button></Link>
            <Link to={ApplicationRoutes.Expenses.Create(account.id)}><Button outline color='danger'>Add expense</Button></Link>
            <hr />
            <CategoryFilter transactions={transactions} filterTransactions={setFilterredTransactions} />
            <Table>
                <thead style={{ background: 'lightblue' }}>
                    <tr>
                        <td><b>Date</b></td>
                        <td><b>Category</b></td>
                        <td><b>Amount</b></td>
                        <td><b>Actions</b></td>
                    </tr>
                </thead>
                <tbody>
                    {renderTransactions(filterredTransactions)}
                </tbody>
                <tfoot style={{ background: 'lightblue' }}>
                    <BalanceBar transactions={filterredTransactions} />
                </tfoot>
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