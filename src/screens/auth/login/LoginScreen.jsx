import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaRegEye,
  FaEyeSlash,
  FaEnvelope,
  FaLock,
  FaGoogle,
} from "react-icons/fa";
import imgLogin from "../../../assets/images/img-login.jpg";
import imgLogo from "../../../assets/images/img-logo-2.png";
import "./Login.scss";

const Login = () => {
  const [error] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container">
      <img src={imgLogin} alt="image-login" className="image-login" />
      <div className="form-container">
        <form>
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
                // value={email}
                // onChange={(e) => setEmail(e.target.value)}
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
                id="search"
                // value={password}
                // onChange={(e) => setPassword(e.target.value)}
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
          <Link to="/dashboard">
            <button className="submit-button" type="submit">
              Log In
            </button>
          </Link>
          <div className="divider">
            <p>─────</p>
            <p className="divider-text">Or</p>
            <p>─────</p>
          </div>
          <Link to="/dashboard">
            <button className="google-button" type="submit">
              <FaGoogle className="google-icon" /> Sign in with Google
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
