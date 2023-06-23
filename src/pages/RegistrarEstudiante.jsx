import React, { useState, useEffect } from "react";
import AlertError from "../components/AlertError";
import AlertSucces from "../components/AlertSucces";
import conexionAxios from "../axios/Axios";

const RegistrarEstudiante = () => {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [document, setDocument] = useState("");
  const [idAcademyProgram, setIdAcademyProgram] = useState([]);
  const [academyProgram, setAcademyProgram] = useState([]);
  const [alertError, setAlertError] = useState({ error: false, message: "" });
  const [alertSucces, setAlertSucces] = useState({
    error: false,
    message: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await conexionAxios.get("/academyProgram");
        setAcademyProgram(response.data.message);
        setIdAcademyProgram(response.data.message[0].id);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (
    //   name.trim() ||
    //   lastname.trim() ||
    //   email.trim() === "" ||
    //   document.trim() ||
    //   idAcademyProgram.trim()
    // ) {
    //   setAlertError({
    //     error: true,
    //     message: "Todos los campos son obligatorios",
    //   });
    //   setTimeout(() => setAlertError({ error: false, message: "" }), 5000); // limpiar la alerta después de 5 segundos
    // }

    try {
      const res = await conexionAxios.post("/register", {
        name,
        lastname,
        email,
        document,
        idAcademyProgram,
      });

      if (res.status === 201) {
        setAlertSucces({ error: true, message: res.data.message });
        setTimeout(() => setAlertSucces({ error: false, message: "" }), 10000);
        // Reiniciar los valores de los campos
        setName("");
        setLastname("");
        setEmail("");
        setDocument("");
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
      <div className=" xl:mx-96 lg:mx-60 md:mx-40 sm:mx-20 my-10 bg-white shadow rounded-lg p-10">
        <form onSubmit={handleSubmit}>
          <h1 className=" font-bold text-2xl text-center text-gray-900  ">
            REGISTRAR ESTUDIANTE
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
              Nombres
            </label>

            <input
              id="nombre"
              type="text"
              placeholder="nombres"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label
              className="uppercase text-gray-600 block  font-bold"
              htmlFor="apellido"
              name="apellido"
              type="text"
            >
              Apellidos
            </label>
            <input
              id="apellido"
              type="text"
              placeholder="apellidos"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>

          <div className="my-5">
            <label
              className="uppercase text-gray-600 block  font-bold"
              htmlFor="email"
              name="email"
              type="email"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              placeholder="Email"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label
              className="uppercase text-gray-600 block  font-bold"
              htmlFor="document"
              name="document"
              type="number"
            >
              documento
            </label>

            <input
              id="document"
              type="number"
              placeholder="documento"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              value={document}
              onChange={(e) => setDocument(e.target.value)}
            />
          </div>

          <div className="my-5">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-state"
            >
              Seleccione programa académico
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                onChange={(e) => setIdAcademyProgram(e.target.value)}
                name="academyProgram"
                label="academyProgram"
              >
                {academyProgram.map((academyProgram) => (
                  <option key={academyProgram.id} value={academyProgram.id}>
                    {academyProgram.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <input
            type="submit"
            value="registrar"
            className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          />
        </form>
      </div>
    </>
  );
};

export default RegistrarEstudiante;
