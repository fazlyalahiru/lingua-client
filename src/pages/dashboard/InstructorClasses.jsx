import { useContext } from "react";
import { AuthContext } from "../../providerders/AuthProviders";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { deleteSpecificClass } from "../../apis/Classes";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";

const InstructorClasses = () => {
  const { user, loading } = useContext(AuthContext);
  const [AxiosSecure] = useAxiosSecure();
  const handleDeleteClass = (id) => {
    Swal.fire({
      title: "Become an instructor!",
      text: "You won't be able switch back to student account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4285f4",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, switch it",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteSpecificClass(id)
          .then(() => {
            toast.success("Class deleted from the list");
            refetch();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  // handle edit 
  const handleEditClass = () =>{

  }

  const { data:  InstructorClasses = [], refetch} = useQuery({
    queryKey: ["classes", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await AxiosSecure.get(`/classes/${user?.email}`);
      return res.data
    },
  });
  return (
    
      <div className="overflow-x-auto mx-2 md:mx-4">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="uppercase bg-[#4285f4] text-white text-center">
              <th>#</th>
              <th>Image</th>
              <th>Class name</th>
              <th>Available seat</th>
              <th>Price</th>
              <th>Student</th>
              <th>Status</th>
              <th>FeedBack</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {InstructorClasses.map((instructorClass, index) => (
              <tr className="text-center" key={index}>
              <th>{index + 1}</th>
              <td>
                <img
                  src={instructorClass.image}
                  alt=""
                  className="h-8 rounded-sm w-12"
                />
              </td>
              <td>{instructorClass.className}</td>
              <td>{instructorClass.totalSeat}</td>
              <td>${instructorClass.price}</td>
              <td>10</td>
              <td>
                <p className=" capitalize bg-green-200 p-1 rounded-md">
                  {instructorClass.status}
                </p>
              </td>
              <td><p>no feedack</p></td>
              <td>
                
                <div className="flex gap-2">
                    <button
                      className="text-red-500 btn btn-xs"
                      onClick={() => handleDeleteClass(instructorClass._id)}
                      >
                      Delete
                    </button>
                    <button
                      className="text-green-500 btn btn-xs"
                      onClick={() => handleEditClass(instructorClass._id)}
                      >
                      Edit
                    </button>
                  </div>
              </td>
            </tr>
              // <InstructorClassesSingleRow
              //   instructorClass={instructorClass}
              //   index={index}
              //   key={index}
              //   refetch={refetch}></InstructorClassesSingleRow>
            ))}
          </tbody>
        </table>
      </div>
    
  );
};

export default InstructorClasses;
