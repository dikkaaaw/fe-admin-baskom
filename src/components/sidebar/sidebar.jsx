import { useContext, useEffect, useRef, useState } from "react";
import {
  MdOutlineClose,
  MdOutlineCurrencyExchange,
  MdOutlineGridView,
  MdOutlineLogout,
  MdOutlinePeople,
} from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { SidebarContext } from "../../context/SidebarContext";
import LogoutAction from "../dashboard/logoutModal/logoutAction";
import "./Sidebar.scss";

const Sidebar = () => {
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
  const navbarRef = useRef(null);
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location.pathname]);

  const handleClickOutside = (event) => {
    if (
      navbarRef.current &&
      !navbarRef.current.contains(event.target) &&
      event.target.className !== "sidebar-open-btn"
    ) {
      closeSidebar();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
    closeSidebar();
  };

  const handleCloseModal = () => {
    setShowLogoutModal(false);
  };

  return (
    <>
      <nav
        className={`sidebar ${isSidebarOpen ? "sidebar-show" : ""}`}
        ref={navbarRef}
      >
        <div className="sidebar-top">
          <div className="sidebar-brand">
            <Link to="/dashboard">
              <span className="sidebar-brand-text">BasKom.</span>
            </Link>
          </div>
          <button className="sidebar-close-btn" onClick={closeSidebar}>
            <MdOutlineClose size={24} />
          </button>
        </div>
        <div className="sidebar-body">
          <div className="sidebar-menu">
            <ul className="menu-list">
              <li
                className={`menu-link ${
                  activeItem === "/dashboard" ? "active" : ""
                }`}
              >
                <Link to="/dashboard" className="menu-link">
                  <span className="menu-link-icon">
                    <MdOutlineGridView size={18} />
                  </span>
                  <span className="menu-link-text">Dashboard</span>
                </Link>
              </li>
              <li
                className={`menu-link ${
                  activeItem === "/users" ? "active" : ""
                }`}
              >
                <Link to="/users" className="menu-link">
                  <span className="menu-link-icon">
                    <MdOutlinePeople size={20} />
                  </span>
                  <span className="menu-link-text">Kelola User</span>
                </Link>
              </li>
              <li
                className={`menu-link ${
                  activeItem === "/transactions" ? "active" : ""
                }`}
              >
                <Link to="/transactions" className="menu-link">
                  <span className="menu-link-icon">
                    <MdOutlineCurrencyExchange size={18} />
                  </span>
                  <span className="menu-link-text">Kelola Transaksi</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="sidebar-menu sidebar-menu2">
            <ul className="menu-list">
              {/* <li
                className={`menu-link ${
                  activeItem === "/user-settings" ? "active" : ""
                }`}
              >
                <Link to="/user-settings" className="menu-link">
                  <span className="menu-link-icon">
                    <MdOutlineSettings size={20} />
                  </span>
                  <span className="menu-link-text">Settings</span>
                </Link>
              </li> */}
              <li className={`menu-link ${activeItem === "/" ? "active" : ""}`}>
                <a className="menu-link" onClick={handleLogoutClick}>
                  <span className="menu-link-icon">
                    <MdOutlineLogout size={20} />
                  </span>
                  <span className="menu-link-text">Logout</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <LogoutAction show={showLogoutModal} onClose={handleCloseModal} />
    </>
  );
};

export default Sidebar;
