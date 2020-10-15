import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { firebaseAuth } from "../firebase";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signinToggle, setSigninToggle] = useState(true);
  const history = useHistory();
  const signInHandler = (e) => {
    e.preventDefault();
    if (!signinToggle) {
      setSigninToggle(true);
    } else {
      firebaseAuth
        .signInWithEmailAndPassword(email, password)
        .then((auth) => {
          history.push("/");
        })
        .catch((error) => alert(error));
    }
  };
  const signUpHandler = (e) => {
    e.preventDefault();
    if (signinToggle) {
      setSigninToggle(false);
    } else {
      firebaseAuth
        .createUserWithEmailAndPassword(email, password)
        .then((auth) => {
          if (auth) {
            history.push("/");
          }
        })
        .catch((error) => alert(`SignUp: ${error.message}`));
    }
  };
  return (
    <div id="signIn" className="flex flex-col items-center h-screen bg-white">
      <Link to="/">
        <img
          src="/amazonlogo.png"
          alt=""
          className="object-contain m-4 w-56 mx-auto my-8"
        />
      </Link>
      <div
        className="border-2 border-black pb-12 pt-4 px-12 rounded-lg"
        id="signIn_Form"
      >
        <h1 className="text-center">{signinToggle ? `Sign-In` : `Sign-Up`}</h1>
        <form>
          <h5 className="my-1">E-mail</h5>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 border-black w-full my-1"
          />
          <h5 className="my-1">Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-2 border-black w-full mt-1 mb-4"
          />
          <Button
            variant="contained"
            style={{ backgroundColor: "lightgreen" }}
            className="w-full"
            onClick={signinToggle ? signInHandler : signUpHandler}
          >
            Sign {signinToggle ? `In` : `Up`} to FAKE Amazon
          </Button>
        </form>
        <p className="my-4">
          This is NOT the real Amazon site. It is FAKE, for DEMO purposes only
        </p>

        <Button
          variant="contained"
          style={{ backgroundColor: "lightgreen" }}
          className="w-full"
          onClick={signinToggle ? signUpHandler : signInHandler}
        >
          {signinToggle ? `Create an account on` : `Sign In to`} FAKE Amazon
        </Button>
      </div>
    </div>
  );
};

export default SignIn;
