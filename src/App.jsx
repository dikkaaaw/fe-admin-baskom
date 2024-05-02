import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Payment from "./pages/Payment.jsx";
import NotFound from "./pages/NotFound.jsx";
import Product from "./pages/Product.jsx";
import User from "./pages/User.jsx";
import Layout from "./components/Layout.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import "./index.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    setIsAuthenticated(!!accessToken);
  }, []);

  const Private = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  const Auth = ({ element }) => {
    return isAuthenticated ? <Navigate to="/" /> : element;
  };
  return (
    <Router>
      <Routes>
        <Route path="" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="payment" element={<Payment />} />
          <Route path="user" element={<User />} />
          <Route path="product" element={<Product />} />
          <Route path="user-profile" element={<UserProfile />} />
        </Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
