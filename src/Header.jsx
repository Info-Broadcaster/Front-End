import { Link, useLocation } from "react-router-dom";
import isAuthenticated from "./functions/IsAuthenticated";
import { IoLogOutOutline } from "react-icons/io5";

export default function Header() {
  const location = useLocation();
  const { pathname } = location;

  return (
    <header className="flex h-[8vh] w-full bg-purple-700 items-center justify-between px-8 shadow-lg">
      <Link to={"/"} className="flex items-center justify-center gap-3">
        <img
          src="/logo1.png"
          className="rounded-full h-10 w-10 filter invert brightness-0"
        />
        <div className="text-white text-2xl">Info Broadcaster</div>
      </Link>
      {isAuthenticated() ? (
        <Link to={"/deconnexion"} className="text-white text-lg mr-10">
          <IoLogOutOutline className="text-3xl" />
        </Link>
      ) : (
        pathname != "/connexion" && (
          <Link to={"/connexion"} className="text-white text-lg ml-10">
            Connexion
          </Link>
        )
      )}
    </header>
  );
}
