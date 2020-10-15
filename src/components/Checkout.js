import React from "react";
import { useStateValue } from "../state/StateProvider";
import BasketProduct from "./BasketProduct";
import { Link, useHistory } from "react-router-dom";
import StripeCheckout from "./StripeContainer";

function Checkout() {
  const history = useHistory();
  const [{ basket, user }, dispatch] = useStateValue();
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
                image={item.image}
                price={item.price}
                rating={item.rating}
                title={item.title}
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
            <StripeCheckout basket={basket} history={history} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
