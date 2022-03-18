import React from 'react';
import {Alert, Button, Col, Container, FloatingLabel, Row} from "react-bootstrap";
import { Form, ValidatedInput } from 'react-bootstrap-validation';
import "./registerComponent.css"
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

                <Form className="text-center" noValidate validated={this.state.validated} onSubmit={this.handleRegister}>
                    <h1 className="mb-5">Regisztráció</h1>

                    <Alert className={this.state.showError} variant="danger">
                        <Alert.Heading>{this.state.errorMsg}</Alert.Heading>
                        <p>{this.state.verboseErrorMsg}</p>
                    </Alert>

                    <FloatingLabel controlId="floatingInput" label="Felhasználónév" className="mb-3">
                        <Form.Control type="text" placeholder="Anonimusz" required
                                      onChange={e => this.setState({username: e.target.value})}
                                      value={this.state.username}/>
                        <Form.Control.Feedback type="invalid">A felhasználónév mező nem maradhat üres.</Form.Control.Feedback>
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingPassword" label="Email" className="mb-3">
                        <Form.Control type="email" placeholder="Email"
                                      onChange={e => this.setState({password: e.target.value})}
                                      value={this.state.password} required/>
                        <Form.Control.Feedback type="invalid">Az e-mail mező nem maradhat üres.</Form.Control.Feedback>
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingPassword" label="Jelszó" className="mb-3">
                        <Form.Control type="password" placeholder="Password"
                                      onChange={e => this.setState({password: e.target.value})}
                                      value={this.state.password} required/>
                        <Form.Control.Feedback type="invalid">A jelszó mező nem maradhat üres.</Form.Control.Feedback>
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingRePassword" label="Jelszó újra" className="mb-3">
                        <Form.Control type="password" placeholder="Password"
                                      onChange={e => this.setState({rePassword: e.target.value})}
                                      value={this.state.rePassword} isInvalid={this.state.rePasswordsValid} required/>
                        <Form.Control.Feedback type="invalid">{this.state.rePasswordErrorMsg}</Form.Control.Feedback>
                    </FloatingLabel>

                    <Button variant="sailor_blue" size="xxl" className="mb-3" type="submit">
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

    validPassword = (password1, password2) => {
        return password1 === password2;
    }

    handleRegister = e => {
        e.preventDefault()
        const form = e.currentTarget;
        if (!this.validPassword(this.state.password, this.state.rePassword)) {
            this.setState({rePasswordErrorMsg: "A jelszavak nem egyeznek!" })
        } else {
            this.setState({rePasswordsValid: true})
        }
        if (form.checkValidity() === false) {
            e.preventDefault();
            //e.stopPropagation();
        } else {
            console.log("asd")
        }
        this.setState({validated: true});
    }
}

export default RegisterComponent;
