import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Edition from "./Edition.jsx";
import LogIn from "./LogIn.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import GuestRoute from "./GuestRoute.jsx";
import LogOut from "./LogOut.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />,
      </ProtectedRoute>
    ),
  },
  {
    path: "/edition/:link/:lang?",
    element: (
      <ProtectedRoute>
        <Edition />
      </ProtectedRoute>
    ),
  },
  {
    path: "/connexion",
    element: (
      <GuestRoute>
        <LogIn />
      </GuestRoute>
    ),
  },
  {
    path: "/deconnexion",
    element: (
      <ProtectedRoute>
        <LogOut />
      </ProtectedRoute>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
