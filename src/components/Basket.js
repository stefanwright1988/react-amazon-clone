import React from "react";
import Subtotal from "./Subtotal";
import BasketProduct from "./BasketProduct";
import { useStateValue } from "../state/StateProvider";

const Basket = () => {
  const [{ basket, user }, dispatch] = useStateValue();
  return (
    <div id="basket" className="flex p-4 h-full bg-white">
      <div id="basketLeft">
        <img
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK-hq/2020/img/Giftcard/XCM_Manual_1300x90_1221653_1154706_uk_desktop_vc_organic_repeat_asv_6d69476c_f0a0_42b5_8cd8_af31cc37f368_png._CB433371122_.png"
          id="basketAd"
          alt=""
          className="w-full mb-4"
        ></img>
        <div>
          <h3 className="mr-2 p-2">Hello, {user ? user.email : `Guest`}</h3>
          <h2 id="basketTitle" className="mr-2 p-2 border-gray-700 border-b-2">
            Your Shopping Basket
          </h2>
          {basket.length ? (
            basket.map((item) => (
              <BasketProduct
                id={item.id}
                image={item.image}
                price={item.price}
                rating={item.rating}
                title={item.title}
              />
            ))
          ) : (
            <h1>Basket is empty</h1>
          )}
        </div>
      </div>
      <div id="basketRight" className="">
        <Subtotal />
      </div>
    </div>
  );
};

export default Basket;
