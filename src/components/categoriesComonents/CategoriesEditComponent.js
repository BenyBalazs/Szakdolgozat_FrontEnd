import React from "react";
import {Alert, Button, Col, Container, FloatingLabel, Form, Modal, Row} from "react-bootstrap";
import {deleteCategory, getCategoryById, putEditCategory} from "../httpFunctions";

export default class CategoriesEditComponent extends React.Component {

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
            id: 0,
            isEdited: false
        }
    }

    componentDidMount() {
        console.log("geting category")
        console.log(this.props)
        getCategoryById(this.props.categoryid).then(r => {
            console.log(r)
            this.setState({
                id: r.data.categoryDetails.id,
                type: r.data.categoryDetails.type,
                name: r.data.categoryDetails.name,
            })
            console.log("r.data")
        }).catch(e => {
            console.log(e)
        })
    }

    handleClose = () => {
        let answer = {hide: false, update: this.state.isEdited}
        console.log(answer)
        this.props.onHide(answer)
    }

    handleSelectType = (e) => {
        console.log(e.target.value)
        this.setState({type: e.target.value})
    }

    handleDelete = () => {
        deleteCategory(this.state.id).then(
            e => {
                console.log(e.data)
                let answer = {hide: false, update: true}
                this.props.onHide(answer)
            }
        ).catch(e => {
            console.log(e.response.data)
        })

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
        putEditCategory(this.state.id ,this.state.name, this.state.type)
            .then(r => {
                console.log(r.data)
                this.setState({isEdited: true})
                this.showAlert("success", "Sikeres szerkesztés", "A kategória sikeresen szerkesztve lett !")
            }).catch(e => {
            console.log(e.response.data)
            this.showAlert("danger", "Hiba", e.response.data.errorType)
        })
    }

    render() {
        if (!this.props) {
            return <div/>
        }
        return (

            <Modal {...this.props}
                   size="lg"
                   aria-labelledby="contained-modal-title-vcenter"
                   scrollable={true}
                   centered>
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Szerkesztés
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container className={"text-center"}>
                        <Row className="justify-content-md-center">
                            <Col id={"container-outline"} className={"text-center"}>
                                <Form className="text-center" noValidate validated={this.state.validated}
                                      onSubmit={this.handleSubmit}>
                                    <h1 className="mb-5">Kategória Szerkesztése</h1>

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
                                    <Form.Select className={"mb-3"} onChange={this.handleSelectType} value={this.state.type}>
                                        <option value="INCOME">Bevétel</option>
                                        <option value="EXPENSE">Kiadás</option>
                                    </Form.Select>

                                    <Button variant="sailor_blue" size="xxl" className="mb-3" type="submit">
                                        Szerkesztés
                                    </Button>

                                </Form>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={this.handleDelete}>Törlés</Button>
                    <Button variant={"sailor_blue"} onClick={this.handleClose}>Bezárás</Button>
                </Modal.Footer>
            </Modal>
        )
    }

}