import React from "react";
import { Link } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { useStateValue } from "../state/StateProvider";
import { firebaseAuth } from "../firebase";

function Header() {
  const [{ basket, user }, dispatch] = useStateValue();
  const handleAuth = () => {
    if (user) {
      localStorage.removeItem(`basket`);
      firebaseAuth.signOut();
      dispatch({ type: "EMPTY_BASKET" });
    }
  };
  return (
    <div className="align-center bg-amazonGrey flex flex-col h-auto items-center md:flex-row sticky top-0 z-30">
      <Link to="/">
        <img
          src="/amazonlogo.png"
          className="mt-1 mx-20 object-contain w-40 p-4"
          alt="Logo"
        />
      </Link>
      <div
        id="headerSearch"
        className="flex items-center flex-1 rounded-tl rounded-bl w-full p-2"
      >
        <input
          type="search"
          id="headerSearchInput"
          className="w-full h-8 rounded-tl rounded-bl"
        />
        <SearchIcon
          className="bg-amazonGreen p-1 rounded-br rounded-tr"
          fontSize="large"
        />
      </div>
      <div id="headerNav" className="flex justify-evenly">
        <Link to={(!user || user === "non-user") && "/signIn"}>
          <div
            id="headerName_SignIn"
            onClick={handleAuth}
            className="flex flex-col mx-4 text-white"
          >
            <span id="headerName_SignIn_L1" className="text-xs">
              Hello {user ? user.email : `Guest`}
            </span>
            <span id="headerName_SignIn_L2" className="text-lg font-bold">
              {user && user !== "non-user" ? `Sign Out` : `Sign In`}
            </span>
          </div>
        </Link>
        <Link to="/orders">
          <div id="headerName_Orders" className="flex flex-col mx-4 text-white">
            <span id="headerName_Orders_L1" className="text-xs">
              Returns
            </span>
            <span id="headerName_Orders_L2" className="text-lg font-bold">
              & Orders
            </span>
          </div>
        </Link>
        <div id="headerName_Prime" className="flex flex-col mx-4 text-white">
          <span id="headerName_Prime_L1" className="text-xs">
            Your
          </span>
          <span id="headerName_Prime_L2" className="text-lg font-bold">
            Prime
          </span>
        </div>
        <div
          id="headerName_Basket"
          className="flex items-center mx-4 text-white text-center"
        >
          <Link to="/basket">
            <ShoppingBasketIcon className="mx-2" />
            <span id="headerName_Basket_Count" className="text-lg font-bold">
              {basket?.length}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
