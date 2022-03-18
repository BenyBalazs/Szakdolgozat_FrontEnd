import React from 'react';
import {Alert, Button, Col, Container, FloatingLabel, Form, Row} from "react-bootstrap";
import {loginFunction} from "./loginFunction";
import "../commonComponentCss.css"
import {RedirectLoginButton} from "../redirectLoginButton";
import {createAuthTokenCookie, getAuthToken} from "../fileHandler/cookieManager";

class LoginComponent extends React.Component {

    constructor() {
        super();
        this.state = {
            username: "", password: "", validated: false,
            showError: "d-none", errorMsg: "", verboseErrorMsg: ""
        }
    }

    render() {
        return (

            <Container id="login-form-container" className="align-content-center" fluid="lg">

                <Form className="text-center" noValidate validated={this.state.validated} onSubmit={this.handleLogin}>
                    <h1 className="mb-5">Bejelentkezés</h1>

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
                    <FloatingLabel controlId="floatingPassword" label="Jelszó" className="mb-3">
                        <Form.Control type="password" placeholder="Password"
                                      onChange={e => this.setState({password: e.target.value})}
                                      value={this.state.password} required/>
                        <Form.Control.Feedback type="invalid">A jelszó mező nem maradhat üres.</Form.Control.Feedback>
                    </FloatingLabel>

                    <Button variant="sailor_blue" size="xxl" className="mb-3" type="submit">
                        Bejelentkezés
                    </Button>

                    <Container>
                        <Row className="align-items-center">
                            <Col className="text-start">
                                Még nem regisztrált?
                            </Col>
                            <Col className="text-end">
                                <RedirectLoginButton buttonName={"Regisztrálok!"} path={"/register"}/>
                            </Col>
                        </Row>
                    </Container>
                </Form>
            </Container>
        )
    }

    handleLogin = e => {
        e.preventDefault()
        this.setState({validated: true})
        const form = e.currentTarget;

        if (form.checkValidity() === true) {
            console.log(this.state.username);
            console.log(this.state.password);
            this.setState({show: true})
            loginFunction(this.state.username, this.state.password)
                .then(res => {
                    createAuthTokenCookie(res.data.token)
                    getAuthToken();
                })
                .catch(err => {

                    if (err.response.status === 400 || err.response.status === 401) {
                        console.log(err.response.status)
                        this.setState(
                            {
                                showError: "d-visible",
                                errorMsg: "Hibás bejelentkezési adatok!",
                                verboseErrorMsg: "Úgy tűnik, hogy hibás adatokat adott meg kérjük ellenőrizze belépési adatait és próbálja újra."
                            })
                    } else {
                        console.log(err.response.status)
                        this.setState(
                            {
                                showError: "d-visible",
                                errorMsg: "Valami nincs rendben.",
                                verboseErrorMsg: "Úgy tűnik, hogy valami váratlan hiba történt."
                            })
                    }
                });

        }
    }

}

export default LoginComponent;
