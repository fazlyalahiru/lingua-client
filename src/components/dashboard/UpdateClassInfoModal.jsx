import { Dialog, Transition } from "@headlessui/react";

import { AiOutlineCloudUpload } from "react-icons/ai";
import { uploadImage } from "../../apis/imageUpload";
import { useForm } from "react-hook-form";
import { Fragment } from "react";
import { useContext } from "react";
import { AuthContext } from "../../providerders/AuthProviders";
import { useState } from "react";

const UpdateClassInfoModal = ({
  setIsEditModalOpen,
  isOpen,
  instructorClass,
  id,
}) => {
  const { user } = useContext(AuthContext);
  const [classInfo, setClassInfo] = useState(instructorClass)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
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
        enrolledStudent: 0,
      };
      console.log(classDetails);
    });
  };
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={(event) => {
          event.stopPropagation();
          setIsEditModalOpen(false);
        }}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all ">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium text-center leading-6 text-gray-900">
                  Update class info
                </Dialog.Title>
                <button
                  className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                  onClick={() => setIsEditModalOpen(false)}>X</button>
                {/*
                 */}
                <div>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="md:w-3/4 mx-auto">
                    <div className="flex justify-center py-3 gap-2 ">
                      <div className="space-y-1 text-sm w-1/2">
                        <label className="block text-gray-600">
                          Instructor name
                        </label>
                        <input
                          className="w-full px-4 py-3 text-gray-800 border border-gray-200 focus:outline-gray-300 rounded-md capitalize"
                          name="instructorName"
                          type="text"
                          {...register("instructorName", { required: true })}
                          value={user?.displayName}
                        />
                      </div>

                      <div className="space-y-1 text-sm w-1/2">
                        <label className="block text-gray-600">
                          Instructor email
                        </label>
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
                        <label className="block text-gray-600">
                          Total seat
                        </label>
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
                            type="file"
                            {...register("image", { required: true })}
                            name="image"
                            accept="image/*"
                          />
                        </div>
                      </label>
                    </div>

                    <div>
                      <button className="w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-[#4285f4]">
                        Upload class
                      </button>
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default UpdateClassInfoModal;
