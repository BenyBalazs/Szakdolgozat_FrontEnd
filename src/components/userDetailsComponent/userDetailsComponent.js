import React from "react";
import {getUserDetails} from "../httpFunctions";
import {Alert, Button, Col, Container, FloatingLabel, Form, Row} from "react-bootstrap";
import logout from "../Logout";
import {render} from "react-dom";
import {RedirectLoginButton} from "../redirectLoginButton";

class UserDetailsComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userDetails: props.userDetails
        }

    }

    componentDidMount() {
        console.log(this.state.userDetails)
    }

    render() {
        console.log("render")
        console.log(this.state.userDetails)
        return (
            <Container id="login-form-container" className="align-content-center" fluid="lg">

                <Row className="mb-14">
                    <Col className="mb-14"><h1 className="mb-14">Profil</h1></Col>
                </Row>
                <Row>
                    <Col> Felhasználónév: </Col>
                    <Col className="text-center">{this.state.userDetails.username}</Col>
                </Row>
                <hr/>
                <Row className="mb-3">
                    <Col>E-mail: </Col>
                    <Col className="text-center">{this.state.userDetails.email}</Col>
                </Row>
                <hr/>
                <Row className="mb-3">
                    <Col>Rang: </Col>

                    <Col
                        className="text-center">{this.state.userDetails.role === "ROLE_USER" ? "Alap felhasználó" : "Admin felhasználó"}</Col>
                </Row>
                <Row className="text-center">
                    <Col>
                        <Button className="m-auto" variant="sailor_blue" size="xxl" type="button"
                                onClick={() => this.handleLogout()}>
                            Kijelentkezés
                        </Button>
                    </Col>
                </Row>

            </Container>
        );
    }

    handleLogout() {
        logout();
        this.props.forceForce();
        this.props.navigate("/", render);
    }
}

export default UserDetailsComponent;