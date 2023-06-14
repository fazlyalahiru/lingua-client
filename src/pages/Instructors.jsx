import { useEffect, useState } from "react";
import Container from "../components/shared/Container";
import PageTitle from "../components/utils/PageTitle";

const Instructors = () => {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    fetch(`https://lingua-server.vercel.app/instructors`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setInstructors(data);
      });
  }, []);
  return (
    <Container>
      <PageTitle title="Experienced Instructors" subTitle="Find country best instructors on your hand"></PageTitle>
      <div className="md:grid grid-cols-4 gap-4 py-4">
        {instructors.map((instructor, index) => (
          <div key={index}>
            <div className="shadow rounded p-5 hover:shadow-md hover:scale-105 transition-transform duration-300 my-6 md:my-0">
              <img className="h-64 w-full" src={instructor.photo} alt="" />
              <p className=" text-xl font-semibold text-black capitalize pt-4">
                {instructor?.name}
              </p>
              <h2 className="text-lg font-xs text-gray-600 pt-1 pb-4">
                {instructor?.email}
              </h2>

              <button className="btn btn-block btn-sm capitalize bg-[#4285f4] text-white hover:bg-black">
                See all class
              </button>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Instructors;
