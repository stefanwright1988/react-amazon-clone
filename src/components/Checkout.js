import React from "react";
import Subtotal from "./Subtotal";

function Checkout() {
  return (
    <div id="checkout" className="flex p-4 h-full bg-white">
      <div id="checkoutLeft">
        <img
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK-hq/2020/img/Giftcard/XCM_Manual_1300x90_1221653_1154706_uk_desktop_vc_organic_repeat_asv_6d69476c_f0a0_42b5_8cd8_af31cc37f368_png._CB433371122_.png"
          id="checkoutAd"
          alt=""
          className="w-full mb-4"
        ></img>
        <div>
          <h2
            id="checkoutTitle"
            className="mr-2 p-2 border-gray-700 border-b-2"
          >
            Your Shopping Basket
          </h2>
        </div>
      </div>
      <div id="checkoutRight" className="bg-gray-200 rounded">
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout;
