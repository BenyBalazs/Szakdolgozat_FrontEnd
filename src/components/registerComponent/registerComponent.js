import React from 'react';
import {Alert, Button, Col, Container, FloatingLabel, Form, Row} from "react-bootstrap";
import {RedirectLoginButton} from "../redirectLoginButton";

class RegisterComponent extends React.Component {

    constructor() {
        super();
        this.state = {
            username: "", email: "", password: "", rePassword: "", validated: false,
            showError: "d-none", errorMsg: "", verboseErrorMsg: "",
            rePasswordsValid: false, rePasswordErrorMsg: "",
        }
    }

    render() {
        return (

            <Container id="login-form-container" className="align-content-center" fluid="lg" onSubmit={this.handleRegister}>

                    <Form className="text-center" noValidate validated={this.state.validated}>
                        <h1 className="mb-5">Regisztráció</h1>

                        <Alert className={this.state.showError} variant="danger">
                            <Alert.Heading>{this.state.errorMsg}</Alert.Heading>
                            <p>{this.state.verboseErrorMsg}</p>
                        </Alert>

                        <FloatingLabel controlId="floatingInput" label="Felhasználónév" className="mb-3">
                            <Form.Control name="username" type='text' placeholder="Anonimusz" />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingEmail" label="E-mail" className="mb-3">
                            <Form.Control type="email" placeholder="Anonimusz" />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingPassword" label="Jelszó" className="mb-3">
                            <Form.Control type="password" placeholder="Password" />
                            <Form.Control.Feedback type="invalid">A jelszó mező nem lehet üres.</Form.Control.Feedback>
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingRePassword" label="Jelszó ismétlése" className="mb-3">
                            <Form.Control type="password" placeholder="Password"
                                          isInvalid={this.validatePassword()}/>
                            <Form.Control.Feedback
                                type="invalid">in</Form.Control.Feedback>
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

    validatePassword = e => {
        return false
    }

    handleRegister = e => {
        e.preventDefault()
        const form = e.currentTarget;
        this.setState({validated: true})

        if (form.checkValidity() === true) {

        }
    }
}

export default RegisterComponent;
