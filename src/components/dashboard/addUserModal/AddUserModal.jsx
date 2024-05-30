import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./addUserModal.module.scss";

const AddUserModal = ({ isOpen, onClose }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.post("/api/users", user, {
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
          onClose(); // Menutup modal setelah pesan sukses hilang
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
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                />
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
