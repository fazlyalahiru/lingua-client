import { useContext } from "react";
import Container from "../../components/shared/Container";
import { AuthContext } from "../../providerders/AuthProviders";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
const MyEnrollClasses = () => {
  const [AxiosSecure] = useAxiosSecure();
  const { user, loading } = useContext(AuthContext);

  const { data: enrolls = [] } = useQuery({
    queryKey: [],
    enabled: !loading,
    queryFn: async () => {
      const res = await AxiosSecure.get(`/enrolled?email=${user?.email}`);
      return res.data;
    },
  });

  return (
    <Container>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="uppercase bg-[#4285f4] text-white">
              <th>#</th>
              
              <th>Class name</th>
              <th>Amount</th>
              <th>Time</th>
              <th>TRANSACTION ID</th>
              
            </tr>
          </thead>
          <tbody>
            {enrolls.map((enroll, index) => (
              <tr key={enroll._id}>
                <th>{index + 1}</th>
               
                <td>{enroll.className}</td>
                <td >$ {enroll.price}</td>
                <td>{enroll.sortedDate}</td>
                <td>${enroll.transactionId}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
};

export default MyEnrollClasses;
