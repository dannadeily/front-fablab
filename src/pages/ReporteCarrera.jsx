import React, { useState, useEffect } from "react";
import conexionAxios from "../axios/Axios";
import {
  PDFDownloadLink,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";

const ReportesPDF = ({ data }) => {
  const styles = StyleSheet.create({
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 20,
    },
    logo: {
      width: 50,
      height: 50,
    },
    reportName: {
      fontSize: 18,
      fontWeight: "bold",
    },
    date: {
      fontSize: 12,
    },
    page: {
      fontFamily: "Helvetica",
      fontSize: 12,
      paddingTop: 30,
      paddingLeft: 60,
      paddingRight: 60,
      paddingBottom: 30,
    },
    section: {
      marginBottom: 10,
    },
    table: {
      display: "table",
      width: "auto",
      borderStyle: "solid",
      borderWidth: 1,
      borderRightWidth: 0,
      borderBottomWidth: 0,
      tableLayout: "auto",
    },
    tableRow: {
      flexDirection: "row",
      borderBottomWidth: 1,
    },
    tableCol: {
      width: "20%",
      borderStyle: "solid",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
    },
    tableCell: {
      marginTop: 5,
      fontSize: 10,
      padding: 5,
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <View style={styles.header}>
            <Text style={styles.reportName}>Reporte por carrera</Text>
            <Text style={styles.date}>
              {new Date().toLocaleString("es-ES", {
                timeZone: "UTC",
                hour12: false,
              })}
            </Text>
          </View>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Documento</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Nombre</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Email</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Laboratorio</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Fecha</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Hora</Text>
              </View>
            </View>
            {data.map((item) => (
              <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{item.user.document}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    {item.user.name} {item.user.lastname}{" "}
                  </Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{item.user.email}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{item.laboratory.name}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{item.fecha}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{item.hora}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

const ReporteCarrera = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [academyProgramId, setAcademyProgramId] = useState([]);
  const [carrera, setCarrera] = useState([]);
  const [dataReporte, setDataReporte] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await conexionAxios.post("/reportbyAcademyProgram", {
        startDate,
        endDate,
        academyProgramId,
      });

      if (res.status === 200) {
        console.log(res.data);
        // Reiniciar los valores de los campos
        setDataReporte(res.data);
      }
    } catch (error) {
      // Manejar el error de la solicitud
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await conexionAxios.get("/academyProgram");
        setCarrera(response.data.message);
        setAcademyProgramId(response.data.message[0].id);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (event) => {
    setAcademyProgramId(event.target.value);
  };

  return (
    <div>
      <div className="px-10">
        <div className="mb-4">
          <h1 className="text-2xl font-bold ">Reporte por carreras</h1>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center items-center">
          <div className="mr-4">
            <label className="block text-gray-700 font-bold mb-2">Inicio</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Fin</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>

        <div className="md:w-1/2 lg:w-3/5 mx-auto my-5">
          <div>
            <label
              className="uppercase text-gray-600 block font-bold"
              htmlFor="docente"
              name="docente"
              type="text"
            >
              Seleccione la carrera:
            </label>

            <div className="relative pb-4">
              <select
                className="block appearance-none w-full border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 bg-white"
                onChange={handleChange}
                value={academyProgramId}
                name="carrera"
                label="carrera"
              >
                {carrera.map((carreraItem) => (
                  <option key={carreraItem.id} value={carreraItem.id}>
                    {carreraItem.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M6 8l4 4 4-4H6z" />
                </svg>
              </div>
            </div>
            <input
              type="submit"
              value="Consultar"
              className="bg-blue-500 mb-5 w-full py-2 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
            />
          </div>
        </div>
      </form>

      {dataReporte && dataReporte.length ? (
        <div className="md:w-1/2 lg:w-3/5 md:h-screen mx-auto my-5">
          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Documento
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Nombre
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Email
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Laboratorio
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Fecha
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Hora
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {dataReporte.map((item) => (
                        <tr key={item.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {item.user.document}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {item.user.name} {item.user.lastname}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {item.user.email}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {item.laboratory.name}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {item.fecha}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {item.hora}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-5">
              <PDFDownloadLink
                document={<ReportesPDF data={dataReporte} />}
                fileName="reporte.pdf"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Descargar Reporte
              </PDFDownloadLink>
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-4">
          <div className="px-10 py-5"></div>
          <p className="text-xl mt-5 mb-10 text-center">
            No hay reprotes en el rango de fecha establecido
          </p>
        </div>
      )}
    </div>
  );
};

export default ReporteCarrera;
