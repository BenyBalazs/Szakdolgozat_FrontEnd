import React from "react";
import {Button, Col, Container, FloatingLabel, Form, ListGroup, Row} from "react-bootstrap";
import Datetime from "react-datetime";
import PaginationComponent from "../Pagination/Pagination";
import {postGetBalance, postQueryCategory, postTransactionQuery} from "../httpFunctions";

const rows = 5;

export default class ListFinancesComponent extends React.Component {

    constructor(props) {
        super(props);
        this.setCurrentPage = this.setCurrentPage.bind(this);
        this.state = {
            name: "",
            dateFrom: findWeekBeforeToday(),
            type: "BOTH",
            dateTo: Date.now(),
            maxResult: 0,
            dataList: [],
            waitForData: true,
            currentPage: 1,
            balance: 0,
        }
    }

    getBalance = () => {
        postGetBalance(this.props.userDetails.username, this.state.dateFrom, this.state.dateTo)
            .then(r => {
                this.setState({balance:r.data.balance})
            }).catch(e => {
            console.log(e.response)
        })
    }

    initQuery = (page) => {
        console.log("query")
        this.setState({dataList: []})
        let actualPage = this.state.page
        if (page) {
            actualPage = page
        }
        postTransactionQuery(this.props.userDetails.username, this.state.name, this.state.dateFrom, this.state.dateTo, this.state.type, 0, actualPage, rows)
            .then(e => {
                console.log(e.data.list)
                this.setState({
                    maxResult: e.data.maxElements,
                    dataList: e.data.list,
                    waitForData: false
                })
            }).catch(e => {
            console.log(e.response.data)
        })
        console.log("dataList " + this.state.dataList)
    }

    componentDidMount() {
        this.initQuery()
        this.getBalance()
    }

    handleFilter = () => {
        console.log("filtering")
        this.initQuery()
        this.getBalance()
    }

    setCurrentPage(page) {
        this.setState({currentPage: page})
        console.log(page)
        this.initQuery(page)
    }

    handleFinanceSelect = (e, id) => {
        e.preventDefault()
        console.log(id)
        console.log(this.props.navigate)
        this.props.navigate('/finances-edit/' + id)
    }

    render() {
        if (this.state.waitForData) {
            return null;
        }
        let transactionList

        if (this.state.dataList !== []) {
            transactionList = this.state.dataList.map((entity) => (
                <ListGroup.Item
                    variant={"light"}
                    id={entity.transactionEntity.id}
                    key={entity.transactionEntity.id}
                    itemID={entity.transactionEntity.id}
                    action
                    as={"button"}
                    onClick={e => this.handleFinanceSelect(e, entity.transactionEntity.id)}>
                    Elnevezés: {entity.transactionEntity.name} | Összeg: {entity.transactionEntity.amount} |
                    Kategória: {entity.transactionEntity.categoryName ? entity.transactionEntity.categoryName : "Nincs"} |
                    Kifizetve: {entity.transactionEntity.dateOfPayment}</ListGroup.Item>))
        }

        return (
            <Container id={"container-outline"} className={"justify-content-center"}>
                <Row className={"justify-content-center"}>
                    <Col className={"text-center"}>
                        <h1 className={"mb-3"}>Tranzakciók listája:</h1>
                        <Row>
                            <Col>
                                <Form.Label htmlFor={"inputDate"}>Megnevezés:</Form.Label>
                                <Form.Control type="text" placeholder="megnevezes"
                                              onChange={e => this.setState({name: e.target.value})}
                                              value={this.state.name}
                                />
                            </Col>
                        </Row>
                        <Row className={"mt-3"}>
                            <Col className={"m-auto"}>
                                <Form.Label htmlFor={"inputDate"}>Kezdő dátum:</Form.Label>
                                <Datetime className="mb-3" onChange={e => this.setState({dateFrom: e})}
                                          value={this.state.dateFrom}>
                                </Datetime>
                            </Col>
                            <Col className={"m-auto"}>
                                <Form.Label htmlFor={"inputDate"}>Vége dátum:</Form.Label>
                                <Datetime className="mb-3" onChange={e => this.setState({dateTo: e})}
                                          value={this.state.dateTo}>
                                </Datetime>
                            </Col>
                            <Col>
                                <Form.Label htmlFor={"inputDate"}>Típus:</Form.Label>
                                <Form.Select className={"m-auto"} onChange={e => this.setState({type: e.target.value})}
                                             value={this.state.type}>
                                    <option value="INCOME">Bevétel</option>
                                    <option value="EXPENSE">Kiadás</option>
                                    <option value="BOTH">Mindkettő</option>
                                </Form.Select>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button variant="sailor_blue" size="xxl" onClick={this.handleFilter}>
                                    Szűrés
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div>Az ön egyenlege: {this.state.balance}</div>
                            </Col>
                        </Row>
                        <hr/>
                        <Row>
                            <Col>
                                <ListGroup>
                                    {transactionList}
                                </ListGroup>
                            </Col>
                        </Row>
                        <hr/>
                        <Row>
                            <Col>
                                <PaginationComponent
                                    itemsCount={this.state.maxResult}
                                    itemsPerPage={rows}
                                    currentPage={this.state.currentPage}
                                    setCurrentPage={this.setCurrentPage}
                                    alwaysShown={false}/>
                            </Col>
                        </Row>
                    </Col>

                </Row>
            </Container>
        );
    }
}

const findWeekBeforeToday = () => {
    let today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
}