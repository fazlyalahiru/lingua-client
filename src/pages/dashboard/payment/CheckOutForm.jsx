import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "./CheckOutForm.css";
import { toast } from "react-hot-toast";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providerders/AuthProviders";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import moment from "moment/moment";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { deleteSelectedClass } from "../../../apis/bookClass";
import { updateClassSeat } from "../../../apis/Classes";

const CheckoutForm = ({ singleClassInfo, closeModal, refetch }) => {
  const [axiosSecure] = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [paymentError, setPaymentError] = useState("");
  const [paymentLoading, setPaymentLoading] = useState(false);

  useEffect(() => {
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
    setPaymentLoading(true);
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
            if (res.data.insertedId) {
              deleteSelectedClass(singleClassInfo._id).then((res) => {
                setPaymentLoading(false);
                toast.success("Payment successfull");
                refetch();
                closeModal();
                console.log(singleClassInfo);
                updateClassSeat(singleClassInfo.classId).then((res) => {
                  console.log(res);
                });
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
          disabled={!stripe || !clientSecret || paymentLoading}
          className="btn-block btn-sm bg-[#4285f4] text-white hover:bg-black capitalize hover:scale-105 transition-transform duration-300">
          {paymentLoading ? (
            <AiOutlineLoading3Quarters
              className="m-auto animate-spin"
              size={24}></AiOutlineLoading3Quarters>
          ) : (
            `Pay ${singleClassInfo.price}$`
          )}
        </button>
      </form>
      {paymentError && <p className="text-red-500">{paymentError}</p>}
    </div>
  );
};
export default CheckoutForm;
