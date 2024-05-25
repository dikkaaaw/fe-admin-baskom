import { useState, useEffect } from "react";
import { AreaCards, AreaTable, AreaTop, SearchBar } from "../../components";
import "../loading.scss";

const User = () => {
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
      <AreaTop />
      <AreaCards />
      <SearchBar />
      <AreaTable />
    </div>
  );
};

export default User;
