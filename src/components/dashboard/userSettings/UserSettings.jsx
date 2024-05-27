import { useState, useContext } from "react";
import { SidebarContext } from "../../../context/SidebarContext";
import { MdOutlineMenu } from "react-icons/md";
import "./userSettings.scss";

const UserSettings = () => {
  const { openSidebar } = useContext(SidebarContext);
  const [formData, setFormData] = useState({
    fullName: "Thai Dieu Vy",
    birthday: "22/04/2001",
    email: "thaidieuvydayy@gmail.com",
    phoneNumber: "+84 789 373 568",
    bio: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <>
      <div>
        <button
          className="sidebar-open-btn"
          type="button"
          onClick={openSidebar}
        >
          <MdOutlineMenu size={24} />
        </button>
      </div>
      <div className="user-settings-card">
        <div className="content-area-table">
          <h2>Edit your profile</h2>
          <div className="profile-edit-form">
            <div className="avatar-section">
              <img src="https://via.placeholder.com/150" alt="Avatar" />
            </div>
            <form onSubmit={handleSubmit}>
              <label>
                Full Name
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </label>
              <label>
                Birthday
                <input
                  type="text"
                  name="birthday"
                  value={formData.birthday}
                  onChange={handleChange}
                />
              </label>
              <label>
                Email
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </label>
              <label>
                Phone Number
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </label>
              <label>
                Bio
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                />
              </label>
              <button type="submit" className="save-btn">
                Save change
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserSettings;
