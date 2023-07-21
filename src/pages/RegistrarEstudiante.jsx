import React, { useState, useEffect } from "react";
import AlertError from "../components/AlertError";
import AlertSucces from "../components/AlertSucces";
import conexionAxios from "../axios/Axios";

const RegistrarEstudiante = () => {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [code, setCode] = useState("");
  
  const [document, setDocument] = useState("");
  const [idAcademyProgram, setIdAcademyProgram] = useState([]);
  const [idDocumentType, setIdDocumentType] = useState([]);
  const [idRole, setIdRole] = useState([]);
  const [idPopulation, setIdPopulation] = useState([]);
  const [idInstitucion, setIdInstitucion] = useState([]);
  const [birthDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [esMenorEdad, setEsMenorEdad] = useState(false);
  const [] = useState("");
  const [] = useState("");

  const [academyProgram, setAcademyProgram] = useState([]);
  const [documentType, setDocumentType] = useState([]);
  const [roles, setRoles] = useState([]);
  const [population, setPopulation] = useState([]);
  const [institucion, setInstitucion] = useState([]);

  const handleFechaNacimientoChange = (e) => {
    setBirthDate(e.target.value);

    // Calcula la edad en base a la fecha de nacimiento ingresada
    const fechaActual = new Date();
    const fechaIngresada = new Date(e.target.value);
    const edad = fechaActual.getFullYear() - fechaIngresada.getFullYear();

    // Verifica si es menor de edad
    if (edad < 18) {
      setEsMenorEdad(true);
      setEmail("");
      setPhone("");
    } else {
      setEsMenorEdad(false);
    }
  };

  const [alertError, setAlertError] = useState({ error: false, message: "" });
  const [alertSucces, setAlertSucces] = useState({
    error: false,
    message: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseAcademyProgram = await conexionAxios.get("/academyProgram");
        setAcademyProgram(responseAcademyProgram.data.message);
        setIdAcademyProgram(responseAcademyProgram.data.message[0].id);
        const responseDocumetType = await conexionAxios.get("/documentsTypes/enable");
        setDocumentType(responseDocumetType.data);
        setIdDocumentType(responseDocumetType.data[0].id);
        const responseRole = await conexionAxios.get("/role/enable");
        setRoles(responseRole.data);
        setIdRole(responseRole.data[0].id);
        const responsePopulation = await conexionAxios.get("/populationTypes/enable");
        setPopulation(responsePopulation.data);
        setIdPopulation(responsePopulation.data[0].id);
        const responseInstitucion = await conexionAxios.get("/institution/enable");
        setInstitucion(responseInstitucion.data);
        setIdInstitucion(responseInstitucion.data[0].id);
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
        idDocumentType,
        idRole,
        idPopulation,
        birthDate,
        phone
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
      <div className="  lg:mx-60 md:mx-10 sm:mx-10 my-10 bg-white shadow rounded-lg p-10">
        <form onSubmit={handleSubmit}>
          <h1 className=" font-bold text-2xl text-center text-gray-900  ">
            REGISTRAR ESTUDIANTE
          </h1>

          {alertError.error && !alertSucces.error && (
            <AlertError message={alertError.message} />
          )}
          {alertSucces.error && <AlertSucces message={alertSucces.message} />}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
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
                  htmlFor="codigo"
                  name="codigo"
                  type="text"
                >
                  codigo
                </label>
                <input
                  id="codigo"
                  type="text"
                  placeholder="codigo"
                  className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />
              </div>
              <div className="my-5">
                <label
                  className="uppercase text-gray-600 block  font-bold"
                  htmlFor="grid-state"
                >
                  Tipo de documento
                </label>
                <div className="relative">
                  <select
                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    onChange={(e) => setIdDocumentType(e.target.value)}
                    name="documentType"
                    label="documentType"
                  >
                    {documentType.map((document) => (
                      <option key={document.id} value={document.id}>
                        {document.name}
                      </option>
                    ))}
                  </select>
                </div>
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
                  className="uppercase text-gray-600 block  font-bold"
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
            </div>
            <div>
              <div className="my-5">
                <label
                  className="uppercase text-gray-600 block font-bold"
                  htmlFor="date"
                  name="date"
                  type="number"
                >
                  Fecha de nacimiento
                </label>
                <input
                  id="date"
                  type="date"
                  placeholder="documento"
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  value={birthDate}
                  onChange={handleFechaNacimientoChange}
                />
              </div>
              <div className="my-5">
                <label
                  className="uppercase text-gray-600 block font-bold"
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
                  className={`w-full mt-3 p-3 border rounded-xl bg-gray-50 ${
                    !birthDate || esMenorEdad ? "cursor-not-allowed" : ""
                  }`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={!birthDate || esMenorEdad}
                />
              </div>
              <div className="my-5">
                <label
                  className="uppercase text-gray-600 block font-bold"
                  htmlFor="celular"
                  name="celular"
                >
                  Celular
                </label>
                <input
                  id="celular"
                  type="number"
                  placeholder="Celular"
                  className={`w-full mt-3 p-3 border rounded-xl bg-gray-50 ${
                    !birthDate || esMenorEdad ? "cursor-not-allowed" : ""
                  }`}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={!birthDate || esMenorEdad}
                />
              </div>
              <div className="my-5">
                <label
                  className="uppercase text-gray-600 block  font-bold"
                  htmlFor="grid-state"
                >
                  Institucion
                </label>
                <div className="relative">
                  <select
                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    onChange={(e) => setIdInstitucion(e.target.value)}
                    name="institution"
                    label="institution"
                  >
                    {institucion.map((institucioPos) => (
                      <option key={institucioPos.id} value={institucioPos.id}>
                        {institucioPos.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="my-5">
                <label
                  className="uppercase text-gray-600 block  font-bold"
                  htmlFor="grid-state"
                >
                  Cargo{" "}
                </label>
                <div className="relative">
                  <select
                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    onChange={(e) => setIdRole(e.target.value)}
                    name="academyProgram"
                    label="academyProgram"
                  >
                    {roles.map((rol) => (
                      <option key={rol.id} value={rol.id}>
                        {rol.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="my-5">
                <label
                  className="uppercase text-gray-600 block  font-bold"
                  htmlFor="grid-state"
                >
                  ¿A que poblacion pertenece?{" "}
                </label>
                <div className="relative">
                  <select
                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    onChange={(e) => setIdAcademyProgram(e.target.value)}
                    name="academyProgram"
                    label="academyProgram"
                  >
                    {population.map((poblacion) => (
                      <option key={poblacion.id} value={poblacion.id}>
                        {poblacion.name}
                      </option>
                    ))}
                  </select>
                </div>
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

export default RegistrarEstudiante;
