import { useEffect, useState } from "react";
import Container from "../../components/shared/Container";
import { toast } from "react-hot-toast";
const ManageClasses = () => {
  const [enrolls, setEnrolls] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/classes`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("access-token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setEnrolls(data));
  }, [enrolls]);

  //   handle approve class
  const handleApproveClass = (classId) => {
    fetch(`http://localhost:5000/classes/approve/${classId}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem('access-token')}`
      },
      body: JSON.stringify(),
    }).then(() => {
      toast.success("Class approved");
    });
  };

  //   handle deniyed class
  const handleDeniedClass = (classId) => {
    fetch(`http://localhost:5000/classes/deny/${classId}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(),
    }).then(() => {
      toast.error("Class denied");
    });
  };

  return (
    <Container>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="uppercase bg-[#4285f4] text-white">
              <th>#</th>
              <th>Image</th>
              <th>Class name</th>
              <th>Amount</th>
              <th>Instructor name</th>
              <th>Status</th>
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
                <td>${enroll.price}</td>
                <td className="capitalize">{enroll?.instructorInfo?.name}</td>
                <td className="capitalize">{enroll.status}</td>
                <td>
                  <div className="flex gap-2">
                    <button
                      className="text-green-500 btn btn-xs"
                      onClick={() => handleApproveClass(enroll._id)}
                      disabled={enroll.status === "approved"}>
                      approve
                    </button>
                    <button
                      className="text-red-500 btn btn-xs"
                      onClick={() => handleDeniedClass(enroll._id)}
                      disabled={enroll.status === "denied"}>
                      Deny
                    </button>
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

export default ManageClasses;
