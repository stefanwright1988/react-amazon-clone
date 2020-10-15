const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51HQB4gHJQFVfCAFJlpsfrBPcpJAREEmwFbTvaYO41wbQR5GIyKvqoG3bAmlpNhDyryi5Q0mLZYnSkVGlQpT2PNvV00vAHLoLpu"
);

//Setup API
const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (req, res) => res.status(200).send("hello world"));
app.post("/stripe/charge", async (req, res) => {
  try {
    const { amount, source, receipt_email } = req.body;

    const charge = await stripe.charges.create({
      amount,
      currency: "gbp",
      source,
      receipt_email,
    });

    if (!charge) throw new Error("charge unsuccessful");

    res.status(200).json({
      message: "charge posted successfully",
      charge,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
    throw new Error("charge unsuccessful");
  }
});

//app.listen(port, () => console.log(`server running on port ${port}`));
exports.api = functions.https.onRequest(app);
