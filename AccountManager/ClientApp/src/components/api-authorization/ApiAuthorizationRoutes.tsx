import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Logout from './Logout';
import { ApplicationPaths } from './ApiAuthorizationConstants';

export default class ApiAuthorizationRoutes extends Component {
    render() {
        return (
            <Fragment>
                <Route path={ApplicationPaths.Register}>
                    <Register />
                </Route>
                <Route path={ApplicationPaths.Login}>
                    <Login />
                </Route>
                <Route path={ApplicationPaths.Logout}>
                    <Logout />
                </Route>
            </Fragment>
        );
    }
}