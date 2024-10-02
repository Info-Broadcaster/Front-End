import { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function LogOut() {
  const navigate = useNavigate();

  useEffect(() => {
    Cookies.remove("token");
    navigate("/connexion");
  }, [navigate]);

  return <div>Déconnexion en cours.</div>;
}
