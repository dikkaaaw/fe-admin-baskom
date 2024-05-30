import { useState, useEffect } from "react";
import { AreaCards, AreaTable, AreaTop } from "../../components";
import { FaFilter } from "react-icons/fa";
import "../loading.scss";

const Dashboard = () => {
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
      <AreaTop title="Dashboard" />
      <AreaCards />
      <form className="search-bar">
        <div className="filter-box">
          <FaFilter className="filter-icon" />
        </div>
        <input type="text" placeholder="Search..." className="search-input" />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      <AreaTable title="Daftar User" />
    </div>
  );
};

export default Dashboard;
