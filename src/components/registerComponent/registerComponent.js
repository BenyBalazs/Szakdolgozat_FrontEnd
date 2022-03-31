import React, {useState} from 'react';

import "./registerComponent.css"
import {RedirectLoginButton} from "../redirectLoginButton";
import {Alert, Button, Col, Container, FloatingLabel, Form, Row} from "react-bootstrap";
import {registerFunction} from "./registerFunction";

export function RegisterComponent() {

    const [validated, setValidated] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [showError, setShowError] = useState("d-none");
    const [errorMsg, setErrorMsg] = useState("");
    const [showSuccess, setShowSuccess] = useState("d-none");
    const [successMsg, setSuccessMsg] = useState("");
    const [verboseSuccessMsg, setVerboseSuccessMsg] = useState("")
    const [verboseErrorMsg, setVerboseErrorMsg] = useState("");
    const [rePasswordsValid, setRePasswordsValid] = useState(false);
    const [rePasswordInvalid, setRePasswordInvalid] = useState(false);
    const [rePasswordErrorMsg, setRePasswordErrorMsg] = useState("");

    const validPassword = (password1, password2) => {
        return password1 === password2;
    }

    const handleRegister = e => {
        e.preventDefault()
        const form = e.currentTarget;
        if (rePassword === "") {

        }

        if (!validPassword(password, rePassword)) {
            setRePasswordErrorMsg("A jelszavak nem egyeznek!")
            setRePasswordsValid(false)
            setRePasswordInvalid(true)
        } else {
            setRePasswordsValid(true)
            setRePasswordInvalid(false)
        }

        if (form.checkValidity() === true) {
            e.preventDefault();
            registerFunction(username, email, password)
                .then(res => {
                    setSuccessMsg("Sikeres regisztráció.")
                    setVerboseSuccessMsg("Köszönjük a regisztrációt élvezze a weboldal funkcióit.")
                    setShowSuccess("d-visible")
                    setShowError("d-none")
                })
                .catch(err => {
                    console.log(err.response)
                    if (err.response.status === 400) {
                        console.log("syyyyyyyy")
                        console.log(err.response.data.errorType === "USERNAME_TAKEN")
                        if (err.response.data.errorType === "USERNAME_TAKEN") {
                            setErrorMsg("Sikertelen regisztráció!")
                            setShowSuccess("d-none")
                            setShowError("d-visible")
                            setVerboseErrorMsg("A felhasználónév már sajnos foglalt kérjük válassz másikat!")
                        } else if (err.response.data.errorType === "EMAIL_ALREADY_IN_USE") {
                            setErrorMsg("Sikertelen regisztráció!")
                            setShowSuccess("d-none")
                            setShowError("d-visible")
                            setVerboseErrorMsg("Az email cím már sajnos foglalt kérjük válassz másikat!")
                        }
                    }
                })
        } else {
            console.log("asd")
        }
        setValidated(true);
    }

    return (

        <Container id="login-form-container" className="align-content-center" fluid="lg">

            <Form noValidate className="text-center" validated={validated}
                  onSubmit={handleRegister}>
                <h1 className="mb-5">Regisztráció</h1>

                <Alert className={showSuccess} variant="success">
                    <Alert.Heading>{successMsg}</Alert.Heading>
                    <p>{verboseSuccessMsg}</p>
                </Alert>

                <Alert className={showError} variant="danger">
                    <Alert.Heading>{errorMsg}</Alert.Heading>
                    <p>{verboseErrorMsg}</p>
                </Alert>

                <FloatingLabel controlId="floatin gInput" label="Felhasználónév" className="mb-3">
                    <Form.Control type="text" placeholder="Anonimusz"
                                  onChange={e => setUsername(e.target.value)}
                                  value={username}
                                  required/>
                    <Form.Control.Feedback type="invalid">A felhasználónév mező nem maradhat
                        üres.</Form.Control.Feedback>
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Email" className="mb-3">
                    <Form.Control type="email" placeholder="Email"
                                  onChange={e => setEmail(e.target.value)}
                                  value={email}
                                  required/>
                    <Form.Control.Feedback type="invalid">Az e-mail mező nem maradhat
                        üres.</Form.Control.Feedback>
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Jelszó" className="mb-3">
                    <Form.Control type="password" placeholder="Password"
                                  onChange={e => setPassword(e.target.value)}
                                  value={password}
                                  required/>
                    <Form.Control.Feedback type="invalid">A jelszó mező nem maradhat
                        üres.</Form.Control.Feedback>
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
