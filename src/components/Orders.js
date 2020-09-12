import React, { useState, useEffect } from "react";
import { useStateValue } from "../state/StateProvider";
import { firebaseDb } from "../firebase";
import SingleOrder from "./SingleOrder";
import CurrencyFormat from "react-currency-format";

function Orders() {
  const [{ basket, user }] = useStateValue();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      firebaseDb
        .collection("users")
        .doc(user?.uid)
        .collection("orders")
        .orderBy("create", "desc")
        .onSnapshot((snapshot) =>
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    } else {
      setOrders([]);
    }
  }, [user]);
  return (
    <div id="orders" className="py-4 px-8">
      <h1>Your Orders</h1>
      <div>
        {orders?.map((order) => (
          <SingleOrder order={order} />
        ))}
      </div>
    </div>
  );
}

export default Orders;
