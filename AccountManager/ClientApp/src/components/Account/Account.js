import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';
import { GetAll } from '../../services/ApiService';

function Account(props) {
    const context = useContext(UserContext);
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        async function fetchData() {
            let response = await GetAll(context.user.id, 'Accounts', context.user.token)
            let responseAccounts = await response.json();
            setAccounts(accounts => accounts = setAccounts));
        }

        fetchData();
    }, [accounts]);

    console.log(accounts);
    // const renderAccounts = () => {
    //     if(accounts) {
    //         accounts.map(x => createReactElement(x));
    //     }
    // }

    const createReactElement = (account) => {
        return (
            <Fragment>
                <div key={account.id}>
                    <span>{account.name}</span>
                    <Button putline color='primary'><Link to='/'>Details</Link></Button>
                </div>
            </Fragment>
        )
    }
    return (
        <Fragment>
            <h1>My Accounts</h1>
            {/* {renderAccounts()} */}
        </Fragment>
    )
}

export default Account;