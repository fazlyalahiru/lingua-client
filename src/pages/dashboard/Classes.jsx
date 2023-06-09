import { useEffect, useState } from "react";
import { getAllClasses } from "../../apis/Classes";

const Classes = () => {
    const [classes, setClasses] = useState([])
  useEffect(() => {
    getAllClasses()
      .then((data) =>{
        setClasses(data)
      })
      
  }, []);
  return <div>
    {classes.length}
  </div>;
};

export default Classes;
