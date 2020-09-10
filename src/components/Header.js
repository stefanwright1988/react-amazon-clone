import React from "react";
import { Link } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { useStateValue } from "../state/StateProvider";

function Header() {
  const [{ basket }, dispatch] = useStateValue();
  return (
    <div className="h-16 flex items-center align-center bg-amazonGrey sticky top-0 z-30">
      <Link to="/">
        <img
          src="/amazonlogo.png"
          className="mt-1 mx-20 object-contain w-40"
          alt="Logo"
        />
      </Link>
      <div
        id="headerSearch"
        className="flex items-center flex-1 rounded-tl rounded-bl"
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
        <div id="headerName_SignIn" className="flex flex-col mx-4 text-white">
          <span id="headerName_SignIn_L1" className="text-xs">
            Hello Guest
          </span>
          <span id="headerName_SignIn_L2" className="text-lg font-bold">
            Sign In
          </span>
        </div>
        <div id="headerName_Orders" className="flex flex-col mx-4 text-white">
          <span id="headerName_Orders_L1" className="text-xs">
            Returns
          </span>
          <span id="headerName_Orders_L2" className="text-lg font-bold">
            & Orders
          </span>
        </div>
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
          className="flex items-center mx-4 text-white"
        >
          <Link to="/checkout">
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
