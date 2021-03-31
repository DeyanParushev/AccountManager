import * as React from 'react';
import { Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Logout from './Logout';
import { ApplicationPaths } from './ApiAuthorizationConstants';

export default class ApiAuthorizationRoutes extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(ApplicationPaths.Incomes);
        return (
            <React.Fragment>
                <Route path={ApplicationPaths.Register}>
                    <Register history={this.props.history}/>
                </Route>
                <Route path={ApplicationPaths.Login}>
                    <Login />
                </Route>
                <Route path={ApplicationPaths.Logout}>
                    <Logout />
                </Route>
            </React.Fragment>
        );
    }
}