import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import styles from "./userProfileModal.module.scss";

const UserProfileModal = ({ isOpen, onClose }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`/api/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const avatarUrl = `https://ui-avatars.com/api/?background=random&size=512&name=${user.name}`;

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.modalCloseBtn} onClick={onClose}>
          &times;
        </button>
        <h3>Profile</h3>
        <div className={styles.avatarSection}>
          <img src={avatarUrl} alt="avatar" className={styles.avatar} />
        </div>
        <form>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" value={user.name || ""} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email || ""}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="phone-number">Phone Number</label>
            <div className={styles.inputGroup}>
              <span className={styles.countryCode}>+62</span>
              <input
                type="text"
                id="phone-number"
                name="phone-number"
                value={user.phone_number || ""}
              />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="address">Address</label>
            <textarea id="address" name="address" value={user.address || ""} />
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
