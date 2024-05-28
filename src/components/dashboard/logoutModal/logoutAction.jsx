import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { FaExclamationTriangle } from "react-icons/fa";
import "./logoutAction.scss";

const LogoutAction = ({ show, onClose }) => {
  const navigate = useNavigate();

  const onLogout = () => {
    navigate("/");
  };

  return (
    <>
      {show && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="alert-icon">
              <FaExclamationTriangle size={40} />
            </div>
            <p>Are you sure you want to logout?</p>
            <div className="modal-buttons">
              <button className="cancel-btn" onClick={onClose}>
                Cancel
              </button>
              <button className="confirm-btn" onClick={onLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

LogoutAction.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default LogoutAction;
