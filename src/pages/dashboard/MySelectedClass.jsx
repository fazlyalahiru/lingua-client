import { useContext, useEffect, useState } from "react";
import Container from "../../components/shared/Container";
import { specificStudentEnrolls } from "../../apis/bookClass";
import { AuthContext } from "../../providerders/AuthProviders";
import StudentEnrollsSingleRow from "../../components/dashboard/StudentEnrollsSingleRow";

const MySelectedClass = () => {
  const [enrolls, setEnrolls] = useState([]);
  const { user } = useContext(AuthContext);
  const updateUiAfterDelete = () => {
    specificStudentEnrolls(user?.email).then((data) => {
      setEnrolls(data);
    });
  };

  useEffect(() => {
    specificStudentEnrolls(user?.email).then((result) => setEnrolls(result));
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
              <th>Instructor</th>
              <th>Available seat</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {enrolls.map((enroll, index) => (
              <StudentEnrollsSingleRow
                enroll={enroll}
                index={index}
                key={index}
                updateUiAfterDelete={
                  updateUiAfterDelete
                }></StudentEnrollsSingleRow>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
};

export default MySelectedClass;
