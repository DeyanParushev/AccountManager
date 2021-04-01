import * as React from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { AuthPrefix } from './components/api-authorization/ApiAuthorizationConstants';

import './custom.css'
import Income from './components/Income/Income';
import Expense from './components/Expense/Expense';
import Account from './components/Account/Account';


export default class App extends React.Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route exact path='/' component={Home} />
                <Route path={AuthPrefix} component={ApiAuthorizationRoutes} />
                <Route exact path='/Incomes' component={Income} />
                <Route exact path='/Expenses' component={Expense} />
                <Route exact path='/Accounts' component={Account} />
            </Layout>
        );
    }
}
