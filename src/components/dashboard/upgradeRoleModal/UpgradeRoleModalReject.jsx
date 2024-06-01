import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { toast, ToastContainer } from "react-toastify";
import { FaExclamationTriangle } from "react-icons/fa";
import styles from "./upgradeRoleModalReject.module.scss";
import "react-toastify/dist/ReactToastify.css";

const UpgradeRoleModalAcc = ({
  onClose,
  isOpen,
  upgradeRoleId,
  tableData,
  setTableData,
}) => {
  const [isLoading, setLoading] = useState(false);

  const handleConfirm = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `/api/upgrade-roles/${upgradeRoleId}`,
        { status: "reject" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        const updatedData = tableData.map((item) =>
          item.id === upgradeRoleId
            ? {
                ...item,
                upgradeRoleData: { ...item.upgradeRoleData, status: "reject" },
              }
            : item
        );
        setTableData(updatedData);
        toast.success("Upgrade role rejected!", {
          autoClose: 1500,
          closeOnClick: true,
          hideProgressBar: true,
          pauseOnHover: false,
          onClose: () => window.location.reload(),
        });
      }
    } catch (error) {
      console.error("Error updating upgrade role status: ", error);
      toast.error("Error updating upgrade role status!", {
        autoClose: 1500,
        closeOnClick: true,
        hideProgressBar: true,
        pauseOnHover: false,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="modal-overlay">
          <ToastContainer />
          <div className={styles.modal}>
            <div className={styles.alertIcon}>
              <FaExclamationTriangle size={40} />
            </div>
            <p>
              Are you sure want to reject <br /> upgrade user role?
            </p>
            <div className="modal-buttons">
              <button
                className={styles.confirmBtn}
                onClick={handleConfirm}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Confirm"}
              </button>
              <button className={styles.cancelBtn} onClick={onClose}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

UpgradeRoleModalAcc.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  upgradeRoleId: PropTypes.number.isRequired,
  tableData: PropTypes.array.isRequired,
  setTableData: PropTypes.func.isRequired,
};

export default UpgradeRoleModalAcc;
