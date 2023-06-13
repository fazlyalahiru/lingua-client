import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
const ManageClasses = () => {
  const [enrolls, setEnrolls] = useState([]);

  const fetchEnrolls = () => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/classes`)
      .then((res) => res.json())
      .then((data) => setEnrolls(data));
  };

  useEffect(() => {
    fetchEnrolls();
  }, []);

  //   handle approve class
  const handleApproveClass = (classId) => {
    fetch(`http://localhost:5000/classes/approve/${classId}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(),
    }).then(() => {
      toast.success("Class approved");
      fetchEnrolls();
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
      fetchEnrolls();
    });
  };

  return (
    
      <div className="overflow-x-auto mx-2 md:mx-4">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="uppercase bg-[#4285f4] text-white text-center">
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
              <tr key={enroll._id} className="text-center">
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
    
  );
};

export default ManageClasses;
