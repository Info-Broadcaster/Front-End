import { Navigate } from "react-router-dom";
import isAuthenticated from "./functions/IsAuthenticated";

export default function GuestRoute({ children }) {
  if (isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  return children;
}
