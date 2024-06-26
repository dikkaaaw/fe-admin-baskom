import { useState, useEffect } from "react";
import { AreaCards, AreaTable, AreaTop, SearchBar } from "../../components";
import "../loading.scss";

const User = () => {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

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
      <AreaTop title="Kelola User" />
      <AreaCards />
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <AreaTable
        title="Kelola User"
        buttonTitle="Create User"
        searchQuery={searchQuery}
      />
    </div>
  );
};

export default User;
