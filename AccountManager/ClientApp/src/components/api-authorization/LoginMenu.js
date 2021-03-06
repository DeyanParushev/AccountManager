import * as React from 'react';
import { NavItem, NavLink } from 'reactstrap';
import { ApiRoutes } from './ApiAuthorizationConstants';
import { Link } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';

class LoginMenu extends React.Component {

    renderAuthView() {
        if (this.context.isLoggedIn) {
            return (
                <NavItem>
                    <NavLink tag={Link} to={ApiRoutes.Logout}>Logout</NavLink>
                </NavItem>
            )
        } else {
            return (
                <React.Fragment>
                    <NavItem>
                        <NavLink tag={Link} to={ApiRoutes.Register}>Register</NavLink>
                    </NavItem>

                    <NavItem>
                        <NavLink tag={Link} to={ApiRoutes.Login}>Login</NavLink>
                    </NavItem>
                </React.Fragment>
            )
        }
    }

    render() {
        return (
            <React.Fragment>
                {this.renderAuthView()}
            </React.Fragment>
        )
    }
}

LoginMenu.contextType = UserContext;

export default LoginMenu;
