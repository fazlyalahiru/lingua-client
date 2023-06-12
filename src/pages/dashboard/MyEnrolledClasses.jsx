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
              <tr key={enroll._id}>
                <th>{index + 1}</th>
                <td>
                  <img
                    src={enroll.image}
                    alt=""
                    className="h-8 rounded-sm w-12"
                  />
                </td>
                <td>{enroll.className}</td>
                <td className="capitalize">{enroll.instructorInfo.name}</td>
                <td>{enroll.totalSeat}</td>
                <td>${enroll.price}</td>
                <td>
                  <div className="flex gap-2">
                    <p className="capitalize bg-green-300 px-2 py-1 rounded-md">
                      Paid
                    </p>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
};

export default MyEnrollClasses;
