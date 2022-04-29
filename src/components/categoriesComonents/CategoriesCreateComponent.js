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
            scope: "USER"
        }
    }

    handleSelectType = (e) => {
        console.log(e.target.value)
        this.setState({type: e.target.value})
    }

    handleSelectScope = e => {
        this.setState({scope: e.target.value})
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
        postCreateCategory(this.state.name, this.state.type, this.state.scope === "GLOBAL" ? null : this.props.userDetails.username)
            .then(r => {
                console.log(r.data)
                this.showAlert("success", "Sikeres létrehozás", "A tranzakció sikeresen létre lett hozva!")
            }).catch(e => {
            console.log(e.response.data)
            this.showAlert("danger", "Hiba", e.response.data.errorType)
        })
    }

    render() {

        let select;
        let selectLabel;
        if (this.props.userDetails.role === "ROLE_ADMIN") {
            selectLabel = <Form.Label>Hatáskör</Form.Label>
            select =
            <Form.Select className={"mb-3"} onChange={this.handleSelectScope}>
                <option value="USER">Aktuális Felhasználó</option>
                <option value="GLOBAL">Mindenki</option>
            </Form.Select>
        }

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
                            <Form.Label>Típus</Form.Label>
                            <Form.Select className={"mb-3"} onChange={this.handleSelectType}>
                                <option value="INCOME">Bevétel</option>
                                <option value="EXPENSE">Kiadás</option>
                            </Form.Select>
                            {selectLabel}
                            {select}
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