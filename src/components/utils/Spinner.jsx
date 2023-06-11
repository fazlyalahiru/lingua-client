import { useState } from "react";
import { SyncLoader } from "react-spinners";

const Spinner = () => {
  let [color, setColor] = useState("#4285f4");
  return (
    <div
      className="
      h-[70vh]
      flex 
      flex-col 
      justify-center 
      items-center 
    ">
      <SyncLoader size={15} color={color} />
    </div>
  );
};

export default Spinner;
