import { useContext, useEffect, useState } from "react";
import {getApprovedClasses } from "../../apis/Classes";
import Container from "../../components/shared/Container";
import { AuthContext } from "../../providerders/AuthProviders";
import { BsJournalBookmark } from "react-icons/bs";
import { toast } from "react-hot-toast";
import axios from "axios";

const Classes = () => {
  const [classes, setClasses] = useState([]);
  console.log(classes);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    getApprovedClasses().then((data) => {
      setClasses(data);
    });
  }, []);
  // useEffect(() => {
  //   // Fetch pending data
  //   axios.get('/classes?status=approved')
  //     .then(response => {
  //       setClasses(response.data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching pending data:', error);
  //     });
  // }, []);

  const handleEnrollInfo = (classInfo) => {
    console.log(classInfo);
    const enrolledClass = {
      ...classInfo,
      classId: classInfo._id,
      status: "pending",
      userInfo: {
        displayName: user?.displayName,
        email: user?.email,
      },
    };
    fetch("http://localhost:5000/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(enrolledClass),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.insertedId) {
          toast.success("Added! Confirm payment to confirm your seat");
        } else {
          toast.error("You already Added this class");
        }
      });
  };

  return (
    <>
      <Container>
        <div className="md:grid grid-cols-4 gap-4 py-4">
          {classes.map((className, index) => (
            <div key={index}>
              <div className="shadow rounded p-5 hover:shadow-md hover:scale-105 transition-transform duration-300 my-6 md:my-0">
                <img src={className.image} alt="" />
                <div className="border-b w-full flex gap-4 items-center py-4 ">
                  <img
                    className="rounded-full h-8 w-8 "
                    src={user?.photoURL}
                    alt="profile"
                    title={user?.displayName}
                  />
                  <div>
                    <p className="capitalize text-sm font-semibold text-gray-600">
                      {user?.displayName}
                    </p>
                  </div>
                </div>
                <h2 className="text-lg font-semibold pt-2">
                  {className.className}
                </h2>
                <div className="flex justify-between items-center">
                  <p className="text-[#4285f4] text-xl font-semibold">
                    ${className.price}
                  </p>

                  <div className="flex justify-center items-center gap-2 py-4">
                    <BsJournalBookmark className="text-gray-500 text-sm"></BsJournalBookmark>
                    <p className="text-gray-500 text-sm">
                      Available seat: {className.totalSeat}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleEnrollInfo(className)}
                  disabled={className.instructorInfo.email === user?.email}
                  className="btn btn-block btn-sm capitalize bg-[#4285f4] text-white hover:bg-black">
                  Book now
                </button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
};

export default Classes;
