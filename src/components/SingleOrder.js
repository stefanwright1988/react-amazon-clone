import React from "react";
import moment from "moment";
import BasketProduct from "./BasketProduct";
import CurrencyFormat from "react-currency-format";

function SingleOrder({ order }) {
  return (
    <div
      id="singleOrder"
      className="p-8 my-4 border-2 border-gray-200 bg-white relative"
    >
      <h2>
        Order (<small>{order.id}</small>)
      </h2>
      <p>{moment.unix(order.data.create).format("Do MMMM YYYY, h:mma")}</p>
      {order.data.basket?.map((item) => (
        <BasketProduct
          id={item.id}
          title={item.title}
          image={item.image}
          price={item.price}
          rating={item.rating}
          hidebutton={true}
        />
      ))}
      <CurrencyFormat
        renderText={(value) => (
          <h3 className="text-right">Order total: {value}</h3>
        )}
        decimalScale={2}
        value={order.data.amount / 100}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"£"}
      />
    </div>
  );
}

export default SingleOrder;
