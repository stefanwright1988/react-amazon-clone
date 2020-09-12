const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51HQB4gHJQFVfCAFJlpsfrBPcpJAREEmwFbTvaYO41wbQR5GIyKvqoG3bAmlpNhDyryi5Q0mLZYnSkVGlQpT2PNvV00vAHLoLpu"
);

// Api
//App config
const app = express();
//Middlewares
app.use(cors({ origin: true }));
app.use(express.json());
//API Routes
app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;
  console.log("Payment request recieved for this amount > ", total);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "gbp",
  });
  
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});
//Listen command
exports.api = functions.https.onRequest(app);

//example end point
//http://localhost:5001/clone-d1e61/us-central1/api
