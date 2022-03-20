import {useNavigate} from "react-router-dom";
import LoginComponent from "../loginComponent/loginComponent";
import UserDetailsComponent from "./userDetailsComponent";

export default function NavigableUserDetailsComponent(props) {
    let navigate = useNavigate()

    return <UserDetailsComponent navigate = {navigate} forceForce = {props.force} userDetails={props.userDetails}/>
}