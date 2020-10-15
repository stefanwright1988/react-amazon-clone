import React from "react";
import CurrencyFormat from "react-currency-format";
import Button from "@material-ui/core/Button";
import { useStateValue } from "../state/StateProvider";
import { getBasketTotal } from "../state/reducer";
import { useHistory } from "react-router-dom";

function Subtotal() {
  const history = useHistory();
  const [{ basket }, dispatch] = useStateValue();
  return (
    <div
      id="basketSubtotal"
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
      <Button
        variant="contained"
        size="small"
        disabled={basket.length === 0}
        className=""
        onClick={(e) => history.push("/checkout")}
      >
        {basket.length > 0 ? "Proceed to checkout" : "No items in basket"}
      </Button>
    </div>
  );
}

export default Subtotal;
