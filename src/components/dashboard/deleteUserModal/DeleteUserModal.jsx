import PropTypes from "prop-types";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { FaExclamationTriangle } from "react-icons/fa";
import styles from "./deleteUserModal.module.scss";
import "react-toastify/dist/ReactToastify.css";

const DeleteUserModal = ({ userId, onClose, isOpen }) => {
  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("User deleted successfully!", {
        autoClose: 1500,
        closeOnClick: true,
        hideProgressBar: true,
        pauseOnHover: false,
        onClose: () => window.location.reload(),
      });
    } catch (error) {
      console.error("Error deleting user: ", error);
      toast.error("Failed to delete user.", {
        autoClose: 1500,
        closeOnClick: true,
        hideProgressBar: true,
        pauseOnHover: false,
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <ToastContainer />
      <div className={styles.modalContent}>
        <FaExclamationTriangle color="red" size={30} />
        <h4>
          Are you sure you want to <br />
          delete this user?
        </h4>
        <div className={styles.buttonSection}>
          <button className={styles.cancelBtn} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.deleteBtn} onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

DeleteUserModal.propTypes = {
  userId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default DeleteUserModal;
