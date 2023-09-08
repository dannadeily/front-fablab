import React, { useState, useEffect } from "react";
import AlertError from "../components/AlertError";
import AlertSucces from "../components/AlertSucces";
import conexionAxios from "../axios/Axios";

const InscribirProyecto = () => {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [alertError, setAlertError] = useState({ error: false, message: "" });
  const [alertSucces, setAlertSucces] = useState({
    error: false,
    message: "",
  });
  const [participants, setParticipants] = useState([]);
  const [newParticipant, setNewParticipant] = useState({
    name: "",
    code: "",
    email: "",
  });
  const [editingIndex, setEditingIndex] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewParticipant({ ...newParticipant, [name]: value });
  };

  const handleAddParticipant = () => {
    if (newParticipant.name && newParticipant.code && newParticipant.email) {
      if (editingIndex !== null) {
        // Si estamos editando, actualizamos el participante existente
        const updatedParticipants = [...participants];
        updatedParticipants[editingIndex] = newParticipant;
        setParticipants(updatedParticipants);
        setEditingIndex(null);
      } else {
        // Si no estamos editando, agregamos un nuevo participante
        setParticipants([...participants, newParticipant]);
      }
      // Restablecemos el formulario
      setNewParticipant({ name: "", code: "", email: "" });
    }
  };

  const handleEditParticipant = (index) => {
    // Cuando se hace clic en "Editar" en un participante, llenamos el formulario con sus datos
    const participantToEdit = participants[index];
    setNewParticipant(participantToEdit);
    setEditingIndex(index);
  };

  const handleDeleteParticipant = (index) => {
    // Eliminar un participante
    const updatedParticipants = [...participants];
    updatedParticipants.splice(index, 1);
    setParticipants(updatedParticipants);
  };

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
      });

      if (res.status === 201) {
        setAlertSucces({ error: true, message: res.data.message });
        setTimeout(() => setAlertSucces({ error: false, message: "" }), 10000);
        // Reiniciar los valores de los campos
        setName("");
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
      <div className="  lg:mx-60 md:mx-10 sm:mx-10 my-10 bg-white shadow rounded-lg p-10">
        <form onSubmit={handleSubmit}>
          <h1 className=" font-bold text-2xl text-center text-gray-900  ">
            INSCRIBIR PROYECTO
          </h1>

          {alertError.error && !alertSucces.error && (
            <AlertError message={alertError.message} />
          )}
          {alertSucces.error && <AlertSucces message={alertSucces.message} />}
          <div className=" gap-4 ">
            <div>
              <div className="my-5">
                <label
                  className="uppercase text-gray-600 block  font-bold"
                  htmlFor="nombre"
                  name="nombre"
                  type="text"
                >
                  Nombre del proyecto
                </label>

                <input
                  id="nombre"
                  type="text"
                  placeholder="nombre del proyecto"
                  className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="container mx-auto mt-8">
                <table className="w-full border">
                  <thead>
                    <tr>
                      <th className="border">Nombre</th>
                      <th className="border">Código</th>
                      <th className="border">Correo</th>
                      <th className="border">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {participants.map((participant, index) => (
                      <tr key={index}>
                        <td className="border">{participant.name}</td>
                        <td className="border">{participant.code}</td>
                        <td className="border">{participant.email}</td>
                        <td className="border">
                          <button
                            type="button"
                            onClick={() => handleEditParticipant(index)}
                            className="text-blue-500 mr-2"
                          >
                            Editar
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteParticipant(index)}
                            className="text-red-500"
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="mt-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Nombre"
                    value={newParticipant.name}
                    onChange={handleInputChange}
                    className="border p-2"
                  />
                  <input
                    type="text"
                    name="code"
                    placeholder="Código"
                    value={newParticipant.code}
                    onChange={handleInputChange}
                    className="border p-2 ml-2"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Correo"
                    value={newParticipant.email}
                    onChange={handleInputChange}
                    className="border p-2 ml-2"
                  />
                  <button
                    type="button"
                    onClick={handleAddParticipant}
                    className="bg-blue-500 text-white p-2 ml-2"
                  >
                    {editingIndex !== null
                      ? "Guardar Cambios"
                      : "Agregar Participante"}
                  </button>
                </div>
              </div>
              <div className="my-5">
                <label
                  className="uppercase text-gray-600 block  font-bold"
                  htmlFor="materiales"
                  name="materiales"
                  type="text"
                >
                  Materiales
                </label>

                <textarea
                  id="materiales"
                  type="text"
                  placeholder="escriba los materiales que necesita en el proyecto"
                  className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                />
              </div>
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

export default InscribirProyecto;
