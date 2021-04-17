import * as React from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { AuthPrefix } from './components/api-authorization/ApiAuthorizationConstants';
import UserContext from './contexts/UserContext';
import './custom.css'
import CreateTransaction from './components/Transaction/CreateTransaction';
import Account from './components/Account/Account';
import CreateAccount from './components/Account/CreateAccount';
import DetailsAccount from './components/Account/DetailsAccount';
import CraateFilterComponent from './components/FilterComponents/CreateFilterComponent';
import DetailsTransaction from './components/Transaction/DetailsTransaction';
import EditTransaction from './components/Transaction/EditTransaction';
import DeleteTransaction from './components/Transaction/DeleteTransaction';
import ErrorPage from './components/Error/ErrorPage';

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

                    <Route exact path='/Incomes/Create/:accountId' component={CreateTransaction} />
                    <Route exact path='/Incomes/Details/:id' component={DetailsTransaction} />
                    <Route exact path='/Incomes/Edit/:id' component={EditTransaction} />
                    <Route exact path='/Incomes/Delete/:id' component={DeleteTransaction} />

                    <Route exact path='/Expenses/Create/:accountId' component={CreateTransaction} />
                    <Route exact path='/Expenses/Details/:id' component={DetailsTransaction} />
                    <Route exact path='/Expenses/Edit/:id' component={EditTransaction} />
                    <Route exact path='/Expenses/Delete/:id' component={DeleteTransaction} />


                    <Route exact path='/Accounts' component={Account} />
                    <Route exact path='/Accounts/Create' component={CreateAccount} />
                    <Route exact path='/Accounts/Details/:accountId' component={DetailsAccount} />

                    <Route exact path='/Tags/Create' component={CraateFilterComponent} />
                    <Route exact path='/Categories/Create' component={CraateFilterComponent} />
                    <Route path='/' component={ErrorPage} />
                </Layout>
            </UserContext.Provider>
        );
    }
}
