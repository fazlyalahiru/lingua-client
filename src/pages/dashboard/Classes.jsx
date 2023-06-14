import { useContext, useEffect, useState } from "react";
import { getApprovedClasses } from "../../apis/Classes";
import Container from "../../components/shared/Container";
import { AuthContext } from "../../providerders/AuthProviders";
import { BsJournalBookmark } from "react-icons/bs";
import { toast } from "react-hot-toast";
import { FaUserCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import PageTitle from "../../components/utils/PageTitle";

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const { user } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState([])
 
  useEffect(() => {
    getApprovedClasses().then((data) => {
      setClasses(data);
    });
  }, []);
  useEffect(() => {
    fetch(`https://lingua-server.vercel.app/is-admin?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setIsAdmin(data);
      });
  }, [user]);

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
    fetch("https://lingua-server.vercel.app/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(enrolledClass),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.insertedId) {
          toast.success("Added! Confirm payment to continue");
        } else {
          toast.error("You already Added this class");
        }
      });
  };

  const handleNoUser = () => {
    toast.error("You must login to book class!");
  };

  return (
    <>
      <Container>
        <PageTitle title="All Classes" subTitle="Find Amazing language classes"></PageTitle>
        <div className="md:grid grid-cols-4 gap-4 py-4">
          {classes.map((className, index) => (
            <div key={index}>
              <div
                className={`shadow rounded p-5 hover:shadow-md hover:scale-105 transition-transform duration-300 my-6 md:my-0 ${
                  className.totalSeat <= 0 ? "bg-red-100" : "bg-white"
                }`}>
                <img src={className.image} alt="" />
                <div className="border-b w-full flex gap-4 items-center py-4 justify-between">
                  <div className="flex justify-center items-center gap-2">
                    <img
                      className="rounded-full h-8 w-8 "
                      src={className?.instructorInfo?.photo}
                      alt="profile"
                      title={className?.instructorInfo?.name}
                    />
                    <div>
                      <p className="capitalize text-sm font-semibold text-gray-600">
                        {className?.instructorInfo?.name}
                      </p>
                    </div>
                  </div>
                  <p className="text-[#4285f4] text-xl font-semibold">
                    ${className.price}
                  </p>
                </div>
                <h2 className="text-lg font-semibold pt-2">
                  {className.className}
                </h2>
                <div className="flex items-center justify-between py-3">
                  <div className="flex  items-center gap-2 ">
                    <BsJournalBookmark className="text-gray-800 text-sm"></BsJournalBookmark>
                    <p className="text-gray-800 text-sm">
                      Available seat: {className.totalSeat}
                    </p>
                  </div>
                  <div className="flex  items-center gap-2  ">
                    <FaUserCheck className="text-gray-800 text-sm"></FaUserCheck>
                    <p className="text-gray-800 text-sm">
                      Enrolled: {className.enrolledStudent}
                    </p>
                  </div>
                </div>
                {user ? (
                  <button
                    onClick={() => handleEnrollInfo(className)}
                    disabled={
                      className.instructorInfo.email === user?.email ||
                      className.totalSeat <= 0 || isAdmin.role === 'admin'
                    }
                    className="btn btn-block btn-sm capitalize bg-[#4285f4] text-white hover:bg-black">
                    Book now
                  </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={handleNoUser}
                    disabled={
                      className.instructorInfo.email === user?.email ||
                      className.totalSeat <= 0
                    }
                    className="btn btn-block btn-sm capitalize bg-[#4285f4] text-white hover:bg-black">
                    Book now
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
};

export default Classes;
