import * as React from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { AuthPrefix } from './components/api-authorization/ApiAuthorizationConstants';
import UserContext from './contexts/UserContext';
import './custom.css'
import Income from './components/Income/Income';
import CreateTransaction from './components/Transaction/CreateTransaction';
import Expense from './components/Expense/Expense';
import Account from './components/Account/Account';
import CreateAccount from './components/Account/CreateAccount';


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
        }
    };
    static displayName = App.name;

    render() {
        const value = {
            user: this.state.user,
            setUser: this.setState, 
        }

        return (
            <UserContext.Provider value={value}>
                <Layout>
                    <Route exact path='/' component={Home} />
                    <Route path={AuthPrefix} component={ApiAuthorizationRoutes} />
                    <Route exact path='/Incomes' component={Income} />
                    <Route exact path='/Incomes/Create/:accountId' component={CreateTransaction} />
                    <Route exact path='/Expenses' component={Expense} />
                    <Route exact path='/Accounts' component={Account} />
                    <Route exact path='/Accounts/Create' component={CreateAccount} />
                </Layout>
            </UserContext.Provider>
        );
    }
}
