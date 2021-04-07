import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';

function Account(props) {
    return (
        <Fragment>
            <h1>My Accounts</h1>
            <Link to='/Accounts/Create'>Create new</Link>
        </Fragment>
    )
}

export default Account;