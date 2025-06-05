import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import PrivateRoute from "../components/PrivateRoute";

import AccountEdit from "../pages/Account/AccountEdit";
import AccountLog from "../pages/Account/AccountLog";
import Dashboard from "../pages/Dashboard";
import AllLogs from "../pages/AllLogs";
import AccountList from "../pages/Account/AccountList";
import Settings from "../pages/Settings";
import Login from "../pages/Login";
import Signup from "../pages/SignUp";
import Camera from "../pages/Camera"
import Analysis from "../pages/Analysis";
import Beacon from "../pages/Beacon"

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "accounts", element: <AccountList /> },
      { path: "settings", element: <Settings /> },
      { path: "camera", element: <Camera /> },
      { path: "analysis", element: <Analysis /> },
      { path: "beacon", element: <Beacon /> },
      { path: "accounts/edit/:id", element: <AccountEdit /> },
      { path: "accounts/action-logs/:id", element: <AccountLog /> },
      { path: "action-logs", element: <AllLogs /> },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "sign-up", element: <Signup /> },
    ],
  },
]);

export default router;
