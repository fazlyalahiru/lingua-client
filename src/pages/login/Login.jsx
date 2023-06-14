import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { AuthContext } from "../../providerders/AuthProviders";
import { toast } from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { insertUser } from "../../apis/user";

const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'
  // show or hide pass
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, singnInWithGoogle } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmitButton = (data) => {
    signIn(data.email, data.password)
      .then(() => {
        reset();
        toast.success("You signed in!");
        navigate(from, { replace: true })
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  // google singnin
  // signin with google
  const handleSignInWithGoogle = () => {
    singnInWithGoogle()
      .then((response) => {
        insertUser(response.user);
        toast.success("User created successfully");
        navigate(from, { replace: true })
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
          <form onSubmit={handleSubmit(onSubmitButton)} className="grid gap-3">
            <h4 className="text-2xl text-center font-semibold">Please login</h4>

            <input
              type="email"
              {...register("email", { required: true })}
              name="email"
              placeholder="Email"
              className="input border border-gray-300 w-full block"
            />

            {errors.email?.type === "required" && (
              <p className="text-red-500">Email is required</p>
            )}
            <div className="relative z-0">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 15,
                  pattern: /(?=.*[!@#$&*])(?=.*[0-9])/,
                })}
                name="password"
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
                Password should contain atleast 1 special carecter and number
              </p>
            )}

            <button
              className="shadow bg-[#4285f4] hover:bg-black focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded w-full"
              type="submit">
              Sign In
            </button>
            <p>
              Not a member yet?
              <Link
                className="ms-2 text-[#4285f4] hover:text-black"
                to="/register">
                Register
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

export default Login;
