import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Registration from "./components/registration";

function App() {
  return (
    <Router>
      <div className="App">
        <h1>KompFlixNet</h1>

        <Link to="/registration">Regisztracio</Link>
        <Switch>
          <Route path="/registration">
            <Registration />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
