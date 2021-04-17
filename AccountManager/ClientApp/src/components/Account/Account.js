import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';
import { GetAll } from '../../services/ApiService';
import BackButton from '../utilities/BackButton';

function Account({ history }) {
    const context = useContext(UserContext);
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        let responseAccounts = [];

        if (!context.user.id) {
            history.push('/Identity/Login');
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
                <Link to={`/Accounts/Details/${account.id}`}><Button outline color='success'>{account.name}</Button></Link>
            </Fragment>
        )
    }
    return (
        <Fragment>
            <h1>My Accounts</h1>
            {renderAccounts()}
            <div>
                <BackButton history={history} />
            </div>
        </Fragment>
    )
}

export default Account;