import * as React from 'react';
import { Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Logout from './Logout';
import { ApiRoutes } from './ApiAuthorizationConstants';

export default class ApiAuthorizationRoutes extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <Route exact path={ApiRoutes.Register}>
                    <Register history={this.props.history}/>
                </Route>
                <Route exact path={ApiRoutes.Login}>
                    <Login props={this.props} />
                </Route>
                <Route exact path={ApiRoutes.Logout}>
                    <Logout props={this.props}/>
                </Route>
            </React.Fragment>
        );
    }
}