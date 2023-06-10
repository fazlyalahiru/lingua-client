import { toast } from "react-hot-toast";
import { deleteSpecificEnroll, updateUi } from "../../apis/bookClass";
import Swal from "sweetalert2";

const StudentEnrollsSingleRow = ({ enroll, index, updateUiAfterDelete }) => {
  console.log(enroll);

  const handleDeleteEnroll = (id) => {
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
        deleteSpecificEnroll(id)
          .then((data) => {
            console.log(data);
            toast.success("Class deleted from the list");
            updateUiAfterDelete();
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
        <img src={enroll.image} alt="" className="h-8 rounded-sm w-12" />
      </td>
      <td>{enroll.className}</td>
      <td className="capitalize">{enroll.instructorInfo.name}</td>
      <td>{enroll.totalSeat}</td>
      <td>${enroll.price}</td>
      <td>
        <div className="flex gap-2">
          <button className="btn btn-sm capitalize bg-green-200 hover:bg-green-300">
            Pay
          </button>
          <button
            onClick={() => handleDeleteEnroll(enroll._id)}
            className="btn btn-sm capitalize bg-red-200 hover:bg-red-300">
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default StudentEnrollsSingleRow;
