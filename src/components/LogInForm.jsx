import { useRef, useState } from "react";
import Button from "./Button";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosInstance";

export default function LogInForm() {
  const credentials = useRef({
    username: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function handleLogIn() {
    setErrorMsg("");
    setIsLoading(true);
    if (
      credentials.current.username === "" ||
      credentials.current.password === ""
    ) {
      setErrorMsg("Veuillez remplir les champs");
      setIsLoading(false);
      return;
    }

    const data = credentials.current;

    axiosInstance
      .post("/login", data)
      .then((data) => {
        if (data.status === 200) {
          Cookies.set("token", data.data.token, { expires: 1, secure: true });
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setErrorMsg("Une erreur est survenue");
        Cookies.set("token", "fakeTOken", { expires: 1, secure: true });
        navigate("/");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div className="flex w-1/2 min-w-96 h-auto p-8 bg-gray-200 flex-col items-center justify-around shadow-lg rounded-lg gap-10">
      <h2 className="font-bold">Connexion à Rainbow</h2>
      <img src="/rainbow.png" alt="logo rainbow" height={90} width={90} />
      <input
        type="text"
        placeholder="Nom d'utilisateur"
        className={`h-12 w-80 p-2 ${
          isLoading ? "cursor-not-allowed bg-gray-300" : "cursor-pointer"
        }`}
        onChange={(e) => (credentials.current.username = e.target.value)}
      />
      <input
        type="password"
        placeholder="Mot de passe"
        className={`h-12 w-80 p-2 ${
          isLoading ? "cursor-not-allowed bg-gray-300" : "cursor-pointer"
        }`}
        onChange={(e) => (credentials.current.password = e.target.value)}
      />
      {errorMsg != "" && <span className="text-red-600">{errorMsg}</span>}
      <Button callback={handleLogIn} isLoading={isLoading}>
        Se connecter
      </Button>
    </div>
  );
}
