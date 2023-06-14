import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import { AuthContext } from "../../providerders/AuthProviders";
const ManageClasses = () => {
  const [users, setUsers] = useState([]);
  const {user} = useContext(AuthContext)

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
  const handleInstructor = (user) => {
    Swal.fire({
      title: "Make Instructor",
      text: `You want to make ${user.email} an instructor?`,
      icon: "",
      showCancelButton: true,
      confirmButtonColor: "#4285f4",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, do it",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://lingua-server.vercel.app/users/instructor/${user._id}`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(),
        }).then(() => {
          toast.success("User role set to instructor");
        });
      }
    });
  };

  //   handle admin role
  const handleAdmin = (user) => {
    Swal.fire({
      title: "Make Admin",
      text: `You want to make ${user.email} an admin?`,
      icon: "",
      showCancelButton: true,
      confirmButtonColor: "#4285f4",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://lingua-server.vercel.app/users/admin/${user._id}`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(),
        }).then(() => {
          toast.success("User role set to admin");
        });
      }
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
              <th>Name</th>
              <th>Email</th>

              <th>Current role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((singleUser, index) => (
              <tr key={singleUser._id} className="text-center">
                <th>{index + 1}</th>

                <td>
                  <img
                    src={singleUser.photo}
                    alt=""
                    className="h-8 rounded-full w-8"
                  />
                </td>
                <td>{singleUser.name}</td>
                <td>{singleUser.email}</td>

                <td className="capitalize">{singleUser.role}</td>
                <td>
                  <div className="flex gap-2">
                    <button
                      className="text-green-500 btn btn-xs"
                      onClick={() => handleInstructor(singleUser)}
                      disabled={singleUser.role === "instructor" || singleUser.email === user.email}>
                      Make Instructor
                    </button>
                    <button
                      className="text-red-500 btn btn-xs"
                      onClick={() => handleAdmin(singleUser)}
                      disabled={singleUser.role === "admin"}>
                      Make Admin
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
