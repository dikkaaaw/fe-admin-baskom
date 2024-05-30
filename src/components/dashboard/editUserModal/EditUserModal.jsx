import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./editUserModal.module.scss";

const EditUserModal = ({ isOpen, onClose, userId }) => {
  const [errors, setErrors] = useState({});
  const [updatedUser, setUpdatedUser] = useState({
    name: "",
    email: "",
    phone_number: "",
    roles: "",
    address: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUpdatedUser(response.data);
        console.log(response);
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    if (isOpen && userId) {
      fetchData();
    }
  }, [isOpen, userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberRegex = /^\d+$/;
    return phoneNumberRegex.test(phoneNumber);
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const newErrors = {};
    if (!validatePhoneNumber(updatedUser.phone_number)) {
      newErrors.phone_number = "Phone number must be numeric.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      await axios.put(`/api/users/${userId}`, updatedUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Changes saved successfully!", {
        autoClose: 1500,
        closeOnClick: true,
        hideProgressBar: true,
        pauseOnHover: false,
        onClose: () => window.location.reload(),
      });
    } catch (error) {
      console.error("Error updating user data: ", error);
      toast.error("Failed to save changes.");
    }
  };

  const avatarUrl = `https://ui-avatars.com/api/?background=random&size=512&name=${encodeURIComponent(updatedUser.name)}`;

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <ToastContainer />
      <div className={styles.modalContent}>
        <button className={styles.modalCloseBtn} onClick={onClose}>
          &times;
        </button>
        <h3>Edit User Details</h3>
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
              value={updatedUser.email}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="phone-number">Phone Number</label>
            <div className={styles.inputGroup}>
              <span className={styles.countryCode}>+62</span>
              <input
                type="text"
                id="phone-number"
                name="phone_number"
                value={updatedUser.phone_number}
                onChange={handleInputChange}
              />
            </div>
            {errors.phone_number && (
              <p className={styles.errorText}>{errors.phone_number}</p>
            )}
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

EditUserModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
};

export default EditUserModal;
