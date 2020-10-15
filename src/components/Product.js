import React, { useEffect } from "react";
import Star from "@material-ui/icons/Star";
import Button from "@material-ui/core/Button";
import { useStateValue } from "../state/StateProvider";

function Product({ id, title, price, rating, image }) {
  const [{}, dispatch] = useStateValue();

  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        image: image,
        price: price,
        rating: rating,
        title: title,
      },
    });
    dispatch({
      type: "SAVE_BASKET_TO_STORAGE",
    });
  };
  return (
    <div
      id="productArea"
      className="flex flex-col bg-white z-10 items-center justify-between m-4 p-4 md:w-full"
    >
      <div id="productInfo" className="mb-2 w-full order-2">
        <p id="productTitle" className="">
          {title}
        </p>
        <p id="productPrice" className="mt-2">
          <small>£</small>
          <strong>{price}</strong>
        </p>
        <p id="productRating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <Star className="text-yellow-400" />
            ))}
        </p>
      </div>
      <img
        className="object-contain md:h-64 md:max-w-xs h-32  mb-4 order-1"
        src={image}
        alt={title}
      />
      <Button
        variant="contained"
        style={{ backgroundColor: "lightgreen" }}
        className="border-black mt-1 order-3"
        onClick={addToBasket}
      >
        Add to basket
      </Button>
    </div>
  );
}

export default Product;
