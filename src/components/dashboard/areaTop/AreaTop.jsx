import { useContext, useState } from "react";
import { MdArrowDropDown, MdOutlineMenu } from "react-icons/md";
import { SidebarContext } from "../../../context/SidebarContext";
import UserProfileModal from "../userProfileModal/UserProfileModal";
import PropTypes from "prop-types";
const avatarUrl =
  "https://ui-avatars.com/api/?background=random&size=512&name=John Doe";
import "./AreaTop.scss";

const AreaTop = ({ title }) => {
  const { openSidebar } = useContext(SidebarContext);
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <section className="content-area-top">
      <div className="area-top-l">
        <button
          className="sidebar-open-btn"
          type="button"
          onClick={openSidebar}
        >
          <MdOutlineMenu size={24} />
        </button>
        <h2 className="area-top-title">{title}</h2>
      </div>
      <div className="area-top-r">
        <div className="avatar-section" onClick={openModal}>
          <img src={avatarUrl} alt="Avatar" className="avatar" />
          <MdArrowDropDown size={24} className="arrow-down" />
        </div>
      </div>
      <UserProfileModal isOpen={isModalOpen} onClose={closeModal} />
    </section>
  );
};

AreaTop.propTypes = {
  title: PropTypes.string.isRequired,
};

export default AreaTop;
