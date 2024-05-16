import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { getStripeKey, makePayment } from "../../api/paymentApi";
import CheckoutForm from "./CheckoutForm";

export default function Payment() {
  const [clientSecret, setClientSecret] = useState("")
  const [stripeKey, setStripeKey] = useState("")

  useEffect(() => {
    getStripeKey()
    .then((data) => {
      setStripeKey(data.STRIPEAPIKEY);
    })
    let amount=sessionStorage.getItem('total')
    makePayment(amount*100)
    .then(data=>{
      setClientSecret(data.clientSecret)
    })
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div>
      {stripeKey && clientSecret && 
        <Elements options={options} stripe={loadStripe(stripeKey)}>
          <CheckoutForm />
        </Elements>
      }
    </div>
  );
}
