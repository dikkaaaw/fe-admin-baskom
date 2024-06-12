import { useContext, useEffect, useState } from "react";
import { MdArrowDropDown, MdOutlineMenu } from "react-icons/md";
import { SidebarContext } from "../../../context/SidebarContext";
import UserProfileModal from "../userProfileModal/UserProfileModal";
import PropTypes from "prop-types";
import "./AreaTop.scss";
import axios from "axios";

const AreaTop = ({ title }) => {
  const { openSidebar } = useContext(SidebarContext);
  const [user, setUser] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `https://baskom-api.up.railway.app/api/v1/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const avatarUrl = `https://ui-avatars.com/api/?background=random&size=512&name=${user?.name}`;

  if (!user) return null;

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
