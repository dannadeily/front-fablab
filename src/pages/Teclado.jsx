import React, { useState, useEffect } from "react";
import AlertSucces from "../components/AlertSucces";
import AlertError from "../components/AlertError";
import conexionAxios from "../axios/Axios";

const Teclado = () => {
  const [document, setDocument] = useState("");
  const [alertError, setAlertError] = useState({ error: false, message: "" });
  const [alertSucces, setAlertSucces] = useState({
    error: false,
    message: "",
  });

  const [laboratoryId, setLaboratoryId] = useState([]);
  const [laboratory, setLaboratory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await conexionAxios.get("/laboratory");
        setLaboratory(response.data.message);
        setLaboratoryId(response.data.message[0].id);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleButtonClick = (number) => {
    setDocument(document + number);
  };

  const handledocumentChange = (event) => {
    setDocument(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    sendData();
  };

  const sendData = async () => {
    try {
      const res = await conexionAxios.post("/asistencia", {
        laboratoryId,
        document,
      });

      setDocument("");
      setAlertSucces({ error: true, message: "Asistencia registrada" });
      setTimeout(() => setAlertSucces({ error: false, message: "" }), 1100);
    } catch (error) {
      // Manejar el error de la solicitud
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setAlertError({ error: true, message: error.response.data.message });
      }
      setTimeout(() => setAlertError({ error: false, message: "" }), 1100);
    }
  };

  return (
    <div>
      <div>
        <h1 className="pb-2 font-bold text-2xl">
          Bienvenido al Laboratorio de Fabricación Digital San José de Cúcuta
        </h1>
      </div>
      {alertError.error && !alertSucces.error && (
        <AlertError message={alertError.message} />
      )}
      {alertSucces.error && <AlertSucces message={alertSucces.message} />}
      <div className="w-full max-w-md mx-auto p-4">
        <h1 className="text-center pb-5">
          Por favor digite su cédula para ingresar al laboratorio
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-state"
            >
              Seleccione aula
            </label>

            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                onChange={(e) => setLaboratoryId(e.target.value)}
                name="academyProgram"
                label="academyProgram"
              >
                {laboratory.map((laboratoryItem) => (
                  <option key={laboratoryItem.id} value={laboratoryItem.id}>
                    {laboratoryItem.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="bg-gray-100 border border-gray-300 rounded-lg p-1 mb-4">
            <input
              type="number"
              value={document}
              onChange={handledocumentChange}
              className="text-gray-500 text-right py-2 outline-none bg-transparent w-full text-5xl"
            />
          </div>
        </form>
        <div className="grid grid-cols-3 gap-4">
          <button
            onClick={() => handleButtonClick("1")}
            className="btn border border-black py-4 rounded"
          >
            1
          </button>
          <button
            onClick={() => handleButtonClick("2")}
            className="btn border border-black py-5 rounded"
          >
            2
          </button>
          <button
            onClick={() => handleButtonClick("3")}
            className="btn border border-black py-5 rounded"
          >
            3
          </button>
          <button
            onClick={() => handleButtonClick("4")}
            className="btn border border-black py-5 rounded"
          >
            4
          </button>
          <button
            onClick={() => handleButtonClick("5")}
            className="btn border border-black py-5 rounded"
          >
            5
          </button>
          <button
            onClick={() => handleButtonClick("6")}
            className="btn border border-black py-5 rounded"
          >
            6
          </button>
          <button
            onClick={() => handleButtonClick("7")}
            className="btn border border-black py-5 rounded"
          >
            7
          </button>
          <button
            onClick={() => handleButtonClick("8")}
            className="btn border border-black py-5 rounded"
          >
            8
          </button>
          <button
            onClick={() => handleButtonClick("9")}
            className="btn border border-black py-5 rounded"
          >
            9
          </button>
          <button
            onClick={() => setDocument("")}
            className="btn border border-black py-5 rounded bg-red-500"
          >
            Borrar
          </button>
          <button
            onClick={() => handleButtonClick("0")}
            className="btn border border-black py-5 rounded"
          >
            0
          </button>
          <button
            onClick={handleSubmit}
            className="btn border border-black py-5 rounded bg-green-500"
          >
            Ingresar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Teclado;
