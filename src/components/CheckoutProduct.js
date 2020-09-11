import React from "react";
import Star from "@material-ui/icons/Star";
import Button from "@material-ui/core/Button";
import { useStateValue } from "../state/StateProvider";

function CheckoutProduct({ id, image, title, price, rating }) {
  const [{ basket }, dispatch] = useStateValue();
  const removeFromBasket = () =>
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  return (
    <div id="checkoutProduct" className="flex my-8">
      <img
        id="checkoutProduct_Image"
        src={image}
        alt=""
        className="object-contain w-32 h-32"
      />
      <div className="pl-4" id="checkoutProduct_Info">
        <p className="" id="checkoutProduct_Title">
          {title}
        </p>
        <p id="checkoutProduct_Price" className="">
          <small>£</small>
          <strong>{price}</strong>
        </p>
        <p id="checkoutProduct_Rating" className="">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <Star className="text-yellow-400" />
            ))}
        </p>
        <Button
          variant="contained"
          style={{ backgroundColor: "lightgreen" }}
          className="border-black mt-1"
          onClick={removeFromBasket}
        >
          Remove from basket
        </Button>
      </div>
    </div>
  );
}

export default CheckoutProduct;
