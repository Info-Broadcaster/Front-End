import { useRef, useState } from "react";
import Button from "./Button";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosInstance";

export default function LogInForm() {
  const credentials = useRef({
    username: import.meta.env.VITE_USERNAME || "",
    password: import.meta.env.VITE_PASSWORD || "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function handleLogIn(e) {
    e.preventDefault(); // Empêche le rechargement de la page
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
        if (error?.response?.status === 401) {
          setErrorMsg("Nom d'utilisateur ou mot de passe incorrect");
        } else {
          setErrorMsg("Une erreur est survenue");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <form
      className="flex w-1/2 min-w-96 h-auto p-8 bg-gray-200 flex-col items-center justify-around shadow-lg rounded-lg gap-10"
      onSubmit={handleLogIn}
    >
      <h2 className="font-bold">Connexion à Rainbow</h2>
      <img src="/rainbow.png" alt="logo rainbow" height={90} width={90} />

      <input
        type="text"
        name="username"
        placeholder="Nom d'utilisateur"
        autoComplete="username"
        className={`h-12 w-80 p-2 ${
          isLoading ? "cursor-not-allowed bg-gray-300" : "cursor-pointer"
        }`}
        onChange={(e) => (credentials.current.username = e.target.value)}
        defaultValue={credentials.current.username}
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Mot de passe"
        autoComplete="current-password"
        className={`h-12 w-80 p-2 ${
          isLoading ? "cursor-not-allowed bg-gray-300" : "cursor-pointer"
        }`}
        onChange={(e) => (credentials.current.password = e.target.value)}
        defaultValue={credentials.current.password}
        required
      />

      {errorMsg !== "" && <span className="text-red-600">{errorMsg}</span>}

      <Button type="submit" isLoading={isLoading}>
        Se connecter
      </Button>
    </form>
  );
}
