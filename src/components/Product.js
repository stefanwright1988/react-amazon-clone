import React from "react";
import Star from "@material-ui/icons/Star";
import Button from "@material-ui/core/Button";
import { useStateValue } from "../state/StateProvider";

function Product({ id, title, price, rating, image }) {
  const [{ basket }, dispatch] = useStateValue();
  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
  };
  return (
    <div
      id="productArea"
      className="flex flex-col bg-white z-10 items-center justify-between m-4 p-4 w-full"
    >
      <div id="productInfo" className="h-24 mb-2 w-full">
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
        className="object-contain w-64 mb-4"
        src={image}
        alt="The Lean Startup"
      />
      <Button
        variant="contained"
        style={{ backgroundColor: "lightgreen" }}
        className="border-black mt-1"
        onClick={addToBasket}
      >
        Add to basket
      </Button>
    </div>
  );
}

export default Product;
