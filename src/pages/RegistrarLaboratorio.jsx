import React, { useState } from "react";
import conexionAxios from "../axios/Axios";
import AlertError from "../components/AlertError";
import AlertSucces from "../components/AlertSucces";

const RegistrarLaboratorio = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [alertError, setAlertError] = useState({ error: false, message: "" });
  const [alertSucces, setAlertSucces] = useState({
    error: false,
    message: "",
  });

  const handleImagenChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleNombreChange = (event) => {
    const value = event.target.value;
    setName(value);
  };

  const handleDescripcionChange = (event) => {
    const value = event.target.value;
    setDescription(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name.trim() === "" || description.trim() === "") {
      setAlertError({
        error: true,
        message: "Todos los campos son obligatorios",
      });
      setTimeout(() => setAlertError({ error: false, message: "" }), 5000); // limpiar la alerta después de 5 segundos
    } else {
      try {
        const formData = new FormData();
        formData.append("image", image);
        formData.append("name", name);
        formData.append("description", description);

        const res = await conexionAxios.post("/laboratory/create", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (res.status === 201) {
          setAlertSucces({ error: true, message: res.data.message });
          setTimeout(
            () => setAlertSucces({ error: false, message: "" }),
            10000
          );
          // Reiniciar los valores de los campos
          setImage(null);
          setName("");
          setDescription("");
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
    }
  };

  return (
    <>
      <div className="md:w-1/2 lg:w-2/5 mx-5">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <h1 className="font-bold text-2xl text-center text-gray-900">
            REGISTRAR AULA
          </h1>

          {alertError.error && !alertSucces.error && (
            <AlertError message={alertError.message} />
          )}
          {alertSucces.error && <AlertSucces message={alertSucces.message} />}

          <div className="my-5">
            <label
              htmlFor="image"
              className="uppercase text-gray-600 block font-bold"
            >
              Imagen
            </label>
            <input type="file" id="image" onChange={handleImagenChange} />
          </div>

          <div className="my-5">
            <label
              className="uppercase text-gray-600 block font-bold"
              htmlFor="nombre"
            >
              Nombre del aula
            </label>
            <input
              id="nombre"
              type="text"
              placeholder="nombres"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              value={name}
              onChange={handleNombreChange}
            />
          </div>
          <div className="my-5">
            <label
              className="uppercase text-gray-600 block font-bold"
              htmlFor="description"
            >
              Descripcion
            </label>
            <textarea
              id="description"
              type="text"
              placeholder="descripcion"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              value={description}
              onChange={handleDescripcionChange}
            />
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

export default RegistrarLaboratorio;
