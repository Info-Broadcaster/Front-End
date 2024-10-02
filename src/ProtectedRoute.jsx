import { Navigate } from "react-router-dom";
import isAuthenticated from "./functions/IsAuthenticated";

export default function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/connexion" replace />;
  }

  return children;
}
