import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaRegEye,
  FaEyeSlash,
  FaEnvelope,
  FaLock,
  FaGoogle,
} from "react-icons/fa";
import imgLogin from "../assets/img-login.jpg";
import imgLogo from "../assets/img-logo-2.png";

const Login = () => {
  const [error] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <img
        src={imgLogin}
        alt="image-login"
        className="items-center justify-center hidden object-cover w-2/5 h-full lg:flex md:flex bg-slate-800 opacity-80"
      />
      <div className="flex items-center justify-center w-3/5">
        <form>
          <div className="flex flex-col items-center justify-center">
            <img src={imgLogo} alt="img-logo" className="w-20 mb-8" />
            <h1
              style={{ marginBottom: "70px" }}
              className="text-2xl font-bold text-center text-purple-700 font-poppins"
            >
              Login to Admin
            </h1>
          </div>
          <div className="relative flex flex-wrap items-center mb-4 rounded-2xl">
            <div className="relative w-full">
              <span
                className="absolute inset-y-0 flex items-center left-3"
                style={{ marginTop: "0.375rem", opacity: "30%" }}
              >
                <FaEnvelope style={{ marginBottom: "0.125rem" }} />
              </span>
              <input
                type="text"
                id="email"
                // value={email}
                // onChange={(e) => setEmail(e.target.value)}
                className="flex-shrink flex-grow text-sm mt-1 w-full p-2 pl-10 border lg:w-[500px] md:w-[400px] rounded-2xl font-poppins"
                placeholder="Email"
                required
              />
            </div>
          </div>

          <div className="relative flex flex-wrap items-center rounded-2xl">
            <div className="relative w-full">
              <span
                className="absolute inset-y-0 flex items-center left-3"
                style={{ marginTop: "0.375rem" }}
              >
                <FaLock style={{ marginBottom: "0.125rem", opacity: "30%" }} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                id="search"
                // value={password}
                // onChange={(e) => setPassword(e.target.value)}
                className="flex-shrink flex-grow text-sm mt-1 w-full p-2 pl-10 border lg:w-[500px] md:w-[400px] rounded-2xl font-poppins"
                placeholder="Password"
                required
              />
              <span
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
              >
                {showPassword ? <FaRegEye /> : <FaEyeSlash />}
              </span>
            </div>
          </div>

          {error && (
            <p className="mt-2 text-sm text-center text-red-500">{error}</p>
          )}
          <Link to="/dashboard">
            <button
              className="text-white w-full font-bold text-sm h-[50px] mt-8 rounded-xl bg-purple-700 hover:bg-purple-800 transition duration-700 ease-in-out font-poppins"
              type="submit"
            >
              Log In
            </button>
          </Link>
          <div className="flex justify-center mt-4 mb-4">
            <p>─────</p>
            <p className="me-2 ms-2 font-poppins">Or</p>
            <p>─────</p>
          </div>
          <Link to="/dashboard">
            <button
              className="text-black w-full font-bold text-sm h-[50px] mt-2 rounded-xl bg-white border border-slate-900 hover:bg-slate-900 hover:text-white transition duration-700 ease-in-out flex items-center justify-center font-poppins"
              type="submit"
            >
              <FaGoogle className="mr-4" /> Sign in with Google
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
