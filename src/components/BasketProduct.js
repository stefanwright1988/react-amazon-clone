import React from "react";
import Star from "@material-ui/icons/Star";
import Button from "@material-ui/core/Button";
import { useStateValue } from "../state/StateProvider";

function BasketProduct({
  id,
  image,
  title,
  price,
  rating,
  hidebutton = false,
}) {
  const [{ basket }, dispatch] = useStateValue();
  const removeFromBasket = () =>
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  return (
    <div id="basketProduct" className="flex my-8">
      <img
        id="basketProduct_Image"
        src={image}
        alt=""
        className="object-contain w-32 h-32"
      />
      <div className="pl-4" id="basketProduct_Info">
        <p className="" id="basketProduct_Title">
          {title}
        </p>
        <p id="basketProduct_Price" className="">
          <small>£</small>
          <strong>{price}</strong>
        </p>
        <p id="basketProduct_Rating" className="">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <Star className="text-yellow-400" />
            ))}
        </p>
        {!hidebutton && (
          <Button
            variant="contained"
            style={{ backgroundColor: "lightgreen" }}
            className="border-black mt-1"
            onClick={removeFromBasket}
          >
            Remove from basket
          </Button>
        )}
      </div>
    </div>
  );
}

export default BasketProduct;
