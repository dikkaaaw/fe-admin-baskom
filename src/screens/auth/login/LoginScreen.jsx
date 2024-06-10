import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  FaRegEye,
  FaEyeSlash,
  FaEnvelope,
  FaLock,
  FaGoogle,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import imgLogin from "../../../assets/images/img-login.jpg";
import imgLogo from "../../../assets/images/img-logo-2.png";
import "./Login.scss";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://baskom-api.up.railway.app/api/v1/login",
        {
          email,
          password,
        }
      );
      localStorage.setItem("token", response.data.token);
      setError("");
      toast.success("Login successful!", {
        closeOnClick: true,
        hideProgressBar: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      setError(error.response.data.message);
      toast.error("Login failed. Please try again.", {
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    if (error) {
      setError("");
    }
  };

  return (
    <div className="container">
      <ToastContainer />
      <img src={imgLogin} alt="image-login" className="image-login" />
      <div className="form-container">
        <form onSubmit={handleLogin}>
          <div className="form">
            <img src={imgLogo} alt="img-logo" className="img-logo" />
            <h1 className="text-title">Login to Admin</h1>
          </div>
          <div className="input-container">
            <div className="input-group">
              <span className="input-icon">
                <FaEnvelope />
              </span>
              <input
                type="text"
                id="email"
                value={email}
                onChange={handleInputChange(setEmail)}
                className="input"
                placeholder="Email"
                required
              />
            </div>
          </div>
          <div className="input-container">
            <div className="input-group">
              <span className="input-icon">
                <FaLock />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={handleInputChange(setPassword)}
                className="input"
                placeholder="Password"
                required
              />
              <span
                onClick={togglePasswordVisibility}
                className="password-toggle"
              >
                {showPassword ? <FaRegEye /> : <FaEyeSlash />}
              </span>
            </div>
          </div>
          {error && <p className="error">{error}</p>}
          <button className="submit-button" type="submit">
            Log In
          </button>
          <div className="divider">
            <p>─────</p>
            <p className="divider-text">Or</p>
            <p>─────</p>
          </div>
          <Link to="/dashboard">
            <button className="google-button" type="button">
              <FaGoogle className="google-icon" /> Sign in with Google
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
