import React from "react";
import CurrencyFormat from "react-currency-format";
import Button from "@material-ui/core/Button";
import { useStateValue } from "../state/StateProvider";
import { getBasketTotal } from "../state/reducer";

function Subtotal() {
  const [{ basket }, dispatch] = useStateValue();
  return (
    <div
      id="checkoutSubtotal"
      className="bg-gray-200 flex flex-col justify-between p-4 rounded w-64"
    >
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket?.length} items):
              <strong>{`${value}`}</strong>
            </p>
            <small id="subtotalGift" className="flex items-center pb-4">
              <input type="checkbox" className="mr-1" />
              This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"£"}
      />
      <Button variant="contained" size="small" className="">
        Proceed to checkout
      </Button>
    </div>
  );
}

export default Subtotal;
