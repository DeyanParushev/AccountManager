import * as React from 'react';
import { NavItem, NavLink } from 'reactstrap';
import { ApplicationPaths } from './ApiAuthorizationConstants';
import { Link } from 'react-router-dom';

export default class LoginMenu extends React.Component {
 
    render() {
        return (
            <React.Fragment>
                <NavItem>
                    <NavLink tag={Link} to={ApplicationPaths.Register}>Register</NavLink>
                </NavItem>

                <NavItem>
                    <NavLink tag={Link} to={ApplicationPaths.Login}>Login</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} to={ApplicationPaths.Logout}>Logout</NavLink>
                </NavItem>
            </React.Fragment>
        )
    }
}
