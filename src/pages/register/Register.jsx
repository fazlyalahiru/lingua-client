import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { AuthContext } from "../../providerders/AuthProviders";
import { toast } from "react-hot-toast";
// import { HiEye, HiEyeOff } from "react-icons/hi";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { insertUser } from "../../apis/user";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { uploadImage } from "../../apis/imageUpload";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  // show or hide pass
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const { singnInWithGoogle, createUser, updateProfileInfo } =
    useContext(AuthContext);
  // confirm password
  const [passwordMatch, setPasswordMatch] = useState(true);
  const handleConfirmPasswordChange = (e) => {
    const confirmPassword = e.target.value;
    const { password } = watch(); // Access the value of the "password" field
    setPasswordMatch(confirmPassword === password);
  };

  // handle submit form
  // const onSubmit = (data) => {
  //   const image = data.image[0];
  //   uploadImage(image).then((res) => {
  //     createUser(data.email, data.password)
  //       .then((result) => {
  //         updateProfileInfo(data.name, data.photo)
  //           .then(() => {
  //             console.log(result.user.email);
  //             insertUser(result.user);
  //             toast.success("User created successfully");
  //             reset();
  //             navigate(from, { replace: true });
  //           })
  //           .catch((err) => {
  //             console.log(err);
  //             const errorMessage = err.message;
  //             toast.error(errorMessage);
  //           });
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         const errorMessage = err.message;
  //         toast.error(errorMessage);
  //       });
  //   });
  // };

  const onSubmit = (data) => {
    const image = data.image[0];
    uploadImage(image).then((res) => {
      const photoURL = res.data.display_url;
      const email = data.email;
      const password = data.password;
      const name = data.name;
      createUser(email, password)
        .then((result) => {
          updateProfileInfo(name, photoURL).then(() => {
            insertUser(result.user);
            toast.success("User created successfully!");
            reset();
            navigate(from, { replace: true });
          });
        })
        .catch((err) => {
          console.log(err);
          const errorMessage = err.message;
          toast.error(errorMessage);
        });
    });
  };

  // signin with google
  const handleSignInWithGoogle = () => {
    singnInWithGoogle()
      .then((response) => {
        insertUser(response.user);
        toast.success("User created successfully");
        navigate(from, { replace: true });
      })
      .catch((err) => {
        const errorMessage = err.message;
        toast.error(errorMessage);
      });
  };
  return (
    <div className=" grid md:grid-cols-3">
      <div></div>
      <div className=" py-6 rounded-md my-6 shadow-lg border mx-4 md:mx-1">
        <div className="mx-auto my-container  flex-col items-center gap-2 px-6">
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3">
            <h4 className="text-2xl text-center font-semibold">
              Please Register
            </h4>

            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="Your name"
              className="input border border-gray-300 w-full block"
            />
            {errors.name?.type === "required" && (
              <p className="text-red-500">Name is required</p>
            )}

            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Email"
              className="input border border-gray-300 w-full block"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500">Email is required</p>
            )}

            {/* <input
              type="url"
              {...register("photo", { required: true })}
              placeholder="Photo URL"
              className="input border border-gray-300 w-full block"
            />
            {errors.photo?.type === "required" && (
              <p className="text-red-500">Photo is required</p>
            )} */}

            {/* <input
              type="tel"
              {...register("phone")}
              placeholder="Phone number"
              className="input border border-gray-300 w-full block"
            />
            {errors.phone && (
              <span className="text-red-500">{errors.phone.message}</span>
            )} */}

            <select
              defaultValue="Gender"
              className="select select-bordered w-full "
              {...register("gender")}>
              <option disabled>Gender</option>
              <option>Male</option>
              <option>Female</option>
            </select>
            {errors.gender && (
              <span className="text-red-500">{errors.gender.message}</span>
            )}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 15,
                  pattern: /(?=.*[!@#$&*])(?=.*[0-9])(?=.*[A-Z])/,
                })}
                placeholder="Password"
                className="input border border-gray-300 w-full block"
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 transform -translate-y-1/2 focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <FiEyeOff size={15} className="text-gray-600" />
                ) : (
                  <FiEye size={15} className="text-gray-600" />
                )}
              </button>
            </div>
            {errors.password?.type === "required" && (
              <p className="text-red-500">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-600">Password must be 6 characters</p>
            )}
            {errors.password?.type === "maxLength" && (
              <p className="text-red-600">
                Password must be less than 15 characters
              </p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-600">
                Password should contain atleast 1 special character, number &
                uppercase letter
              </p>
            )}
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword", {
                  required: true,
                })}
                onChange={handleConfirmPasswordChange}
                placeholder="Confirm password"
                className={`input border  w-full block ${
                  !passwordMatch ? "border-red-500" : "border-gray-300"
                }`}
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 transform -translate-y-1/2 focus:outline-none"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? (
                  <FiEyeOff size={15} className="text-gray-600" />
                ) : (
                  <FiEye size={15} className="text-gray-600" />
                )}
              </button>
            </div>
            {!passwordMatch && (
              <span className="text-red-500">Password do not match!</span>
            )}
            {errors.confirmPassword && (
              <span className="text-red-500">
                {errors.confirmPassword.message}
              </span>
            )}

            <div className="flex flex-col items-center py-4 text-center border-4 border-dotted w-full ">
              <div className="flex items-center gap-2 py-4">
                <AiOutlineCloudUpload></AiOutlineCloudUpload>
                <p>Upload Profile image</p>
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
            {errors.image?.type === "required" && (
                <p className="text-red-500">Image field is required</p>
              )}

            <button
              className="shadow bg-[#42CBA8] hover:bg-black focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded w-full"
              type="submit">
              Register
            </button>
            <p>
              Already registered?
              <Link
                className="ms-2 text-[#42CBA8] hover:text-black"
                to="/login">
                Login
              </Link>
            </p>
          </form>

          <h4 className="mt-4 font-semibold text-center">- or -</h4>
          <div className="flex gap-4 py-2 justify-center">
            <div
              onClick={handleSignInWithGoogle}
              className="flex items-center gap-2 border rounded px-4 py-2 hover:bg-black hover:text-white cursor-pointer w-full justify-center">
              <FaGoogle />
              <button> Google</button>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Register;
