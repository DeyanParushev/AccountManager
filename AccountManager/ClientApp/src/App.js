import * as React from 'react';
import { Route, Switch } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import ApplicationRoutes from './components/api-authorization/ApplicationRoutes';
import { AuthPrefix } from './components/api-authorization/ApiAuthorizationConstants';
import UserContext from './contexts/UserContext';
import './custom.css'
import CreateTransaction from './components/Transaction/CreateTransaction';
import Account from './components/Account/Account';
import CreateAccount from './components/Account/CreateAccount';
import DetailsAccount from './components/Account/DetailsAccount';
import EditAccount from './components/Account/EditAccount';
import DeleteAccount from './components/Account/DeleteAccount';
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
                if (JSON.stringify(inputUser) === '{}') {
                    this.setState({ user: inputUser, isLoggedIn: false });
                } else {
                    this.setState({ user: inputUser, isLoggedIn: true });
                }
            },
            isLoggedIn: this.state.isLoggedIn,
        }

        return (
            <UserContext.Provider value={value}>
                <Layout>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path={AuthPrefix} component={ApiAuthorizationRoutes} />

                        <Route exact path={ApplicationRoutes.Incomes.Create} component={CreateTransaction} />
                        <Route exact path={ApplicationRoutes.Incomes.Details} component={DetailsTransaction} />
                        <Route exact path={ApplicationRoutes.Incomes.Edit} component={EditTransaction} />
                        <Route exact path={ApplicationRoutes.Incomes.Delete} component={DeleteTransaction} />

                        <Route exact path={ApplicationRoutes.Expenses.Create} component={CreateTransaction} />
                        <Route exact path={ApplicationRoutes.Expenses.Details} component={DetailsTransaction} />
                        <Route exact path={ApplicationRoutes.Expenses.Edit} component={EditTransaction} />
                        <Route exact path={ApplicationRoutes.Expenses.Delete} component={DeleteTransaction} />

                        <Route exact path={ApplicationRoutes.Accounts.All} component={Account} />
                        <Route exact path={ApplicationRoutes.Accounts.Create()} component={CreateAccount} />
                        <Route exact path={ApplicationRoutes.Accounts.Details()} component={DetailsAccount} />
                        <Route exact path={ApplicationRoutes.Accounts.Edit()} component={EditAccount} />
                        <Route exact path={ApplicationRoutes.Accounts.Delete()} component={DeleteAccount} />

                        <Route exact path={ApplicationRoutes.Tags.Create} component={CraateFilterComponent} />

                        <Route exact path={ApplicationRoutes.Categories.Create} component={CraateFilterComponent} />
                        <Route path='*' component={ErrorPage} />
                    </Switch>
                </Layout>
            </UserContext.Provider>
        );
    }
}
