import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./assets/main.css";
import Header from "./components/Header.js";
import Home from "./components/Home";
import Checkout from "./components/Basket";
import SignIn from "./components/SignIn";
import { firebaseAuth } from "./firebase";
import { useStateValue } from "./state/StateProvider";

function App() {
  const [{}, dispatch] = useStateValue();
  useEffect(() => {
    firebaseAuth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/signIn">
            <SignIn />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
