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
import DetailsAccount from './components/Account/DetailsAccount';
import CraateFilterComponent from './components/FilterComponents/CreateFilterComponent';
import DetailsTransaction from './components/Transaction/DetailsTransaction';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                username: '',
                id: '',
                token: '',
                email: '',
            },
            isLoggedIn: false,
        }
    };
    static displayName = App.name;

    render() {
        const value = {
            user: this.state.user,
            setUser: (inputUser) => {
                if(JSON.stringify(inputUser) === '{}') {
                    this.setState({user: inputUser, isLoggedIn: false});
                } else {
                    this.setState({user: inputUser, isLoggedIn: true});
                }
            },
            isLoggedIn: this.state.isLoggedIn,
        }

        return (
            <UserContext.Provider value={value}>
                <Layout>
                    <Route exact path='/' component={Home} />
                    <Route path={AuthPrefix} component={ApiAuthorizationRoutes} />
                    <Route exact path='/Incomes' component={Income} />
                    <Route exact path='/Incomes/Create/:accountId' component={CreateTransaction} />
                    <Route exact path='/Incomes/Details/:id' component={DetailsTransaction} />
                    <Route exact path='/Expenses' component={Expense} />
                    <Route exact path='/Expenses/Create/:accountId' component={CreateTransaction} />
                    <Route exact path='/Expenses/Details/:id' component={DetailsTransaction} />
                    <Route exact path='/Accounts' component={Account} />
                    <Route exact path='/Accounts/Create' component={CreateAccount} />
                    <Route exact path='/Accounts/Details/:accountId' component={DetailsAccount} />
                    <Route exact path='/Categories/Create' component={CraateFilterComponent} />
                    <Route exact path='/Tags/Create' component={CraateFilterComponent} />
                </Layout>
            </UserContext.Provider>
        );
    }
}
