import { useState, useEffect } from "react";
import {
  AreaCards,
  AreaTableUpgrade,
  AreaTop,
  SearchBar,
} from "../../components";
import "../loading.scss";

const RoleUpgrade = () => {
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
      <AreaTop title="Kelola Upgrade Role" />
      <AreaCards />
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <AreaTableUpgrade
        title="Data Pengajuan Upgrade"
        showAction={false}
        showActionColumn={false}
        searchQuery={searchQuery}
        upgradeRole={true}
      />
    </div>
  );
};

export default RoleUpgrade;
