import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import "@egjs/react-flicking/dist/flicking-inline.css";
import { useEffect, useState } from "react";
const TopInstructors = () => {
  const [instructors, setInstructors] = useState([]);
  console.log(instructors);
  useEffect(() => {
    fetch(`https://lingua-server.vercel.app/top-instructors`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setInstructors(data);
      });
  }, []);

  return (
    <Flicking
      align="prev"
      circular={true}
      onMoveEnd={(e) => {
        console.log(e);
      }}>
      {instructors.map((instructor, index) => (
        <div key={index} className="panel mx-2">
          <div className="relative">
            <img src={instructor.photo} alt="Image" className="w-80 md:h-72 h-80 "  />
            <div className="absolute inset-0 bottom-0 bg-gradient-to-t from-black to-transparent flex items-end justify-center py-4">
              <div>
                <h2 className="text-white text-2xl">{instructor.name}</h2>
                
                <h2 className="text-white ">{instructor.email}</h2>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Flicking>
  );
};

export default TopInstructors;
