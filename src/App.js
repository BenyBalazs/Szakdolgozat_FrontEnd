import logo from './logo.svg';
import './App.css';
import Header from "./components/headerCompnent/headerComponent";
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginComponent from "./components/loginComponent/loginComponent";
import { Routes, Route, Link } from "react-router-dom";
import LandingPage from "./components/landingPageComponent/landingPage";
import RegisterComponent from "./components/registerComponent/registerComponent";

function App() {
  return (
      <div className="all-content">
          <Header/>
          <div className="dynamic-content">
              <Routes>
                  <Route path="/" element={<LandingPage/>}/>
                  <Route path="/login" element={<LoginComponent/>}/>
                  <Route path="/register" element={<RegisterComponent/>}/>
              </Routes>
          </div>
      </div>





  );
}

export default App;
