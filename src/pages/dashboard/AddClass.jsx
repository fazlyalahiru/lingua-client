import { useContext } from "react";
import { AuthContext } from "../../providerders/AuthProviders";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { uploadImage } from "../../apis/imageUpload";
import { uploadClass } from "../../apis/Classes";


const AddClass = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const { user } = useContext(AuthContext);
  const handleImageUpload = () => {};
  const onSubmit = (data) => {
    const image = data.image[0];
    console.log(image);
    uploadImage(image).then((res) => {
      const classDetails = {
        instructorInfo: {
          name: user?.displayName,
          email: user?.email,
          photo: user?.photoURL,
        },
        className: data.className,
        price: parseFloat(data.price),
        totalSeat: parseFloat(data.totalSeat),
        image: res.data.display_url,
      };
      uploadClass(classDetails).then((res) => console.log(res)).catch(err=>console.log(err.message))
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="md:w-3/4 mx-auto">
        <div className="flex justify-center py-3 gap-2 ">
          <div className="space-y-1 text-sm w-1/2">
            <label className="block text-gray-600">Instructor name</label>
            <input
              className="w-full px-4 py-3 text-gray-800 border border-gray-200 focus:outline-gray-300 rounded-md capitalize"
              name="instructorName"
              type="text"
              {...register("instructorName", { required: true })}
              value={user?.displayName}
            />
          </div>

          <div className="space-y-1 text-sm w-1/2">
            <label className="block text-gray-600">Instructor email</label>
            <input
              className="w-full px-4 py-3 text-gray-800 border border-gray-200 focus:outline-gray-300 rounded-md "
              name="instructorEmail"
              type="email"
              {...register("instructorEmail", { required: true })}
              value={user?.email}
            />
          </div>
        </div>
        <div className="space-y-1 text-sm">
          <label className="block text-gray-600">Class name</label>
          <input
            className="w-full px-4 py-3 text-gray-800 border border-gray-200 focus:outline-gray-300 rounded-md capitalize"
            name="instructorName"
            type="text"
            {...register("className", { required: true })}
            placeholder="Enter class name"
          />
        </div>
        <div className="flex justify-center py-3 gap-2 ">
          <div className="space-y-1 text-sm w-1/2">
            <label className="block text-gray-600">Price</label>
            <input
              className="w-full px-4 py-3 text-gray-800 border border-gray-200 focus:outline-gray-300 rounded-md capitalize"
              name="price"
              type="number"
              {...register("price", { required: true })}
              placeholder="Enter price in $"
            />
          </div>

          <div className="space-y-1 text-sm w-1/2">
            <label className="block text-gray-600">Total seat</label>
            <input
              className="w-full px-4 py-3 text-gray-800 border border-gray-200 focus:outline-gray-300 rounded-md "
              name="instructorEmail"
              type="number"
              {...register("totalSeat", { required: true })}
              placeholder="Available seat"
            />
          </div>
        </div>
        {/* image upload */}

        <div className="flex flex-col items-center py-4 text-center border-4 border-dotted w-full ">
          <div className="flex items-center gap-2 py-4">
            <AiOutlineCloudUpload></AiOutlineCloudUpload>
            <p>Upload image</p>
          </div>
          <label>
            <div className=" w-full mx-auto">
              <input
                className="w-full ml-5 md:ml-12"
                onChange={(event) => {
                  handleImageUpload(event.target.files[0]);
                }}
                type="file"
                {...register("image", { required: true })}
                name="image"
                accept="image/*"
              />
            </div>
            {/* <div className="bg-[#4285f4] text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-[#4285f4]">
                  upload image
                </div> */}
          </label>
        </div>

        <div>
          <button className="w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-[#4285f4]">
            Upload class
          </button>
        </div>
      </form>
    </>
  );
};

export default AddClass;
