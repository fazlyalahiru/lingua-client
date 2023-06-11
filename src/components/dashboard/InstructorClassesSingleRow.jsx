import { toast } from "react-hot-toast";
import { deleteSpecificClass } from "../../apis/Classes";
import Swal from "sweetalert2";

const InstructorClassesSingleRow = ({ instructorClass, index, refetch }) => {
  console.log(instructorClass);
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
  return (
    <tr>
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
      <td>
        <button className="btn btn-sm capitalize bg-green-200 hover:bg-green-300">
          Pending
        </button>
      </td>
      <td>
        <button
          onClick={() => handleDeleteClass(instructorClass._id)}
          className="btn btn-sm capitalize bg-red-200 hover:bg-red-300">
          Delete
        </button>
      </td>
    </tr>
  );
};

export default InstructorClassesSingleRow;
