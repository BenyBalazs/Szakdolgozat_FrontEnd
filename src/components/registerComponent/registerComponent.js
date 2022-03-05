import React from 'react';
import {Button, Col, Container, FloatingLabel, Form, Row} from "react-bootstrap";
import {RedirectLoginButton} from "../redirectLoginButton";


class RegisterComponent extends React.Component {

    render() {
        return (

            <Container id="login-form-container" className="align-content-center" fluid="lg">
                <Form className="text-center">
                    <h1 className="mb-5">Regisztráció</h1>

                    <FloatingLabel controlId="floatingInput" label="Felhasználónév" className="mb-3">
                        <Form.Control type='text' placeholder="Anonimusz" />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingInput" label="E-mail" className="mb-3">
                        <Form.Control type="email" placeholder="Anonimusz" />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingPassword" label="Jelszó" className="mb-3">
                        <Form.Control type="password" placeholder="Password" />
                    </FloatingLabel>

                    <Button variant="sailor_blue" size="xxl" type="submit" className="mb-3">
                        Regisztráció
                    </Button>

                    <Container>
                        <Row className="align-items-center">
                            <Col className="text-start">
                                Már van fiókod?
                            </Col>
                            <Col className="text-end">
                                <RedirectLoginButton buttonName={"Bejelentkezek!"} path={"/login"}/>
                            </Col>
                        </Row>
                    </Container>
                </Form>
            </Container>
        )
    }
}

export default RegisterComponent;
