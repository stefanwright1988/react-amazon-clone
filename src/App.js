import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./assets/main.css";
import Header from "./components/Header.js";
import Home from "./components/Home";
import Basket from "./components/Basket";
import SignIn from "./components/SignIn";
import Orders from "./components/Orders";
import { firebaseAuth } from "./firebase";
import { useStateValue } from "./state/StateProvider";
import Checkout from "./components/Checkout";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe(
  "pk_test_51HQB4gHJQFVfCAFJTTPocWDkVtopoiMB8vXNA9tBDySj47e2tfRDiIwXAhmdkohuSRDd6AB5o7mtOF50znu9H0UN00WIdAtIKu"
);

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
          <Route path="/orders">
            <Header />
            <Orders />
          </Route>
          <Route path="/checkout">
            <Header />
            <Elements stripe={promise}>
              <Checkout />
            </Elements>
          </Route>
          <Route path="/signIn">
            <SignIn />
          </Route>
          <Route path="/basket">
            <Header />
            <Basket />
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
