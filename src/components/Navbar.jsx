import { useState } from "react";
import { BiMenu, BiX } from "react-icons/bi";
import {
  FaTachometerAlt,
  FaChalkboard,
  FaMoneyBill,
  FaSignOutAlt,
  FaUserAlt,
  FaExclamationTriangle,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeToken } from "../slices/authSlice";
import ProfileDropdown from "./ProfileDropdown";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showCloseModal, setShowCloseModal] = useState(false);

  const logoutHandler = () => {
    dispatch(removeToken());
    navigate("/");
  };

  const showModalLogoutHandler = async () => {
    try {
      event.preventDefault();
      setShowCloseModal(true);
    } catch (error) {
      console.error("Error opening delete confirmation modal:", error);
    }
  };

  return (
    <>
      <nav className="flex items-center justify-between border border-black border-opacity-15 py-3 bg-[#f7f7f7] relative">
        <div className="container mx-auto lg:px-24 px-5 flex items-center justify-between gap-5">
          <BiMenu
            className="w-8 h-8 lg:hidden cursor-pointer"
            onClick={() => setToggle(true)}
          />
          {toggle && (
            <>
              <motion.div
                animate={{ x: [-100, 0] }}
                transition={{ duration: 0.3 }}
                className="fixed top-0 left-0 right-0 lg:hidden w-1/2 h-screen flex flex-col bg-slate-800"
              >
                <BiX
                  className="w-8 h-8 lg:hidden relative top-5 left-5 text-slate-200 cursor-pointer"
                  onClick={() => setToggle(false)}
                />
                <ul className="pt-8 pb-4 space-y-1 text-sm font-semibold text-slate-200">
                  <li className="hover:bg-slate-700">
                    <a
                      href="/dashboard"
                      className="flex items-center px-8 py-2 space-x-3 rounded-md"
                    >
                      <FaTachometerAlt className="me-6" />
                      <span className="text-base font-semibold">Dashboard</span>
                    </a>
                  </li>
                  <li className="hover:bg-slate-700">
                    <a
                      href="/course"
                      className="flex items-center px-8 py-2 space-x-3 rounded-md"
                    >
                      <FaUserAlt className="me-6" />
                      <span className="text-base font-semibold">
                        Kelola User
                      </span>
                    </a>
                  </li>
                  <li className="hover:bg-slate-700">
                    <a
                      href="/user"
                      className="flex items-center px-8 py-2 space-x-3 rounded-md"
                    >
                      <FaChalkboard className="me-6" />
                      <span className="text-base font-semibold">
                        Kelola Produk
                      </span>
                    </a>
                  </li>
                  <li className="hover:bg-slate-700">
                    <a
                      href="/notification"
                      className="flex items-center px-8 py-2 space-x-3 rounded-md"
                    >
                      <FaMoneyBill className="me-6" />
                      <span className="text-base font-semibold">
                        Kelola Pembayaran
                      </span>
                    </a>
                  </li>
                  <li className="hover:bg-slate-600">
                    <a
                      href=""
                      onClick={() => showModalLogoutHandler()}
                      className="flex items-center px-8 py-2 space-x-3 rounded-md"
                    >
                      <FaSignOutAlt className="me-6" />
                      <span className="text-base font-semibold">Keluar</span>
                    </a>
                  </li>
                </ul>
              </motion.div>
            </>
          )}

          <p
            className="text-md font-semibold py-3 font-poppins"
            style={{ letterSpacing: "2px" }}
          >
            Dashboard Admin
          </p>
          <ProfileDropdown />

          {showCloseModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-8 rounded-md w-96">
                <div className="flex items-center justify-center mb-2">
                  <FaExclamationTriangle className="text-red-500 w-8 h-8" />
                </div>
                <p className="text-md font-medium text-center mb-10">
                  Apakah Anda yakin ingin Logout?
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    className="bg-red-500 text-white px-6 py-1 rounded-md transition-all duration-300 hover:bg-opacity-80"
                    onClick={logoutHandler}
                  >
                    Keluar
                  </button>
                  <button
                    className="border border-gray-300 px-6 rounded-md transition-all duration-300 hover:bg-gray-100"
                    onClick={() => setShowCloseModal(false)}
                  >
                    Batal
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
