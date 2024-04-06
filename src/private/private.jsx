import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const Private = () => {
  const { token } = useSelector((state) => state.auth);
  return token ? <Outlet /> : <Navigate to="/" replace />;
};

export default Private;
