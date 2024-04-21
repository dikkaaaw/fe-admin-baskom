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
        <div className="container flex items-center justify-between gap-5 px-5 mx-auto lg:px-24">
          <BiMenu
            className="w-8 h-8 cursor-pointer lg:hidden"
            onClick={() => setToggle(true)}
          />
          {toggle && (
            <>
              <motion.div
                animate={{ x: [-100, 0] }}
                transition={{ duration: 0.3 }}
                className="fixed top-0 left-0 right-0 flex flex-col w-1/2 h-screen lg:hidden bg-slate-800"
              >
                <BiX
                  className="relative w-8 h-8 cursor-pointer lg:hidden top-5 left-5 text-slate-200"
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
                      href="/user"
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
                      href="/product"
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
                      href="/payment"
                      className="flex items-center px-8 py-2 space-x-3 rounded-md"
                    >
                      <FaMoneyBill className="me-6" />
                      <span className="text-base font-semibold">
                        Kelola Pembayaran
                      </span>
                    </a>
                  </li>
                  <li
                    className="hover:bg-slate-600"
                    style={{ marginTop: "40px" }}
                  >
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
            className="py-3 font-semibold text-md font-poppins"
            style={{ letterSpacing: "2px" }}
          >
            Dashboard Admin
          </p>
          <ProfileDropdown />

          {showCloseModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="p-8 bg-white rounded-md w-96">
                <div className="flex items-center justify-center mb-2">
                  <FaExclamationTriangle className="w-8 h-8 text-red-500" />
                </div>
                <p className="mb-10 font-medium text-center text-md">
                  Apakah Anda yakin ingin Logout?
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    className="px-6 py-1 text-white transition-all duration-300 bg-red-500 rounded-md hover:bg-opacity-80"
                    onClick={logoutHandler}
                  >
                    Keluar
                  </button>
                  <button
                    className="px-6 transition-all duration-300 border border-gray-300 rounded-md hover:bg-gray-100"
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
