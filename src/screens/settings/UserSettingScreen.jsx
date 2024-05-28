import { useState, useEffect } from "react";
import { UserSettings } from "../../components";
import { UserSettingsForm } from "../../components";

const UserSetting = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="content-area">
      <UserSettings title="Edit Your Profile" />
      <UserSettingsForm />
    </div>
  );
};

export default UserSetting;
