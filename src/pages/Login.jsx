import React, { useState } from "react";
import AlertSucces from "../components/AlertSucces";
import AlertError from "../components/AlertError";
import conexionAxios from "../axios/Axios";
import { useNavigate } from "react-router-dom";

const Login = ({ handleLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertError, setAlertError] = useState({ error: false, message: "" });
  const [alertSucces, setAlertSucces] = useState({
    error: false,
    message: "",
  });

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.trim() === "" || password.trim() === "") {
      setAlertError({
        error: true,
        message: "Todos los campos son obligatorios",
      });
      setTimeout(() => setAlertError({ error: false, message: "" }), 5000); // limpiar la alerta después de 5 segundos
    }

    try {
      const res = await conexionAxios.post("/login", {
        email,
        password,
      });

      if (res.status === 200) {
        const token = res.data.message; // Obtener el token de la respuesta del servidor
        localStorage.setItem("token", token); // Guardar el token en el almacenamiento local
        setAlertSucces({
          error: true,
          message: "exitoso",
        });
        setTimeout(() => setAlertError({ error: false, message: "" }), 5000); // limpiar la alerta después de 5 segundos
        handleLogin(token);
        navigate("/administrador");
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      // Manejar el error de la solicitud
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setAlertError({ error: true, message: error.response.data.message });
      }
      setTimeout(() => setAlertError({ error: false, message: "" }), 10000);
    }
  };

  return (
    <div className=" xl:mx-96 lg:mx-60 md:mx-40 sm:mx-20 my-10 bg-white shadow rounded-lg p-10">
      <form
        onSubmit={handleSubmit}
        className="px-14 py-10 border border-gray-300 rounded-lg shadow-lg"
      >
        <h2 className="text-center text-xl font-medium mb-4">Iniciar sesión</h2>

        {alertError.error && !alertSucces.error && (
          <AlertError message={alertError.message} />
        )}
        {alertSucces.error && <AlertSucces message={alertSucces.message} />}

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-2"
          >
            Correo electrónico
          </label>
          <input
           className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            id="email"
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={handleEmailChange}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-2"
          >
            Contraseña
          </label>
          <input
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            id="password"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Iniciar sesión
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
