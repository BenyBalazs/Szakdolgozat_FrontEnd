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

            <Container id="login-form-container" className="align-content-center" fluid="lg">

                    <Form className="text-center" validated={this.state.validated} onSubmit={this.handleRegister}>
                        <h1 className="mb-5">Regisztráció</h1>

                        <Alert className={this.state.showError} variant="danger">
                            <Alert.Heading>{this.state.errorMsg}</Alert.Heading>
                            <p>{this.state.verboseErrorMsg}</p>
                        </Alert>

                        <FloatingLabel controlId="floatingInput" label="Felhasználónév" className="mb-3">
                            <Form.Control name="username" type='text' placeholder="Anonimusz" required/>
                        </FloatingLabel>
                        <Form.Control.Feedback type="invalid">A jelszó mező nem lehet üres.</Form.Control.Feedback>
                        <FloatingLabel controlId="floatingEmail" label="E-mail" className="mb-3">
                            <Form.Control type="email" placeholder="Anonimusz" required/>
                        </FloatingLabel>
                        <Form.Control.Feedback type="invalid">Az email mező nem lehet üres.</Form.Control.Feedback>
                        <FloatingLabel controlId="floatingPassword" label="Jelszó" className="mb-3">
                            <Form.Control type="password" placeholder="Password" />
                            <Form.Control.Feedback type="invalid">A jelszó mező nem lehet üres.</Form.Control.Feedback>
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingRePassword" label="Jelszó ismétlése" className="mb-3">
                            <Form.Control type="password" placeholder="Password"
                                          />
                            <Form.Control.Feedback
                                type="invalid">lofasz</Form.Control.Feedback>
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
        if (form.checkValidity() === false) {
            e.preventDefault();
            //e.stopPropagation();
        }else{
            console.log("asd")
        }
        this.setState({validated:true});
    }
}

export default RegisterComponent;
