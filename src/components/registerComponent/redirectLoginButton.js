import React from 'react';
import {Button, Col, Container, FloatingLabel, Form, Row} from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import '../formStyle.css'

export function RedirectLoginButton() {

    let navigate = useNavigate()

    return(
        <Button variant="outline_sailor_blue" type="button" onClick={() => navigate("/login")}>
            Bejelentkezek!
        </Button>
    );

}
