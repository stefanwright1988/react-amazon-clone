import React, { useEffect } from "react";
import { StripeProvider, Elements } from "react-stripe-elements";
import StripeForm from "./StripeForm";

const StripeCheckout = ({ basketTotal, history }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <StripeProvider apiKey="pk_test_51HQB4gHJQFVfCAFJTTPocWDkVtopoiMB8vXNA9tBDySj47e2tfRDiIwXAhmdkohuSRDd6AB5o7mtOF50znu9H0UN00WIdAtIKu">
      <Elements>
        <StripeForm basketTotal={basketTotal} history={history} />
      </Elements>
    </StripeProvider>
  );
};

export default StripeCheckout;
