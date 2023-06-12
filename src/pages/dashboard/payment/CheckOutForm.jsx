import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "./CheckOutForm.css";
import { toast } from "react-hot-toast";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providerders/AuthProviders";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import moment from "moment/moment";
// import { toast } from "react-hot-toast";
import { deleteSelectedClass } from "../../../apis/bookClass";
import Swal from "sweetalert2";

const CheckoutForm = ({ singleClassInfo, closeModal, refetch }) => {
  const [axiosSecure] = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [paymentError, setPaymentError] = useState("");

  useEffect(() => {
    // // Create PaymentIntent as soon as the page loads
    // fetch("http://localhost:5000/create-payment-intent", {
    //   method: "POST",
    //   headers: { "content-type": "application/json" },
    //   body: JSON.stringify({ price }),
    // })
    //   .then((res) => res.json())
    //   .then((data) => setClientSecret(data.clientSecret));
    if (singleClassInfo?.price) {
      axiosSecure
        .post("create-payment-intent", {
          price: singleClassInfo?.price,
        })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [singleClassInfo, axiosSecure]);

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
      setClientSecret(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "unknown",
            email: user?.email || "anonymous",
          },
        },
      });
    if (confirmError) {
      setPaymentError(confirmError.message);
    } else {
      if (paymentIntent.status === "succeeded") {
        const PaymentInfo = {
          ...singleClassInfo,
          transactionId: paymentIntent.id,
          date: new Date().getTime(),
          sortedDate: moment().format("MMMM Do YYYY, h:mm:ss a"),
        };
        axiosSecure
          .post(`${import.meta.env.VITE_SERVER_URL}/enrolled`, PaymentInfo)
          .then((res) => {
            console.log("res from data insert in enroll collection", res);
            if (res.data.insertedId) {
              deleteSelectedClass(singleClassInfo._id).then((res) => {
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Your work has been saved",
                  showConfirmButton: false,
                  timer: 1500,
                });
                refetch()
                closeModal();
              });
            }
          });
      }
    }
  };

  return (
    <div>
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
      {paymentError && <p className="text-red-500">{paymentError}</p>}
    </div>
  );
};
export default CheckoutForm;
