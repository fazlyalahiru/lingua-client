import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { AuthContext } from "../../providerders/AuthProviders";
import { getSpecificInstructorClasses } from "../../apis/Classes";
import Container from "../../components/shared/Container";
import InstructorClassesSingleRow from "../../components/dashboard/InstructorClassesSingleRow";

const InstructorClasses = () => {
  const { user } = useContext(AuthContext);
  console.log(user.email);
  const [InstructorClasses, setInstructorClasses] = useState([]);
  const updateUiAfterDelete = () => {
    getSpecificInstructorClasses(user?.email).then((data) => {
        setInstructorClasses(data);
    });
  };

  useEffect(() => {
    getSpecificInstructorClasses(user?.email).then((data) =>
      setInstructorClasses(data)
    );
  }, [user]);
  return (
    <Container>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="uppercase bg-gray-100">
              <th>#</th>
              <th>Image</th>
              <th>Class name</th>
             
              <th>Available seat</th>
              <th>Price</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {InstructorClasses.map((instructorClass, index) => (
              <InstructorClassesSingleRow
              instructorClass={instructorClass}
                index={index}
                key={index}
                updateUiAfterDelete={
                  updateUiAfterDelete
                }></InstructorClassesSingleRow>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
};

export default InstructorClasses;
