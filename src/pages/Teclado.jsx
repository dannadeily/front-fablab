import React, { useState } from "react";
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
        document,
      });
      setDocument("");
      setAlertSucces({ error: true, message: "Asistencia registrada" });
      setTimeout(() => setAlertSucces({ error: false, message: "" }), 10000);
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
    <div>
      <div>
        <h1 className="pb-2 font-bold text-2xl pt-5 pb-8">
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
          <div className="bg-gray-100 border border-gray-300 rounded-lg p-1 mb-4">
            <input
              type="number"
              value={document}
              onChange={handledocumentChange}
              className="text-gray-500 text-right py-10 outline-none bg-transparent w-full"
            />
          </div>
          </form>
          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={() => handledocumentChange("1")}
              className="btn border border-black py-5 rounded "
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
