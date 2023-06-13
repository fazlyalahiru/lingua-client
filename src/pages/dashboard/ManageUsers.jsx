import { useEffect, useState } from "react";
import Container from "../../components/shared/Container";
import { toast } from "react-hot-toast";
const ManageClasses = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/users`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("access-token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, [users]);

  //   handle Instructor
  const handleInstructor = (userId) => {
    fetch(`http://localhost:5000/users/instructor/${userId}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(),
    }).then(() => {
      toast.success("User role set to instructor");
    });
  };

  //   handle admin role 
  const handleAdmin = (userId) => {
    fetch(`http://localhost:5000/users/admin/${userId}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(),
    }).then(() => {
      toast.success("User role set to admin");
    });
  };

  return (
    <Container>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="uppercase bg-[#4285f4] text-white text-center">
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              
              <th>Current role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="text-center">
                <th>{index + 1}</th>

                <td>
                  <img
                    src={user.photo}
                    alt=""
                    className="h-8 rounded-full w-8"
                  />
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                
                <td className="capitalize">{user.role}</td>
                <td>
                  <div className="flex gap-2">
                    <button
                      className="text-green-500 btn btn-xs"
                      onClick={() => handleInstructor(user._id)}
                      disabled={user.role === "instructor"}>
                      Make Instructor
                    </button>
                    <button
                      className="text-red-500 btn btn-xs"
                      onClick={() => handleAdmin(user._id)}
                      disabled={user.role === "admin"}>
                      Make Admin
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
