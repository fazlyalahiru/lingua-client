import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "./CheckOutForm.css";
import { toast } from "react-hot-toast";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providerders/AuthProviders";

const CheckoutForm = ({ price }) => {
  const { user } = useContext(AuthContext);
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:5000/create-payment-intent", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ price }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      toast.error(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "anonymous",
            email: user?.email || "NA",
          },
        },
      });
    if (confirmError) {
      console.log(confirmError);
      toast.error(confirmError.message);
    } else {
      const updatedStatus = {
        status: 'approved',
      };
      console.log(updatedStatus);
    
      fetch(`http://localhost:5000/classes/${classInfo?.classId}`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(updatedStatus),
      })
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        type="submit"
        disabled={!stripe || !clientSecret}
        className="btn-block btn-sm bg-[#4285f4] text-white hover:bg-black capitalize hover:scale-105 transition-transform duration-300">
        Pay
      </button>
    </form>
  );
};
export default CheckoutForm;
