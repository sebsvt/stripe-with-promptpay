import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";

function Payment(props) {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setCleintSecret] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/config").then(async (r) => {
      const { key } = await r.json();
      setStripePromise(loadStripe(key));
    });
  }, []);

  useEffect(() => {
    fetch("http://localhost:8000/create-payment-intent", {
      method: "POST",
      body: JSON.stringify({}),
    }).then(async (r) => {
      const { client_secret } = await r.json();
      setCleintSecret(client_secret);
    });
  }, []);

  return (
    <>
      <h1>React Stripe and the Payment Element</h1>
      {stripePromise && clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
}

export default Payment;
