import { useContext, useEffect, useState } from "react";
import Slider from "./Slider";
import Container from "../../components/shared/Container";
import { BsJournalBookmark } from "react-icons/bs";
import { FaUserCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../providerders/AuthProviders";
import TopInstructors from "./TopInstructors";
import SectionTitle from "../../components/utils/SectionTitle";
import Fade, { Reveal } from "react-awesome-reveal";

const Home = () => {
  const [topClasses, settopClasses] = useState([]);
  const { user } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState([]);

  useEffect(() => {
    fetch("https://lingua-server.vercel.app/top-classes")
      .then((res) => res.json())
      .then((data) => settopClasses(data));
  }, []);
  useEffect(() => {
    fetch(`https://lingua-server.vercel.app/is-admin?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setIsAdmin(data);
      });
  }, [user]);
  const handleNoUser = () => {
    toast.error("You must login to book class!");
  };
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
  return (
    <>
      <div className="slider-style">
        <Slider></Slider>
      </div>
      <div className="bg-shite dark:bg-[#0A1E33]">
        <Container>
          <div className="py-12">
            <Fade direction="left">
              <SectionTitle
                title="Top Class"
                subTitle="Check out out hand picked classes of this week"></SectionTitle>
            </Fade>
            <Reveal effect="fadeInUp">
              <div className="md:grid grid-cols-3 gap-6 py-4">
                {topClasses.map((topClass, index) => (
                  <div key={index}>
                    <div
                      className={`shadow rounded p-5 hover:shadow-md hover:scale-105 transition-transform duration-300 my-6 md:my-0 bg-white dark:bg-gray-200 ${
                        topClass.totalSeat <= 0 ? "bg-red-100" : "bg-white"
                      }`}>
                      <img
                        src={topClass.image}
                        alt=""
                        className="h-56 w-full"
                      />
                      <div className="border-b w-full flex gap-4 items-center py-4 justify-between">
                        <div className="flex justify-center items-center gap-2">
                          <img
                            className="rounded-full h-8 w-8 "
                            src={topClass?.instructorInfo?.photo}
                            alt="profile"
                            title={topClass?.instructorInfo?.name}
                          />
                          <div>
                            <p className="capitalize text-sm font-semibold text-gray-600">
                              {topClass?.instructorInfo?.name}
                            </p>
                          </div>
                        </div>
                        <p className="text-[#4285f4] text-xl font-semibold">
                          ${topClass.price}
                        </p>
                      </div>
                      <h2 className="text-lg font-semibold pt-2">
                        {topClass.className}
                      </h2>
                      <div className="flex justify-between items-center">
                        <p className="text-[#4285f4] text-xl font-semibold">
                          ${topClass.price}
                        </p>

                        <div>
                          <div className="flex  items-center gap-2 pt-4">
                            <BsJournalBookmark className="text-gray-800 text-sm"></BsJournalBookmark>
                            <p className="text-gray-800 text-sm">
                              Available seat: {topClass.totalSeat}
                            </p>
                          </div>
                          <div className="flex  items-center gap-2 pb-4 pt-1">
                            <FaUserCheck className="text-gray-800 text-sm"></FaUserCheck>
                            <p className="text-gray-800 text-sm">
                              Enrolled Students: {topClass.enrolledStudent}
                            </p>
                          </div>
                        </div>
                      </div>
                      {user ? (
                        <button
                          onClick={() => handleEnrollInfo(topClass)}
                          disabled={
                            topClass.instructorInfo.email === user?.email ||
                            topClass.totalSeat <= 0 ||
                            isAdmin.role === "admin"
                          }
                          className="btn btn-block btn-sm capitalize bg-[#4285f4] text-white hover:bg-black">
                          Book now
                        </button>
                      ) : (
                        <Link
                          to="/login"
                          onClick={handleNoUser}
                          disabled={
                            topClass.instructorInfo.email === user?.email ||
                            topClass.totalSeat <= 0
                          }
                          className="btn btn-block btn-sm capitalize bg-[#4285f4] text-white hover:bg-black">
                          Book now
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </div>

      <div className="pt-12 pb-20 px-6 bg-[#e9f8ff] dark:bg-[#013367]">
        <Container>
        <Fade direction="left">
          <SectionTitle
            title="Lingua Stats"
            subTitle="Check out what we have done so far"></SectionTitle>
          <div className="stats shadow w-full">
            <div className="stat place-items-center  bg-[#e9f8ff] dark:bg-gray-200">
              <div className="stat-title">Instructors</div>
              <div className="stat-value">20+</div>
            </div>

            <div className="stat place-items-center bg-[#e9f8ff] dark:bg-gray-200">
              <div className="stat-title">Languages</div>
              <div className="stat-value text-[#4285f4]">50+</div>
            </div>

            <div className="stat place-items-center bg-[#e9f8ff] dark:bg-gray-200">
              <div className="stat-title">Happy Students</div>
              <div className="stat-value">1000+</div>
            </div>
          </div>
          </Fade>
        </Container>
      </div>
      <div className="dark:bg-[#0A1E33]">
        <Container>
        <Fade direction="left">
          <div className=" py-12">
            <SectionTitle
              title="Top Instructors"
              subTitle="Here is our top picked instructors"></SectionTitle>
            <TopInstructors></TopInstructors>
          </div>
          </Fade>
        </Container>
      </div>
    </>
  );
};

export default Home;
