import React from 'react';
import {Container, Nav, Navbar, NavbarBrand, NavDropdown, NavItem} from "react-bootstrap";
import './headerComponent.css';
import logo from '../../images/4047776-middle.png'


class Header extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        let login;
        console.log(this.props.userDetails)
        if (this.props.userDetails) {
            login =
                <Nav>
                    <Nav.Link href="/details">Profil</Nav.Link>
                </Nav>
        } else {
            login =
                <Nav>
                    <Nav.Link href="/login">Bejelentkezés</Nav.Link>
                </Nav>
        }
        let finances;
        if (this.props.userDetails) {
            finances =
                <Nav>
                    <Nav.Link href="/finances">Pénzügyek</Nav.Link>
                </Nav>
        } else {
            finances =
                <Nav>
                    <Nav.Link href="/login">Pénzügyek</Nav.Link>
                </Nav>
        }

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
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Főoldal</Nav.Link>
                            {finances}
                        </Nav>
                        {login}
                    </Navbar.Collapse>

                </Navbar>

            </div>
        );
    }
}

export default Header;
