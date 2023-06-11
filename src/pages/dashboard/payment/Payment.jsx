import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckOutForm";
import { useLocation } from "react-router-dom";
const stripePromise = loadStripe(`${import.meta.env.VITE_PAYMENT_PK}`);
const Payment = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const price = parseFloat(searchParams.get("price"));
  const total = parseFloat(price.toFixed(2));
  console.log(total);
  return (
    <div className="md:w-2/4 mx-auto md:pt-12 pt-6">
      <div>
        <h2>This is payment page</h2>
      </div>
      <Elements stripe={stripePromise}>
        <CheckoutForm price={total} />
      </Elements>
    </div>
  );
};

export default Payment;
