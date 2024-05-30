import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./userProfileModal.scss";

const UserProfileModal = ({ isOpen, onClose }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    // Fake data pengguna
    const fakeUser = {
      name: "John Doe",
      email: "john.doe@example.com",
      phone_number: "8123456789",
      address: "123 Main St, Anytown, USA",
    };

    // Set data pengguna ke state
    setUser(fakeUser);
  }, []);

  const avatarUrl = `https://ui-avatars.com/api/?background=random&size=512&name=${encodeURIComponent(user.name || "")}`;

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-btn" onClick={onClose}>
          &times;
        </button>
        <h3>Edit Profile</h3>
        <div className="avatar-section-2">
          <img src={avatarUrl} alt="avatar" className="user-avatar" />
        </div>
        <form>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" value={user.name || ""} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email || ""}
              disabled
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <textarea
              type="text"
              id="address"
              name="address"
              value={user.address || ""}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone-number">Phone Number</label>
            <div className="input-group">
              <span className="country-code">+62</span>
              <input
                type="text"
                id="phone-number"
                name="phone-number"
                value={user.phone_number || ""}
              />
            </div>
          </div>

          <button type="submit" className="save-btn">
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
