import React from "react";
import {Alert, Button, Col, Collapse, Container, FloatingLabel, Form, ListGroup, Row} from "react-bootstrap";
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import {getCategories, postCreateTransaction, postQueryCategory} from "../httpFunctions";
import PaginationComponent from "../Pagination/Pagination";

const rows = 5

export default class CreateFinancesComponent extends React.Component {

    constructor(props) {
        super(props);
        this.setCurrentPage = this.setCurrentPage.bind(this);
        this.state = {
            validated: false,
            open: false,
            type: "INCOME",
            date: Date.now(),
            dataList: [],
            categoryId: null,
            name: "",
            amount: 0,
            showAlert: "d-none",
            alertType: "danger",
            alertMsg: "",
            alertVerboseMsg: "",
            currentPage: 1,
            maxElements: 0,
        };
    }

    componentDidMount() {
        this.getCategoryData(this.state.type)
    }

    handleSubmit = (e) => {
        e.preventDefault()
        console.log("submit")
        this.setState({validated: true})

        if (e.target.checkValidity() === true) {
            console.log("form is valid")
            if (this.state.categoryId === null) {
                console.log("null category")
                this.showAlert("danger", "Nincs Kiválasztott kategória!", "Kérlek válasz ki egy kategóriát a továblépéshez!")
            } else {
                console.log("sending post")
                postCreateTransaction(this.state.name, this.state.amount, this.state.date, this.state.type, this.state.categoryId, this.props.userDetails.username)
                    .then(r => {
                            console.log("success");
                            this.showAlert("success", "Tranzakció sikeresen létrehozva!", "A tranzakció létrehozása sikeresen megtörént a Pénzügyek/Pénzügyek listázása oldalon megtekintheti.")
                            console.log(r.data)
                        }
                    ).catch(e => {
                    console.log("fail");
                    this.showAlert("danger", "Hiba!", e.response.data.errorType)
                })
            }
        }
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

    handleSelectType = (e) => {
        console.log(e.target.value)
        this.setState({type: e.target.value})
        this.setState({dateList: []})
        this.setState({categoryId: null})
        postQueryCategory(null, e.target.value, this.state.currentPage, rows)
            .then(r => {
                console.log(r.data)
                this.setState({
                    maxElements: r.data.maxElements,
                    dataList: r.data.list
                })
            }).catch(e => {
            console.log(e.response.data)
        })
    }

    setCurrentPage(page) {
        this.setState({currentPage: page})
        this.setState({dateList: []})
        this.setState({categoryId: null})
        postQueryCategory(null, this.state.type, page, rows)
            .then(r => {
                console.log(r.data)
                this.setState({
                    maxElements: r.data.maxElements,
                    dataList: r.data.list
                })
            }).catch(e => {
            console.log(e.response.data)
        })
    }

    handleCategorySelect = (e, id) => {
        e.preventDefault()
        console.log(id)
        this.setState({categoryId: id})
        this.hideAlert()
    }

    getCategoryData = (type) => {
        postQueryCategory(null, type, this.state.currentPage, rows)
            .then(r => {
                console.log(r.data)
                this.setState({
                    maxElements: r.data.maxElements,
                    dataList: r.data.list
                })
            }).catch(e => {
            console.log(e.response.data)
        })

    }

    render() {

        if (this.state.dataList === []) {
            return <div/>
        }
        let categoryList = this.state.dataList.map((entity) => (
            <ListGroup.Item
                variant={"light"}
                id={entity.categoryEntity.id}
                key={entity.categoryEntity.id}
                itemID={entity.categoryEntity.id}
                action
                as={"button"}
                onClick={e => this.handleCategorySelect(e, entity.categoryEntity.id)}
                href={"#" + entity.categoryEntity.id}>
                {entity.categoryEntity.name}</ListGroup.Item>))
        return (
            <Container className={"text-center"}>
                <Row className="justify-content-md-center mb-3">
                    <Col id={"container-outline"} className={"text-center"}>
                        <Form id={"detailsForm"} className="text-center" noValidate validated={this.state.validated}
                              onSubmit={this.handleSubmit}>
                            <h1 className="mb-5">Bevétel/kiadás létrehozása</h1>

                            <Form.Select className={"mb-3"} onChange={this.handleSelectType}>
                                <option value="INCOME">Bevétel</option>
                                <option value="EXPENSE">Kiadás</option>
                            </Form.Select>

                            <FloatingLabel controlId="floatingName" label="Megnevezés" className="mb-3">
                                <Form.Control type="text" placeholder="name"
                                              onChange={e => this.setState({name: e.target.value})}
                                              value={this.state.name}
                                              required/>
                                <Form.Control.Feedback type="invalid">Az elnevezés mező nem lehet
                                    üres.</Form.Control.Feedback>
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingAmount" label="Összeg" className="mb-3">
                                <Form.Control type="number" step=".01" placeholder="0"
                                              onChange={e => this.setState({amount: e.target.value})}
                                              value={this.state.amount}
                                              required/>
                                <Form.Control.Feedback type="invalid">Az összeg mező nem maradhat
                                    üres.</Form.Control.Feedback>
                            </FloatingLabel>
                            <Datetime className="mb-3" onChange={e => this.setState({date: e})}
                                      value={this.state.date}>
                            </Datetime>
                        </Form>
                    </Col>

                    <Col id={"container-outline"} md={{span: 4, offset: 1}} className={"text-center"}>
                        <Row>
                            <h1 className={"mb-3"}>Kategóriák</h1>
                            <Col>
                                <ListGroup>
                                    {categoryList}
                                </ListGroup>
                            </Col>
                            <hr/>
                            <Col>
                                <PaginationComponent
                                    itemsCount={this.state.maxElements}
                                    itemsPerPage={rows}
                                    currentPage={this.state.currentPage}
                                    setCurrentPage={this.setCurrentPage}
                                    alwaysShown={false}/>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Collapse in={this.state.open}>
                    <Row id={"container-outline"}>
                        <Alert className={this.state.showAlert} variant={this.state.alertType}>
                            <Alert.Heading>{this.state.alertMsg}</Alert.Heading>
                            <p>{this.state.alertVerboseMsg}</p>
                        </Alert>
                    </Row>
                </Collapse>
                <Row className={"mt-3"}>
                    <Col id={"container-outline"}>
                        <Button variant="sailor_blue" size="xxl" type={"submit"} form={"detailsForm"}>
                            Létrehozás
                        </Button>
                    </Col>
                </Row>

            </Container>
        )
    }
}