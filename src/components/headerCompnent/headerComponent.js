import React from 'react';
import {Container, Nav, Navbar, NavbarBrand, NavItem} from "react-bootstrap";
import './headerComponent.css';
import logo from '../../images/4047776-middle.png'


class Header extends React.Component{
    render() {
        return (
            <Navbar collapseOnSelect fixed="top" className="custom-color" >
                <Container>
                    <NavbarBrand>
                        <img
                            src={logo}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt="App logo"
                        />
                        <div className="page-title">Ultra Super Pénzügyi Segítség Wealkalmazás</div>
                    </NavbarBrand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav"/>
                    <Nav>
                        <Nav.Link >Főoldal</Nav.Link>
                    </Nav>

                </Container>

            </Navbar>
        );
    }
}

export default Header;
