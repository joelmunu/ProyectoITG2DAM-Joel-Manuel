import "./App.css";
import Header from "./components/header/Header";
import RentApp from "./components/rentApp/RentApp";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header></Header>
        <RentApp clasname="RentApp"></RentApp>
      </BrowserRouter>
    </div>
  );
}

export default App;
