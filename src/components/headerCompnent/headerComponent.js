import React from 'react';
import {Container, Nav, Navbar, NavbarBrand, NavDropdown, NavItem} from "react-bootstrap";
import './headerComponent.css';
import logo from '../../images/4047776-middle.png'


class Header extends React.Component{
    render() {
        return (
            <div id="remove-padding">
                <Nav.Link className="skip-nav-link">Navigáció atugrása</Nav.Link>

                <Navbar collapseOnSelect expand="lg" bg="myColor" variant="dark" sticky="top" className="left-aligned">

                    <Navbar.Brand>
                        <img
                            alt=""
                            src={logo}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                        Pénzügyi segéd webalkalmazás
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Főoldal</Nav.Link>
                            <Nav.Link href="#pricing">Pénzügyek</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link href="/login">Bejelentkezés</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>

                </Navbar>

            </div>
        );
    }
}

export default Header;
