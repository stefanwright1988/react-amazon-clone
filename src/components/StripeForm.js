import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  injectStripe,
} from "react-stripe-elements";
import axios from "axios";
import { getBasketTotal } from "../state/reducer";
import CurrencyFormat from "react-currency-format";
import { firebaseDb } from "../firebase";
import { useStateValue } from "../state/StateProvider";

const StripeForm = ({ stripe, history }) => {
  const [{ basket, user }, dispatch] = useStateValue();
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const basketTotal = getBasketTotal(basket);
  const [receiptUrl, setReceiptUrl] = useState("");

  if (basketTotal === null) {
    history.push("/checkout");
    return null;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { token } = await stripe.createToken({
      name: "customer name",
    });

    const order = await axios
      .post(
        //"http://localhost:5001/amclone-e4161/us-central1/api/stripe/charge",
        "https://us-central1-amclone-e4161.cloudfunctions.net/api/stripe/charge",
        {
          amount: basketTotal.toFixed(2).replace(".", ""),
          source: token.id,
          receipt_email: "customer@example.com",
        }
      )
      .then((res) => {
        firebaseDb
          .collection("users_collection")
          .doc(user?.uid)
          .collection("orders_collection")
          .doc(res.data.charge.id)
          .set({
            basket: basket,
            amount: res.data.charge.amount,
            create: res.data.charge.created,
          })
          .then(() => {
            firebaseDb
              .collection("users_collection")
              .doc(user?.uid)
              .collection(`basket_collection`)
              .doc(`basket_doc`)
              .delete();
          })
          .then(() => {
            setSucceeded(true);
            setError(null);
            setProcessing(false);
            dispatch({
              type: "EMPTY_BASKET",
            });
            localStorage.removeItem("basket");
            history.replace("/orders");
          });
      });
  };

  if (receiptUrl) {
    return (
      <div className="success">
        <h2>Payment Successful!</h2>
        <a href={receiptUrl}>View Receipt</a>
        <Link to="/">Home</Link>
      </div>
    );
  }

  return (
    <div className="checkout-form">
      <p>
        <CurrencyFormat
          renderText={(value) => (
            <h3 className="text-right">Order total: {value}</h3>
          )}
          decimalScale={2}
          value={basketTotal}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"£"}
        />
      </p>
      <form onSubmit={handleSubmit}>
        <label className="bg">
          Card details
          <CardNumberElement className="border-2 border-amazonGrey p-2 rounded-full shadow-lg" />
        </label>
        <label>
          Expiration date
          <CardExpiryElement className="border-2 border-amazonGrey p-2 rounded-full shadow-lg" />
        </label>
        <label>
          CVC
          <CardCVCElement className="border-2 border-amazonGrey p-2 rounded-full shadow-lg" />
        </label>
        <button type="submit" className="order-button">
          Pay
        </button>
      </form>
    </div>
  );
};

export default injectStripe(StripeForm);
