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
    // phoneNumber: "",
    address: "",
    roles: [],
  });

  const allRoles = [
    { id: 1, name: "User" },
    { id: 2, name: "Admin" },
    { id: 3, name: "Penjual" },
  ];

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
        const user = response.data;
        const userRoles = user.roles.map((role) => role.id);
        setUpdatedUser({ ...user, roles: userRoles });
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    if (isOpen && userId) {
      fetchData();
    }
  }, [isOpen, userId]);

  const handleRoleChange = (e) => {
    const selectedRoleId = parseInt(e.target.value);
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      roles: [selectedRoleId],
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      roles: "",
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!updatedUser.name) newErrors.name = "Name cannot be empty!";
    // if (!validatePhoneNumber(updatedUser.phoneNumber)) {
    //   newErrors.phoneNumber =
    //     "Phone number must start with +62 and followed by 8 to 10 digits.";
    // }
    if (!updatedUser.address) newErrors.address = "Address cannot be empty!";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // const validatePhoneNumber = (phoneNumber) => {
  //   const phoneNumberRegex = /^\+628\d{8,12}$/;
  //   return phoneNumberRegex.test(phoneNumber);
  // };

  const updateUserRoles = async () => {
    const token = localStorage.getItem("token");
    const userRoles = updatedUser.roles;

    try {
      const response = await axios.get(
        `https://baskom-api.up.railway.app/api/v1/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const existingRoles = response.data.roles.map((role) => role.id);

      // Add new roles
      for (const roleId of userRoles) {
        if (!existingRoles.includes(roleId)) {
          await axios.post(
            "https://baskom-api.up.railway.app/api/v1/user/roles/add",
            { userId, roleId },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        }
      }

      // for (const roleId of existingRoles) {
      //   if (!userRoles.includes(roleId)) {
      //     await axios.delete("/api/user/roles/delete", {
      //       headers: {
      //         Authorization: `Bearer ${token}`,
      //       },
      //       data: { userId, roleId },
      //     });
      //   }
      // }
    } catch (error) {
      console.error("Error updating user roles: ", error);
      throw error;
    }
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!validateForm()) {
      return;
    }

    try {
      await axios.put(
        `https://baskom-api.up.railway.app/api/v1/users/${userId}`,
        updatedUser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await updateUserRoles();

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
            {errors.name && <p className={styles.errorText}>{errors.name}</p>}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={updatedUser.email}
              disabled
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="phone-number">Phone Number</label>
            <input
              type="text"
              id="phone_number"
              name="phone_number"
              value={updatedUser.phone_number}
              onChange={handleInputChange}
            />
            {errors.phoneNumber && (
              <p className={styles.errorText}>{errors.phoneNumber}</p>
            )}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="role">Add Role</label>
            <select
              id="role"
              name="roles"
              value={updatedUser.roles || ""}
              onChange={handleRoleChange}
              className={styles.selectRole}
            >
              <option disabled value="">
                Select a role
              </option>
              {allRoles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
            {errors.roles && <p className={styles.errorText}>{errors.roles}</p>}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="address">Address</label>
            <textarea
              id="address"
              name="address"
              value={updatedUser.address}
              onChange={handleInputChange}
            />
            {errors.address && (
              <p className={styles.errorText}>{errors.address}</p>
            )}
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
