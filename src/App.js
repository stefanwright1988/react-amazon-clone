import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header.js";
import Home from "./components/Home";
import Basket from "./components/Basket";
import SignIn from "./components/SignIn";
import Orders from "./components/Orders";
import { firebaseAuth, firebaseDb } from "./firebase";
import Checkout from "./components/Checkout";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useStateValue } from "./state/StateProvider";
import "./assets/main.css";

const promise = loadStripe(
  "pk_test_51HQB4gHJQFVfCAFJTTPocWDkVtopoiMB8vXNA9tBDySj47e2tfRDiIwXAhmdkohuSRDd6AB5o7mtOF50znu9H0UN00WIdAtIKu"
);

function App() {
  const [{ user, basket }, dispatch] = useStateValue();
  const addExistingBasket = (savedBasket) => {
    savedBasket.map((item) =>
      dispatch({
        type: "ADD_TO_BASKET",
        item: {
          id: item.id,
          image: item.image,
          price: item.price,
          rating: item.rating,
          title: item.title,
        },
      })
    );
  };
  const updateStoredBasket = (user, basket) => {
    if (basket.length > 0) {
      if (user && user !== "non-user") {
        firebaseDb
          .collection("users_collection")
          .doc(user?.uid)
          .collection("basket_collection")
          .doc("basket_doc")
          .set({
            basket: basket,
          });
      }
      localStorage.setItem("basket", JSON.stringify(basket));
    }
  };
  //Watch for basket updates so we can modify the stored basket, stored in Firestore and LocalStorage
  useEffect(() => {
    updateStoredBasket(user, basket);
  }, [basket]);

  useEffect(() => {
    let lsBasket = JSON.parse(localStorage.getItem("basket")) || [];
    firebaseAuth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
        firebaseDb
          .collection("users_collection")
          .doc(authUser?.uid)
          .collection("basket_collection")
          .doc("basket_doc")
          .get()
          .then((doc) => {
            if (doc.exists) {
              let orderedObjects = [];
              doc.data().basket.forEach((item) => {
                let orderedObject = {};
                Object.keys(item)
                  .sort()
                  .forEach(function (key) {
                    orderedObject[key] = item[key];
                  });
                orderedObjects.push(orderedObject);
              });
              let equalityCheck =
                JSON.stringify(orderedObjects) === JSON.stringify(lsBasket);
              if (!equalityCheck) {
                const combinedBaskets = [...lsBasket, ...orderedObjects];
                addExistingBasket(combinedBaskets);
                updateStoredBasket(authUser, combinedBaskets);
              } else {
                addExistingBasket([...lsBasket]);
              }
            } else {
              console.log("no saved basket");
            }
          });
      } else {
        lsBasket = JSON.parse(localStorage.getItem("basket")) || [];
        addExistingBasket([...lsBasket]);
        dispatch({
          type: "SET_USER",
          user: "non-user",
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
          <Route path="/orders">
            <Header />
            <Orders />
          </Route>
          <Route
            path="/checkout"
            render={() =>
              user !== "non-user" ? (
                <>
                  <Header />
                  <Elements stripe={promise}>
                    <Checkout />
                  </Elements>
                </>
              ) : (
                <SignIn />
              )
            }
          />
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
