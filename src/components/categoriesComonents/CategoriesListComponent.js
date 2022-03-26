import React, {useState} from "react";
import {Button, Col, Container, FloatingLabel, Form, Pagination, Row} from "react-bootstrap";
import PaginationComponent from "../Pagination/Pagination";
import {useScroll} from "../Pagination/scroll";

export default class CategoriesListComponent extends React.Component {

    constructor(props) {
        super(props);
        this.setCurrentPage = this.setCurrentPage.bind(this)
        this.state = {
            name: "",
            type: "INCOME",
            currentPage: 1,
        }
    }

    setCurrentPage(page) {
        this.setState({currentPage: page})
        return page
    }

    handleFilter() {
    }

    /*const [currentPage, setCurrentPage] = useState(1);
    const scrollPosition = useScroll();
    const [name, setName] = useState("")

    const handleFilter = function () {

    }
    const handleSelectType = function () {

    }*/
    render() {

        return (
            <Container id={"container-outline"} className={"justify-content-center"}>
                <Row className={"justify-content-center"}>
                    <Col className={"text-center"}>
                        <h1 className={"mb-3"}>Kategóriák listája:</h1>
                        <Row>
                            <Col>
                                <FloatingLabel className={"mb-3"} controlId="floatingName" label="Megnevezés">
                                    <Form.Control type="text" placeholder="name"
                                                  onChange={e => this.setState({name: e.target.value})}
                                                  value={this.state.name}
                                    />
                                </FloatingLabel>
                            </Col>
                            <Col className={"m-auto"}>
                                <Form.Select className={"mb-3"} onChange={this.handleSelectType}>
                                    <option value="INCOME">Bevétel</option>
                                    <option value="EXPENSE">Kiadás</option>
                                </Form.Select>
                            </Col>
                            <Col md={"auto"} className={"mb-auto"}>
                                <Button variant="sailor_blue" size="xxl" onClick={this.handleFilter}>
                                    Szűrés
                                </Button>
                            </Col>
                            <hr/>
                            <Col>content</Col>
                            <hr/>
                            <Col>
                                <Container className={"m-auto"}>
                                    <PaginationComponent
                                        itemsCount={13}
                                        itemsPerPage={2}
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