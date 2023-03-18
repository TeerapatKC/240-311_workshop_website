import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import TechnicianSelection from "./pages/TechnicianSelection";
import SelectedTechnicians from "./pages/SelectedTechnicians";
import { BrowserRouter as Router, Switch, Route, useLocation } from "react-router-dom";

function Main({ isLoggedIn, handleLogout, handleLogin }) {
  const [showNavbar, setShowNavbar] = useState(true);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/signup") {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
  }, [location]);

  return (
    <>
      {showNavbar && (
        <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      )}
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/login">
          <Login handleLogin={handleLogin} />
        </Route>
        <Route path="/signup" exact>
          <Signup />
        </Route>
        <Route path="/technicianSelection" exact>
          <TechnicianSelection />
        </Route>
        <Route path="/selected-technicians" exact>
          <SelectedTechnicians />
        </Route>
      </Switch>
    </>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Main isLoggedIn={isLoggedIn} handleLogout={handleLogout} handleLogin={handleLogin} />
    </Router>
  );
}

export default App;
