import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { firebaseAuth } from "../firebase";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const signIn = (e) => {
    e.preventDefault();
    firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        history.push("/");
      })
      .catch((error) => alert(error));
  };
  const signUp = (e) => {
    e.preventDefault();
    firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        if (auth) {
          history.push("/");
        }
      })
      .catch((error) => alert(error.message));
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
      <div className="rounded border-black border-2 p-12" id="signIn_Form">
        <h1 className="text-center">Sign-In</h1>
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
            onClick={signIn}
          >
            Sign In to FAKE Amazon
          </Button>
        </form>
        <p className="my-4">
          This is NOT the real Amazon site. It is FAKE, for DEMO purposes only
        </p>

        <Button
          variant="contained"
          style={{ backgroundColor: "lightgreen" }}
          className="w-full"
          onClick={signUp}
        >
          Create an account on FAKE Amazon
        </Button>
      </div>
    </div>
  );
}

export default SignIn;
