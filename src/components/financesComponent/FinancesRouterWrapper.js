import {useNavigate} from "react-router-dom";
import ListFinancesComponent from "./ListFinancesComponent";

export default function FinancesRouterWrapper(props) {
    let navigate = useNavigate()

    return <ListFinancesComponent navigate={navigate} userDetails={props.userDetails}/>
}