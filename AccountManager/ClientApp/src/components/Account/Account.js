import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';
import { GetAll } from '../../services/ApiService';
import BackButton from '../utilities/BackButton';
import ApplicationRoutes from '../api-authorization/ApplicationRoutes';

function Account({ history }) {
    const context = useContext(UserContext);
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        let responseAccounts = [];

        if (!context.user.id) {
            history.push(ApplicationRoutes.Login);
        }

        async function fetchData() {
            if (accounts.length < 1) {
                let response = await GetAll(context.user.id, 'Accounts', context.user.token)
                responseAccounts = await response.json();
                setAccounts(responseAccounts);
            }
        }

        fetchData();
    });

    const renderAccounts = () => {
        if (accounts) {
            return accounts.map(x => createReactElement(x));
        }
    }

    const createReactElement = (account) => {
        return (
            <Fragment key={account.id}>
                <Link to={ApplicationRoutes.Accounts.Details(account.id)}><Button outline color='info'>{account.name}</Button></Link>
            </Fragment>
        )
    }
    return (
        <Fragment>
            <h1>My Accounts</h1>
            {renderAccounts()}

            <div>
                <Link to={ApplicationRoutes.Accounts.Create(context.user.id)}><Button outline color='success'>Create new</Button></Link>
            </div>
            <div>
                <BackButton history={history} />
            </div>
        </Fragment>
    )
}

export default Account;