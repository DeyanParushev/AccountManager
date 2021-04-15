import React, { Fragment } from 'react';
import UserContext from '../contexts/UserContext';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import LoginMenu from './api-authorization/LoginMenu';
import './NavMenu.css';

class NavMenu extends React.Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    renderLogout() {
        if (this.context.isLoggedIn) {
            return (
                <Fragment>
                    <NavItem>
                        <NavLink tag={Link} className="text-dark" to="/Categories/Create">Create Category</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} className="text-dark" to="/Tags/Create">Create Tag</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} className="text-dark" to="/Accounts">My Accounts</NavLink>
                    </NavItem>
                </Fragment>
            )
        }
    }

    render() {
        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
                    <Container>
                        <NavbarBrand tag={Link} to="/">AccountManager</NavbarBrand>
                        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                            <ul className="navbar-nav flex-grow">
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                                </NavItem>
                                {this.renderLogout()}
                                <LoginMenu>
                                </LoginMenu>
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }
}

NavMenu.contextType = UserContext;
export default NavMenu;
