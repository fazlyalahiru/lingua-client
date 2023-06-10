import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { AuthContext } from "../../providerders/AuthProviders";
import { getSpecificInstructorClasses } from "../../apis/Classes";

const InstructorClasses = () => {
  const { user } = useContext(AuthContext);
  console.log(user.email);
  const [InstructorClasses, setInstructorClasses] = useState([]);
  useEffect(() => {
    getSpecificInstructorClasses(user?.email).then((data) =>
      setInstructorClasses(data)
    );
  }, [user]);
  return (
    <div>
      <h2>Instructor class list</h2>
      <h2>total data length: {InstructorClasses.length}</h2>
    </div>
  );
};

export default InstructorClasses;
