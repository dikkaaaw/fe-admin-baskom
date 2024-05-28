import "./userSettings.scss";

const UserSettingsForm = () => {
  const avatarUrl =
    "https://ui-avatars.com/api/?background=random&size=512&name=kakgem";

  return (
    <div className="area-card">
      <div className="area-card-info">
        <div className="edit-profile-container">
          <div className="avatar-section">
            <img src={avatarUrl} alt="Avatar" className="avatar" />
          </div>
          <div className="form-section">
            <form>
              <div className="form-group">
                <label htmlFor="username">Name</label>
                <input type="text" id="username" name="username" />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" />
              </div>
              <div className="form-group">
                <label htmlFor="bio">Address</label>
                <textarea id="bio" name="bio"></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="phone-number">Phone Number</label>
                <input id="phone-number" name="phone-number"></input>
              </div>
              <button type="submit">Save Changes</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSettingsForm;
