import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "react";
import PaymentForm from "./PaymentForm";

const PUBLIC_KEY =
  "pk_test_51QhW9KP3J6awdgv9LOcfGoBiJjionazvgPj8Zz9iSM0MVkWF3yOVDQn7vOQ95VcfmWTp0zO6dyqWIXjgTJJKgpeH00YGyuGQIJ";
const stripeTestPromise = loadStripe(PUBLIC_KEY);
export default function StripeContainer() {
  return (
    <Elements stripe={stripeTestPromise}>
      <PaymentForm />
    </Elements>
  );
}
