import { useContext } from "react";
import { AuthContext } from "../../providerders/AuthProviders";
// import { getSpecificInstructorClasses } from "../../apis/Classes";
import Container from "../../components/shared/Container";
import InstructorClassesSingleRow from "../../components/dashboard/InstructorClassesSingleRow";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const InstructorClasses = () => {
  const { user, loading } = useContext(AuthContext);
  const [AxiosSecure] = useAxiosSecure();
  

  const { data:  InstructorClasses = [], refetch} = useQuery({
    queryKey: ["classes", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await AxiosSecure.get(`/classes/${user?.email}`);
      return res.data
    },
  });
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
                refetch={refetch}></InstructorClassesSingleRow>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
};

export default InstructorClasses;
