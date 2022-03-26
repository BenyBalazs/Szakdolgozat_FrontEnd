import logo from './logo.svg';
import './App.css';
import Header from "./components/headerCompnent/headerComponent";
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginComponent from "./components/loginComponent/loginComponent";
import {Routes, Route, Link} from "react-router-dom";
import LandingPage from "./components/landingPageComponent/landingPage";
import {RegisterComponent} from "./components/registerComponent/registerComponent";
import axios from "axios";
import {Component} from "react";
import Navigate from "./components/navigateFunction";
import NavigableLoginComponent from "./components/navigateFunction";
import Logout from "./components/Logout";
import UserDetailsComponent from "./components/userDetailsComponent/userDetailsComponent";
import {getUserDetails} from "./components/httpFunctions";
import {carryValue} from "@testing-library/user-event/dist/keyboard/shared";
import logout from "./components/Logout";
import NavigableUserDetailsComponent from "./components/userDetailsComponent/NavigableUserDetailsComponent";
import FinancesComponent from "./components/financesComponent/FinancesComponent";
import CreateOrEditFinancesComponent from "./components/financesComponent/CreateOrEditFinancesComponent";
import CategoriesCreateComponent from "./components/categoriesComonents/CategoriesCreateComponent";
import CategoriesListComponent from "./components/categoriesComonents/CategoriesListComponent";

axios.defaults.baseURL = "http://localhost:8080/api";
export default class App extends Component {

    constructor() {
        super();
        this.asdasd = this.asdasd.bind(this)
        this.state = {userDetails: undefined}
    }

    componentDidMount() {
        this.loadData()
    };

    loadData() {
        axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('token')
        getUserDetails()
            .then(r => {
                this.setState({
                    userDetails: r.data
                })
                console.log(r.data)
            }).catch(err => {
            logout()
            this.setState({
                userDetails: undefined
            })
            console.log(err)
        })
    }
    asdasd() {
        this.componentDidMount()
    }

    render() {

        if(!this.state.userDetails) {
            return (
                <div className="all-content">
                    <Header userDetails={this.state.userDetails}/>
                    <div className="dynamic-content">
                        <Routes>
                            <Route path="/" element={<LandingPage/>}/>
                            <Route path="/login" element={<NavigableLoginComponent force={this.asdasd}/>}/>
                            <Route path="/register" element={<RegisterComponent/>}/>
                            <Route path="/logout" element={<Logout/>}/>
                        </Routes>
                    </div>
                </div>
            );
        }

        return (
            <div className="all-content">
                <Header userDetails={this.state.userDetails}/>
                <div className="dynamic-content">
                    <Routes>
                        <Route path="/" element={<LandingPage/>}/>
                        <Route path="/login" element={<NavigableLoginComponent force={this.asdasd}/>}/>
                        <Route path="/register" element={<RegisterComponent/>}/>
                        <Route path="/logout" element={<Logout/>}/>
                        <Route path="/details" element={<NavigableUserDetailsComponent force={this.asdasd} userDetails={this.state.userDetails}/>}/>
                        <Route path="/finances" element={<FinancesComponent userDetails={this.state.userDetails}/>}/>
                        <Route path={"/create-finances"} element={<CreateOrEditFinancesComponent userDetails={this.state.userDetails}/>}/>
                        <Route path={"/create-categories"} element={<CategoriesCreateComponent userDetails={this.state.userDetails}/>}/>
                        <Route path={"/list-categories"} element={<CategoriesListComponent userDetails={this.state.userDetails}/>}/>
                    </Routes>
                </div>
            </div>
        );
    }

}
