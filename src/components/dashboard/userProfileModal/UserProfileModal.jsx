import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./userProfileModal.module.scss";

const UserProfileModal = ({ isOpen, onClose }) => {
  const [user, setUser] = useState({});
  const [updatedUser, setUpdatedUser] = useState({
    name: "",
    phoneNumber: "",
    address: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `https://baskom-api.up.railway.app/api/v1/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(response.data);
        setUpdatedUser({
          name: response.data.name,
          phoneNumber: response.data.phone_number,
          address: response.data.address,
        });
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.put(
        `https://baskom-api.up.railway.app/api/v1/profile`,
        {
          name: updatedUser.name,
          phoneNumber: updatedUser.phoneNumber,
          address: updatedUser.address,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Changes saved successfully!", {
        autoClose: 1500,
        closeOnClick: true,
        hideProgressBar: true,
        pauseOnHover: false,
        onClose: () => window.location.reload(),
      });
    } catch (error) {
      console.error("Error updating user data: ", error);
      toast.error("Failed to save changes.", {
        autoClose: 1500,
        closeOnClick: true,
        hideProgressBar: true,
        pauseOnHover: false,
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const avatarUrl = `https://ui-avatars.com/api/?background=random&size=512&name=${user.name}`;

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <ToastContainer />
      <div className={styles.modalContent}>
        <button className={styles.modalCloseBtn} onClick={onClose}>
          &times;
        </button>
        <h3>Profile</h3>
        <div className={styles.avatarSection}>
          <img src={avatarUrl} alt="avatar" className={styles.avatar} />
        </div>
        <form onSubmit={handleSaveChanges}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={updatedUser.name}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
              disabled
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="phone-number">Phone Number</label>
            <div className={styles.inputGroup}>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={updatedUser.phoneNumber}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="address">Address</label>
            <textarea
              id="address"
              name="address"
              value={updatedUser.address}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" className={styles.saveBtn}>
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

UserProfileModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default UserProfileModal;
