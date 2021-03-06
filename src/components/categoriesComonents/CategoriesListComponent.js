import React, {useState} from "react";
import {Button, Col, Container, FloatingLabel, Form, ListGroup, Pagination, Row} from "react-bootstrap";
import PaginationComponent from "../Pagination/Pagination";
import {useScroll} from "../Pagination/scroll";
import {postQueryCategory} from "../httpFunctions";
import CategoriesEitComponent from "./CategoriesEditComponent";
import CategoriesEditComponent from "./CategoriesEditComponent";

const rows = 5;

export default class CategoriesListComponent extends React.Component {

    constructor(props) {
        super(props);
        this.setCurrentPage = this.setCurrentPage.bind(this)
        this.setShowModel = this.setShowModel.bind(this)
        this.state = {
            name: "",
            type: "INCOME",
            currentPage: 1,
            maxResult: 0,
            dataList: [],
            waitForResponse: true,
            isEdited: false,
            showModel: false,
        }
    }

    componentDidMount() {
        postQueryCategory(this.state.name, this.state.type, this.state.currentPage, rows)
            .then(r => {
                console.log(r.data)
                this.setState({
                    maxResult: r.data.maxElements,
                    dataList: r.data.list,
                    waitForResponse: false,
                })
            })
    }

    setCurrentPage(page) {
        this.setState({currentPage: page})
        console.log(page)
        postQueryCategory(this.state.name, this.state.type, page, rows)
            .then(r => {
                console.log(r.data)
                this.setState({
                    maxResult: r.data.maxElements,
                    dataList: r.data.list,
                })
            })
    }

    handleSelectType = e => {
        console.log(e.target.value)
        this.setState({type: e.target.value})
    }

    handleFilter = e => {
        if (e) {
            e.preventDefault()
        }

        console.log("filtering")
        console.log(this.state.name)
        postQueryCategory(this.state.name, this.state.type, this.state.currentPage, rows)
            .then(r => {
                console.log(r.data)
                this.setState({
                    maxResult: r.data.maxElements,
                    dataList: r.data.list,
                    categoryId: 0
                })
            }).catch(e => {
            console.log(e)
        })
    }

    handleCategorySelect(e, id) {
        this.setState({categoryId: id})
        this.setState({showModel: true})
    }

    setShowModel = (answer) => {
        console.log(answer)
        this.setState({showModel: answer.hide, isEdited: answer.update})
        if (answer.update) {
            console.log("sholud reload")
            postQueryCategory(this.state.name, this.state.type, this.state.currentPage, rows)
                .then(r => {
                    console.log(r.data)
                    this.setState({
                        maxResult: r.data.maxElements,
                        dataList: r.data.list,
                        categoryId: 0
                    })
                }).catch(e => {
                console.log(e)
            })
        }
    }

    render() {

        if (this.state.waitForResponse) {
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
                Elnevez??s: {entity.categoryEntity.name}</ListGroup.Item>))

        return (
            <Container id={"container-outline"} className={"justify-content-center"}>
                <Row className={"justify-content-center"}>
                    <Col className={"text-center"}>
                        <h1 className={"mb-3"}>Kateg??ri??k list??ja:</h1>
                        <Row>
                            <Col>
                                <FloatingLabel className={"mb-3"} controlId="floatingName" label="Megnevez??s">
                                    <Form.Control type="text" placeholder="name"
                                                  onChange={e => this.setState({name: e.target.value})}
                                                  value={this.state.name}
                                    />
                                </FloatingLabel>
                            </Col>
                            <Col className={"m-auto"}>
                                <Form.Select className={"mb-3"} onChange={this.handleSelectType}>
                                    <option value="INCOME">Bev??tel</option>
                                    <option value="EXPENSE">Kiad??s</option>
                                </Form.Select>
                            </Col>
                            <Col md={"auto"} className={"mb-auto"}>
                                <Button variant="sailor_blue" size="xxl" onClick={this.handleFilter}>
                                    Sz??r??s
                                </Button>
                            </Col>
                            <hr/>
                            <Col>{categoryList}</Col>
                            {this.state.showModel ?
                                <CategoriesEditComponent
                                    show={this.state.showModel}
                                    onHide={this.setShowModel}
                                    categoryid={this.state.categoryId}
                                    userDetails={this.props.userDetails}/>
                                :
                                null}
                            <hr/>
                            <Col>
                                <Container className={"m-auto"}>
                                    <PaginationComponent
                                        itemsCount={this.state.maxResult}
                                        itemsPerPage={rows}
                                        currentPage={this.state.currentPage}
                                        setCurrentPage={this.setCurrentPage}
                                        alwaysShown={false}/>
                                </Container>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }
}