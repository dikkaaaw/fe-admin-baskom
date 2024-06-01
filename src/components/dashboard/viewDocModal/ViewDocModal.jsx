import PropTypes from "prop-types";
import styles from "./viewDocModal.module.scss";

const ViewDocModal = ({ isOpen, onClose, documentUrl }) => {
  return (
    <>
      {isOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <img
              className={styles.imgDocument}
              src={documentUrl}
              alt="Document"
            />
            <div className={styles.modalButton}>
              <button className={styles.closeBtn} onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

ViewDocModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  documentUrl: PropTypes.string,
};

export default ViewDocModal;
