import React, { useContext } from "react";
import { AuthContext } from "../../providerders/AuthProviders";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

import { deleteSpecificClass, updateClassInfo } from "../../apis/Classes";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";

import { useState } from "react";
import { uploadImage } from "../../apis/imageUpload";
import { useForm } from "react-hook-form";

import UpdateClassInfoModal from "../../components/dashboard/UpdateClassInfoModal";

const InstructorClasses = () => {
  const { user, loading } = useContext(AuthContext);
  const [singleClassInfo, setSingleClassInfo] = useState({});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  let [isOpen, setIsOpen] = useState(false);
  const [AxiosSecure] = useAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const image = data.image[0];
    console.log(image);
    uploadImage(image).then((res) => {
      const classDetails = {
        instructorInfo: {
          name: user?.displayName,
          email: user?.email,
          photo: user?.photoURL,
        },
        className: data.className,
        price: parseFloat(data.price),
        totalSeat: parseFloat(data.totalSeat),
        image: res.data.display_url,
        enrolledStudent: 0,
      };
      console.log(classDetails);
    });
  };

  const handleDeleteClass = (id) => {
    Swal.fire({
      title: "Delete the class",
      text: "Are you sure you want to delete this class?",
      icon: "",
      showCancelButton: true,
      confirmButtonColor: "#4285f4",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteSpecificClass(id)
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

  // handle edit
  const handleEditClass = (instructorClass) => {
    // setSingleClassInfo(enroll);
    setIsOpen(true);
  };
  // const [isOpen, setIsOpen] = React.useState(false);
  function closeModal() {
    setIsOpen(false);
  }

  const { data: InstructorClasses = [], refetch } = useQuery({
    queryKey: ["classes", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await AxiosSecure.get(`/classes/${user?.email}`);
      return res.data;
    },
  });
  return (
    <div className="overflow-x-auto mx-2 md:mx-4">
      <table className="table">
        {/* head */}
        <thead>
          <tr className="uppercase bg-[#4285f4] text-white text-center">
            <th>#</th>
            <th>Image</th>
            <th>Class name</th>
            <th>Available seat</th>
            <th>Price</th>
            <th>Student</th>
            <th>Status</th>
            <th>FeedBack</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {InstructorClasses.map((instructorClass, index) => (
            <tr className="text-center" key={index}>
              <th>{index + 1}</th>
              <td>
                <img
                  src={instructorClass.image}
                  alt=""
                  className="h-8 rounded-sm w-12"
                />
              </td>
              <td>{instructorClass.className}</td>
              <td>{instructorClass.totalSeat}</td>
              <td>${instructorClass.price}</td>
              <td>{instructorClass.enrolledStudent}</td>
              <td>
                <p className=" capitalize bg-green-200 p-1 rounded-md">
                  {instructorClass.status}
                </p>
              </td>
              <td>
                <p>no feedack</p>
              </td>
              <td>
                <div className="flex gap-2">
                  <button
                    className="text-red-500 btn btn-xs"
                    onClick={() => handleDeleteClass(instructorClass._id)}>
                    Delete
                  </button>
                  <button
                    className="text-green-500 btn btn-xs"
                    onClick={() => setIsEditModalOpen(true)}>
                    Edit
                  </button>
                </div>
                <UpdateClassInfoModal
                  isOpen={isEditModalOpen}
                  closeModal={() => setIsEditModalOpen(false)}
                  instructorClass={instructorClass}
                  id={instructorClass._id}
                  setIsEditModalOpen={
                    setIsEditModalOpen
                  }></UpdateClassInfoModal>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InstructorClasses;
