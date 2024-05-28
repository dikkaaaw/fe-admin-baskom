import { useContext } from "react";
import { SidebarContext } from "../../../context/SidebarContext";
import PropTypes from "prop-types";
import { MdOutlineMenu } from "react-icons/md";
import "./userSettings.scss";

const UserSettings = ({ title }) => {
  const { openSidebar } = useContext(SidebarContext);

  return (
    <section className="content-area-top">
      <div className="area-top">
        <button
          className="sidebar-open-btn"
          type="button"
          onClick={openSidebar}
        >
          <MdOutlineMenu size={24} />
        </button>
        <h2 className="area-top-title">{title}</h2>
      </div>
    </section>
  );
};

UserSettings.propTypes = {
  title: PropTypes.string.isRequired,
};

export default UserSettings;
