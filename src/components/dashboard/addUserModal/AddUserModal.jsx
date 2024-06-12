import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { toast, ToastContainer } from "react-toastify";
import styles from "./addUserModal.module.scss";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

const AddUserModal = ({ isOpen, onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    let formErrors = {};
    if (!user.name) formErrors.name = "Name is required!";
    if (!user.email) formErrors.email = "Email is required!";
    else if (!/\S+@\S+\.\S+/.test(user.email))
      formErrors.email = "Invalid email format!";
    if (!user.password) formErrors.password = "Password is required!";
    else if (user.password.length < 8)
      formErrors.password = "Password must be at least 8 characters long!";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    const token = localStorage.getItem("token");
    try {
      await axios.post("https://baskom-api.up.railway.app/api/v1/users", user, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Create user successfully!", {
        autoClose: 1500,
        closeOnClick: true,
        hideProgressBar: true,
        pauseOnHover: false,
        onClose: () => {
          onClose();
          window.location.reload();
        },
      });
    } catch (error) {
      console.error("Error adding user: ", error);
      toast.error("Failed to save changes.", {
        autoClose: 1500,
        closeOnClick: true,
        hideProgressBar: true,
        pauseOnHover: false,
      });
    }
  };

  return (
    <>
      {isOpen && (
        <div className={styles.modalOverlay}>
          <ToastContainer />
          <div className={styles.modalContent}>
            <button
              className={styles.modalCloseBtn}
              onClick={() => onClose(false)}
            >
              &times;
            </button>
            <h3>Add New User</h3>

            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                />
                {errors.name && <p className={styles.error}>{errors.name}</p>}
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                />
                {errors.email && <p className={styles.error}>{errors.email}</p>}
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="password">Password</label>
                <div className={styles.passwordContainer}>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                  />
                  <span
                    className={styles.passwordToggle}
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaRegEye />}
                  </span>
                </div>
                {errors.password && (
                  <p className={styles.error}>{errors.password}</p>
                )}
              </div>
              <button type="submit" className={styles.saveBtn}>
                Add User
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

AddUserModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddUserModal;
