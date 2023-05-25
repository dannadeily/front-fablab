import React, { useState } from "react";

const Teclado = () => {
  const [display, setDisplay] = useState("");

  const handleButtonClick = (number) => {
    setDisplay(display + number);
  };

  return (
    <div>
      <div>
        <h1 className="pb-2 font-bold text-2xl pt-5 pb-8">
          Bienvenido al Laboratorio de Fabricación Digital San José de Cúcuta
        </h1>
      </div>
      <div className="w-full max-w-md mx-auto p-4">
        <h1 className="text-center pb-5">
          Por favor digite su cédula para ingresar al laboratorio
        </h1>
        <div className="bg-gray-100 border border-gray-300 rounded-lg p-2 mb-4">
          <div className="text-gray-500 text-right py-10">{display}</div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <button onClick={() => handleButtonClick("1")} className="btn border border-black py-5 rounded ">
            1
          </button>
          <button onClick={() => handleButtonClick("2")} className="btn border border-black py-5 rounded">
            2
          </button>
          <button onClick={() => handleButtonClick("3")} className="btn border border-black py-5 rounded">
            3
          </button>
          <button onClick={() => handleButtonClick("4")} className="btn border border-black py-5 rounded">
            4
          </button>
          <button onClick={() => handleButtonClick("5")} className="btn border border-black py-5 rounded">
            5
          </button>
          <button onClick={() => handleButtonClick("6")} className="btn border border-black py-5 rounded">
            6
          </button>
          <button onClick={() => handleButtonClick("7")} className="btn border border-black py-5 rounded">
            7
          </button>
          <button onClick={() => handleButtonClick("8")} className="btn border border-black py-5 rounded">
            8
          </button>
          <button onClick={() => handleButtonClick("9")} className="btn border border-black py-5 rounded">
            9
          </button>
          <button
            onClick={() => setDisplay("")}
            className="btn border border-black py-5 rounded bg-red-500"
          >
            Borrar
          </button>
          <button onClick={() => handleButtonClick("0")} className="btn border border-black py-5 rounded">
            0
          </button>
          <button
            onClick={() => setDisplay("")}
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
