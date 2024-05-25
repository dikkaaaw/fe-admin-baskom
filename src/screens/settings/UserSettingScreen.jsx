import { useState, useEffect } from "react";
import "./UserSetting.scss";

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
    <>
      <div>
        <p>Ini user Setting</p>
      </div>
    </>
  );
};

export default UserSetting;
