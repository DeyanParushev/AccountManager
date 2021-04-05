import React, { Fragment } from 'react';
import {Link} from 'react-router-dom';

function Account(props) {
    return (
        <Fragment>
            <h1>My Accounts</h1>
            <Link to='/Accounts/Create'>Create new</Link>
        </Fragment>
    )
}

export default Account;