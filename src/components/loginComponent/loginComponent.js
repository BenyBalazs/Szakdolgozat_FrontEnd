import React from 'react';
import {Alert, Button, Col, Container, FloatingLabel, Form, Row} from "react-bootstrap";
import './loginComponent.css'
import '../formStyle.css'
import {loginFunction} from "./loginFunction";
import {RedirectLoginButton} from "../redirectLoginButton";
import {createAuthTokenCookie, getAuthToken} from "../fileHandler/cookieManager";

class LoginComponent extends React.Component {

    constructor() {
        super();
        this.state = {
            username: "", password: "", show: false,
            showError: "d-none" ,errorMsg : "", verboseErrorMsg: ""
        }
    }

    render() {
        return (

            <Container id="login-form-container" className="align-content-center" fluid="lg">
                <Form className="text-center">
                    <h1 className="mb-5">Bejelentkezés</h1>

                    <Alert className={this.state.showError} variant="danger">
                        <Alert.Heading>{this.state.errorMsg}</Alert.Heading>
                        <p>
                            {this.state.verboseErrorMsg}
                        </p>
                    </Alert>

                    <FloatingLabel controlId="floatingInput" label="Felhasználónév" className="mb-3">
                        <Form.Control type="text" placeholder="Anonimusz"
                                      onChange={e => this.setState({username: e.target.value})}
                                      value={this.state.username}/>
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingPassword" label="Jelszó" className="mb-3">
                        <Form.Control type="password" placeholder="Password"
                                      onChange={e => this.setState({password: e.target.value})}
                                      value={this.state.password}/>
                    </FloatingLabel>

                    <Button variant="sailor_blue" size="xxl" className="mb-3"
                            onClick={this.handleLogin}>
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
        console.log(this.state.username);
        console.log(this.state.password);
        loginFunction(this.state.username, this.state.password)
            .then(res => {
                createAuthTokenCookie(res.data)
                getAuthToken();
            })
            .catch(err => {

            if (err.response.status === 400) {
                console.log(err.response.status)
                this.setState(
                    {
                        showError: "d-visible",
                        errorMsg: "Hibás bejelentkezési adatok!",
                        verboseErrorMsg: "Úgy tűnik, hogy hibás adatokat adott meg kérjük ellenőrizze belépési adatait és próbálja újra."
                    })
            }
            else {
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

export default LoginComponent;
