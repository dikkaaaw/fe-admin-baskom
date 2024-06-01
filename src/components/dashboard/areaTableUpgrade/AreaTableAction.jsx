import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import DetailUserModal from "../detailUserModal/DetailUserModal";
import EditUserModal from "../editUserModal/EditUserModal";
import DeleteUserModal from "../deleteUserModal/DeleteUserModal";
import { HiDotsHorizontal } from "react-icons/hi";

const AreaTableAction = ({ userId }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isModalDetailOpen, setModalDetailOpen] = useState(false);
  const [isModalEditOpen, setModalEditOpen] = useState(false);
  const [isModalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const openModalDetail = (userId) => {
    setSelectedUserId(userId);
    setModalDetailOpen(true);
  };
  const closeModalDetail = () => setModalDetailOpen(false);

  const openModalEdit = (userId) => {
    setSelectedUserId(userId);
    setModalEditOpen(true);
  };
  const closeEditDetail = () => setModalEditOpen(false);

  const openModalDelete = (userId) => {
    setSelectedUserId(userId);
    setModalDeleteOpen(true);
  };
  const closeModalDelete = () => setModalDeleteOpen(false);

  const handleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.addEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <button
        type="button"
        className="action-dropdown-btn"
        onClick={handleDropdown}
      >
        <HiDotsHorizontal size={18} />
        {showDropdown && (
          <div className="action-dropdown-menu" ref={dropdownRef}>
            <ul className="dropdown-menu-list">
              <li
                className="dropdown-menu-item"
                onClick={() => openModalDetail(userId)}
              >
                <Link className="dropdown-menu-link">View</Link>
              </li>
              <li
                className="dropdown-menu-item"
                onClick={() => openModalEdit(userId)}
              >
                <Link className="dropdown-menu-link">Edit</Link>
              </li>
              <li
                className="dropdown-menu-item"
                onClick={() => openModalDelete(userId)}
              >
                <Link className="dropdown-menu-link">Delete</Link>
              </li>
            </ul>
          </div>
        )}
      </button>
      <DetailUserModal
        isOpen={isModalDetailOpen}
        onClose={closeModalDetail}
        userId={selectedUserId}
      />
      <EditUserModal
        isOpen={isModalEditOpen}
        onClose={closeEditDetail}
        userId={selectedUserId}
      />
      <DeleteUserModal
        isOpen={isModalDeleteOpen}
        onClose={closeModalDelete}
        userId={selectedUserId}
      />
    </>
  );
};

AreaTableAction.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default AreaTableAction;
