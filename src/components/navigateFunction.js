import {useParams, useNavigate} from "react-router-dom";
import LoginComponent from "./loginComponent/loginComponent";

export default function NavigableLoginComponent(props) {
    let navigate = useNavigate()

    return <LoginComponent navigate = {navigate} forceForce = {props.force}/>
}