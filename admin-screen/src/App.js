import "./App.css";
import Header from "./components/header/Header";
import RentApp from "./components/rentApp/RentApp";
import { BrowserRouter } from "react-router-dom";
import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div>
      <BrowserRouter>
        <Header
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
        <RentApp
          clasname="RentApp"
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
