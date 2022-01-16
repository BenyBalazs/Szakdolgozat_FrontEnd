import React from 'react';
import {Button, Col, Container, FloatingLabel, Form, Row} from "react-bootstrap";
import './loginComponent.css'

class LoginComponent extends React.Component {
    render() {
       return (

               <Container id="custom-width" className="align-content-center" fluid="lg">
                   <Form className="text-center">
                       <h1 className="mb-5">Bejelentkezés</h1>

                       <FloatingLabel controlId="floatingInput" label="Felhasználónév" className="mb-3">
                           <Form.Control type="email" placeholder="Anonimusz" />
                       </FloatingLabel>
                       <FloatingLabel controlId="floatingPassword" label="Jelszó" className="mb-3">
                           <Form.Control type="password" placeholder="Password" />
                       </FloatingLabel>

                       <Button variant="sailor_blue" size="xxl" type="submit" className="mb-3">
                           Bejelentkezés
                       </Button>

                       <Container>
                       <Row className="align-items-center">
                           <Col className="text-start">
                                Még nem regisztrált?
                           </Col>
                           <Col className="text-end">
                               <Button variant="outline_sailor_blue" type="submit" >
                                   Regisztrálok!
                               </Button>
                           </Col>
                       </Row>
                       </Container>
                   </Form>
               </Container>
        )
    }
}

export default LoginComponent;
