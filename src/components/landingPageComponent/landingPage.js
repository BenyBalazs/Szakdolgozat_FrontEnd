import React from 'react';
import '../../App.css';
import {Col, Container, Row} from "react-bootstrap";

class LandingPage extends React.Component{

    componentDidMount() {

    }

    render() {

        return (
            <Container id={"container-outline"} className={"justify-content-center"}>
                <Row className={"m-auto"}>
                    <Col className={"text-center"}>
                        <h3>
                            Üdvözöllek a kiadáskezelő alkalmazásomban
                        </h3>
                        <p>
                            Az alkalmazás használata képessé tesz arra, hogy nyomon tudd követni mindennapi pézügyeidet és, hogy egy jó taktikát tudj kialakítani arról, hogyan költöd a pénzed.
                        </p>
                        <p>
                            Remélem hasznos lesz számodra ez az alkalmazás
                        </p>
                        <p>
                            Az alkalmazás használatához be kell jelentkezned amit a bejelentkezés menüpontban tehetsz meg.
                        </p>
                        <p>
                            Ha már be vagy jeletkezve semmi más dolgod nincs mit használni és élvezni az alkalmazást.
                        </p>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default LandingPage;
