import React, { useContext, useState } from "react";
import { deleteSelectedClass } from "../../apis/bookClass";
import { AuthContext } from "../../providerders/AuthProviders";
import { Transition, Dialog } from "@headlessui/react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./payment/CheckOutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Fragment } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
const stripePromise = loadStripe(`${import.meta.env.VITE_PAYMENT_PK}`);

const MySelectedClass = () => {
  // const [enrolls, setEnrolls] = useState([]);
  const [AxiosSecure] = useAxiosSecure();
  const { user, loading } = useContext(AuthContext);

  const { data: enrolls = [], refetch } = useQuery({
    queryKey: [],
    enabled: !loading,
    queryFn: async () => {
      const res = await AxiosSecure.get(`/cart?email=${user?.email}`);
      return res.data;
    },
  });

  // handle delete enroll
  const handleDeleteEnroll = (id) => {
    Swal.fire({
      title: "Become an instructor!",
      text: "You won't be able switch back to student account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4285f4",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, switch it",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteSelectedClass(id)
          .then(() => {
            toast.success("Class deleted from the list");
            refetch();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };
  const [singleClassInfo, setSingleClassInfo] = useState({});

  const handlePayButton = (enroll) => {
    setSingleClassInfo(enroll);
    setIsOpen(true);
  };
  // headless ui modal part code
  const [isOpen, setIsOpen] = React.useState(false);
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="uppercase bg-[#4285f4] text-white text-center">
              <th>#</th>
              <th>Image</th>
              <th>Class name</th>
              <th>Instructor</th>
              <th>Available seat</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {enrolls.map((enroll, index) => (
              <tr key={enroll._id} className="text-center">
                <th>{index + 1}</th>
                <td>
                  <img
                    src={enroll.image}
                    alt=""
                    className="h-8 rounded-sm w-12"
                  />
                </td>
                <td>{enroll.className}</td>
                <td className="capitalize">{enroll.instructorInfo.name}</td>
                <td>{enroll.totalSeat}</td>
                <td>${enroll.price}</td>
                <td>
                  <div className="flex gap-2">
                    <Link
                      onClick={() => handlePayButton(enroll)}
                      className="btn btn-sm capitalize bg-green-200 hover:bg-green-300">
                      Pay
                    </Link>
                    <button
                      onClick={() => handleDeleteEnroll(enroll._id)}
                      className="btn btn-sm capitalize bg-red-200 hover:bg-red-300">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all ">
                  <div className="flex justify-around">
                    <p></p>
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium text-center leading-6 text-gray-900">
                      Course Details
                    </Dialog.Title>
                    <p
                      onClick={closeModal}
                      className="cursor-pointer hover:text-red-600">
                      x
                    </p>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Name: {singleClassInfo?.className}
                    </p>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Price: ${singleClassInfo?.price}
                    </p>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Available seat: {singleClassInfo?.totalSeat}
                    </p>
                  </div>

                  <div className="mt-2">
                    <p className="text-sm text-gray-500 capitalize">
                      Instructor: {singleClassInfo?.instructorInfo?.name}
                    </p>
                  </div>
                  <hr className="mt-8 " />
                  <Elements stripe={stripePromise}>
                    <CheckoutForm
                      closeModal={closeModal}
                      singleClassInfo={singleClassInfo}
                      refetch={refetch}></CheckoutForm>
                  </Elements>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default MySelectedClass;
