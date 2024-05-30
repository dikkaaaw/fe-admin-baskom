import { useState, useEffect } from "react";
import { AreaCards, AreaTable, AreaTop, SearchBar } from "../../components";
import "../loading.scss";

const Transaction = () => {
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
      <AreaTop title="Kelola Transaksi" />
      <AreaCards />
      <SearchBar />
      <AreaTable
        title="Data Transaksi"
        showAction={false}
        showActionColumn={false}
      />
    </div>
  );
};

export default Transaction;
