import React from "react";
import CurrencyFormat from "react-currency-format";
import Button from "@material-ui/core/Button";
import { useStateValue } from "../state/StateProvider";

function Subtotal() {
  const [{ basket }, dispatch] = useStateValue();
  const getBasketSubTotal = () => {
    let subTotal =
      basket?.length > 0
        ? basket.reduce((subtotal, item) => subtotal + item.price, 0)
        : 0;
    return subTotal;
  };
  return (
    <div
      id="checkoutSubtotal"
      className="flex flex-col justify-between w-64 h-full p-4"
    >
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket?.length} items):
              <strong>{`${value}`}</strong>
            </p>
            <small id="subtotalGift" className="flex items-center">
              <input type="checkbox" className="mr-1" /> This order contains a
              gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketSubTotal()}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"£"}
      />
      <Button variant="contained" size="small" className="mt-1">
        Proceed to checkout
      </Button>
    </div>
  );
}

export default Subtotal;
