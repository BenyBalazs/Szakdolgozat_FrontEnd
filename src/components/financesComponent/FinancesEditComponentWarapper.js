import FinancesEditComponent from "./FinancesEditComponent";
import {useParams} from "react-router-dom";
import {useNavigate} from "react-router-dom";

export default function FinancesEditComponentWrapper(props) {

    let {id} = useParams()
    let navigate = useNavigate()

    return <FinancesEditComponent navigate={navigate} pathParam={id} userDetails={props.userDetails}/>
}