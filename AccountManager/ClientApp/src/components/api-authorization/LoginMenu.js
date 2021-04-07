import * as React from 'react';
import { NavItem, NavLink } from 'reactstrap';
import { ApplicationPaths } from './ApiAuthorizationConstants';
import { Link } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';

class LoginMenu extends React.Component {

    renderAuthView() {
        if (this.context.isLoggedIn) {
            return (
                <NavItem>
                    <NavLink tag={Link} to={ApplicationPaths.Logout}>Logout</NavLink>
                </NavItem>
            )
        } else {
            return (
                <React.Fragment>
                    <NavItem>
                        <NavLink tag={Link} to={ApplicationPaths.Register}>Register</NavLink>
                    </NavItem>

                    <NavItem>
                        <NavLink tag={Link} to={ApplicationPaths.Login}>Login</NavLink>
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
