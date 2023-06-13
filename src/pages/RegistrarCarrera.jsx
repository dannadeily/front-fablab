import React, { useState } from "react";
import AlertError from "../components/AlertError";
import AlertSucces from "../components/AlertSucces";
import conexionAxios from "../axios/Axios";

const RegistrarCarrera = () => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [alertError, setAlertError] = useState({ error: false, message: "" });
  const [alertSucces, setAlertSucces] = useState({
    error: false,
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name.trim() === "" || code.trim() === "") {
      setAlertError({
        error: true,
        message: "Todos los campos son obligatorios",
      });
      setTimeout(() => setAlertError({ error: false, message: "" }), 5000); // limpiar la alerta después de 5 segundos
    }

    try {
      const res = await conexionAxios.post("/academyProgram/create", {
        name,
        code,
      });

      if (res.status === 201) {
        setAlertSucces({ error: true, message: res.data.message });
        setTimeout(() => setAlertSucces({ error: false, message: "" }), 10000);
        // Reiniciar los valores de los campos
        setName("");
        setCode("");
        window.location.reload(); // Recargar la página actual
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
    <>
      <div className="md:w-1/2 lg:w-2/5 mx-5">
        <form onSubmit={handleSubmit}>
          <h1 className=" font-bold text-2xl text-center text-gray-900  ">
            REGISTRAR CARRERA
          </h1>

          {alertError.error && !alertSucces.error && (
            <AlertError message={alertError.message} />
          )}
          {alertSucces.error && <AlertSucces message={alertSucces.message} />}

          <div className="my-5">
            <label
              className="uppercase text-gray-600 block  font-bold"
              htmlFor="nombre"
              name="nombre"
              type="text"
            >
              Nombre de la carrera
            </label>

            <input
              id="nombre"
              type="text"
              placeholder="nombre"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label
              className="uppercase text-gray-600 block  font-bold"
              htmlFor="codigo"
              name="codigo"
              type="text"
            >
              codigo de la carrera
            </label>
            <input
              id="codigo"
              type="number"
              placeholder="codigo"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="registrar carrrera"
            className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          />
        </form>
      </div>
    </>
  );
};

export default RegistrarCarrera;
