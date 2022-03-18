import React from 'react';
import {Button, Col, Container, FloatingLabel, Form, Row} from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

export function RedirectLoginButton(props) {

    let navigate = useNavigate()


    return(
        <Button variant="outline_sailor_blue" type="button" onClick={() => navigate(props.path)}>
            {props.buttonName}
        </Button>
    );

}
