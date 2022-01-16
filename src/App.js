import logo from './logo.svg';
import './App.css';
import Header from "./components/headerCompnent/headerComponent";
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginComponent from "./components/loginComponent/loginComponent";

function App() {
  return (
      <div>
        <Header/>
        <LoginComponent/>
      </div>

  );
}

export default App;
