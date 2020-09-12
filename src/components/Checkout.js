import React, { useState, useEffect } from "react";
import { useStateValue } from "../state/StateProvider";
import BasketProduct from "./BasketProduct";
import { Link, useHistory } from "react-router-dom";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "../state/reducer";
import Button from "@material-ui/core/Button";
import axios from "../axios";
import { firebaseDb } from "../firebase";

function Checkout() {
  const history = useHistory();
  const [{ basket, user }, dispatch] = useStateValue();

  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [clientSecret, setClientSecret] = useState(true);

  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };
    getClientSecret();
  }, [basket]);

  console.log("The secret is >>> ", clientSecret);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        firebaseDb
          .collection("users")
          .doc(user?.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            create: paymentIntent.created,
          });
        setSucceeded(true);
        setError(null);
        setProcessing(false);
        dispatch({
          action: "EMPTY_BASKET",
        });
        history.replace("/orders");
      });
  };
  const handleChange = (e) => {
    setDisabled(e.empty);
    if (e.complete) {
      document.getElementById("paymentButton").classList.remove("Mui-disabled");
    }
    setError(e.error ? e.error.message : "");
  };
  return (
    <div className="bg-white" id="checkout">
      <div id="checkout_Container" className="">
        <h1 className="text-center p-4 bg-gray-200 border-b-2 border-gray-500">
          Checkout (
          <Link to="/basket" className="no-underline">
            {basket.length} items
          </Link>
          )
        </h1>
        <div
          id="checkout_DeliverySection"
          className="flex p-4 mx-4 border-b-2 border-gray-200"
        >
          <div id="checkout_DeliverySectionTitle" className="w-1/5">
            <h3 id="checkout_DeliverySectionTitleText" className="">
              Delivery Address
            </h3>
          </div>
          <div id="checkout_DeliverySectionAddress" className="w-4/5">
            <p>{user?.email}</p>
            <p>123 Test Street</p>
            <p>Lowestoft</p>
            <p>Suffolk</p>
            <p>NR33 9UP</p>
          </div>
        </div>
        <div
          id="checkout_BasketSection"
          className="flex p-4 mx-4 border-b-2 border-gray-200"
        >
          <div id="checkout_BasketSectionTitle" className="w-1/5">
            <h3 id="checkout_BasketSectionTitleText" className="">
              Review items for delivery
            </h3>
          </div>
          <div id="checkout_BasketSectionItems" className="w-4/5">
            {basket.map((item) => (
              <BasketProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>
        <div
          id="checkout_PaymentSection"
          className="flex w-full p-4 mx-4 border-b-2 border-gray-200"
        >
          <div id="checkout_PaymentSectionTitle" className="w-1/5">
            <h3 id="checkout_PaymentSectionTitleText" className="">
              Payment Info
            </h3>
          </div>
          <div id="checkout_PaymentSectionDetails" className="w-2/5">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div id="checkout_PaymentSectionPrice">
                <CurrencyFormat
                  renderText={(value) => <h3>Order total: {value}</h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"£"}
                />
              </div>
              <Button
                id="paymentButton"
                type="submit"
                disabled={processing || disabled || succeeded}
                style={{ backgroundColor: "lightgreen" }}
              >
                <span>{processing ? `Processing` : `Pay Now`}</span>
              </Button>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
