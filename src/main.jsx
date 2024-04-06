import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import store from "./store.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Payment from "./pages/Payment.jsx";
import Layout from "./components/Layout.jsx";
import Private from "./private/private.jsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Login />} />
      <Route path="" element={<Layout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="payment" element={<Payment />} />
      </Route>
      <Route path="" element={<Private />}></Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
