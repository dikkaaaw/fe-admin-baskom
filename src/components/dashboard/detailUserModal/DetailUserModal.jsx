import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import styles from "./detailUserModal.module.scss";

const DetailUserModal = ({ isOpen, onClose, userId }) => {
  const [user, setUser] = useState({
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
        const response = await axios.get(
          `https://baskom-api.up.railway.app/api/v1/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(response.data);
        console.log(response);
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    if (isOpen && userId) {
      fetchData();
    }
  }, [isOpen, userId]);

  const avatarUrl = `https://ui-avatars.com/api/?background=random&size=512&name=${encodeURIComponent(user.name)}`;

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.modalCloseBtn} onClick={onClose}>
          &times;
        </button>
        <h3>User Details</h3>
        <div className={styles.avatarSection}>
          <img src={avatarUrl} alt="avatar" className={styles.avatar} />
        </div>
        <form>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={user.name}
              readOnly
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              readOnly
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="phone-number">Phone Number</label>
            <input
              type="text"
              id="phone-number"
              name="phone-number"
              value={user.phone_number}
              readOnly
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="address">Address</label>
            <textarea
              id="address"
              name="address"
              value={user.address}
              readOnly
            />
          </div>
        </form>
      </div>
    </div>
  );
};

DetailUserModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
};

export default DetailUserModal;
