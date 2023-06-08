import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
  return (
    <div className=" grid md:grid-cols-3">
      <div></div>
      <div className=" py-6 rounded-md my-6 shadow-lg border mx-4 md:mx-1">
        <div className="mx-auto my-container  flex-col items-center gap-2 px-6">
          <form className="grid gap-3">
            <h4 className="text-2xl text-center font-semibold">Please login</h4>
            {/* {error && (
              <div className="flex w-full bg-red-700 items-center justify-between md:px-6 px-2 text-sm md:text-base rounded">
                <p className=" text-white  py-2 rounded">{error}</p>
                <FaTimes
                  className="text-white cursor-pointer"
                //   onClick={handleError}
                  ></FaTimes>
              </div>
            )} */}
            <input
              //   onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
              placeholder="Email"
              className="input border border-gray-300 w-full block"
            />
            <input
              //   onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              placeholder="Password"
              className="input border border-gray-300 w-full block"
            />
            <button
              //   onClick={handleSignIn}
              className="shadow bg-[#42CBA8] hover:bg-black focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded w-full"
              type="button">
              Sign In
            </button>
            <p>
              Not a member yet?
              <Link
                className="ms-2 text-[#42CBA8] hover:text-black"
                to="/register">
                Register
              </Link>
            </p>
          </form>
          
            <h4 className="mt-4 font-semibold text-center">- or -</h4>
            <div className="flex gap-4 py-2 justify-center">
              <div
                // onClick={handleloginWithGoogle}
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
