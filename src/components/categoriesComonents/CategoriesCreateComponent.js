import React from "react";
import {Alert, Button, Col, Container, FloatingLabel, Form, Row} from "react-bootstrap";
import {postCreateCategory} from "../httpFunctions";

export default class CategoriesCreateComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            validated: false,
            showAlert: "d-none",
            alertType: "danger",
            alertMsg: "",
            alertVerboseMsg: "",
            type: "INCOME",
            name: "",
        }
    }

    handleSelectType = (e) => {
        console.log(e.target.value)
        this.setState({type: e.target.value})
    }

    showAlert(type, msg, verboseMsg) {
        this.setState({
            showAlert: "d-visible",
            alertType: type,
            alertMsg: msg,
            alertVerboseMsg: verboseMsg,
            open: true
        })
    }

    hideAlert() {
        this.setState({showAlert: "d-none", open: false})
    }

    handleSubmit = e => {
        e.preventDefault()
        this.setState({validated: true})
        postCreateCategory(this.state.name, this.state.type)
            .then(r => {
                console.log(r.data)
                this.showAlert("success", "Sikeres létrehozás", "A tranzakció sikeresen létre lett hozva!")
            }).catch(e => {
            console.log(e.response.data)
            this.showAlert("danger", "Hiba", e.response.data.errorType)
        })
    }

    render() {
        return (
            <Container className={"text-center"}>
                <Row className="justify-content-md-center">
                    <Col id={"container-outline"} className={"text-center"}>
                        <Form className="text-center" noValidate validated={this.state.validated}
                              onSubmit={this.handleSubmit}>
                            <h1 className="mb-5">Kategória létrehozása</h1>

                            <Alert className={this.state.showAlert} variant={this.state.alertType}>
                                <Alert.Heading>{this.state.alertMsg}</Alert.Heading>
                                <p>{this.state.alertVerboseMsg}</p>
                            </Alert>

                            <FloatingLabel controlId="floatingName" label="Megnevezés" className="mb-3">
                                <Form.Control type="text" placeholder="name"
                                              onChange={e => this.setState({name: e.target.value})}
                                              value={this.state.name}
                                              required/>
                                <Form.Control.Feedback type="invalid">A név mező nem maradhat
                                    üres.</Form.Control.Feedback>
                            </FloatingLabel>
                            <Form.Select className={"mb-3"} onChange={this.handleSelectType}>
                                <option value="INCOME">Bevétel</option>
                                <option value="EXPENSE">Kiadás</option>
                            </Form.Select>

                            <Button variant="sailor_blue" size="xxl" className="mb-3" type="submit">
                                Hozzáadás
                            </Button>

                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}