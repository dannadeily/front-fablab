import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import Header from "./components/Header";
import Teclado from "./pages/Teclado";
import Login from "./pages/Login";
import RutaProtegida from "./rutaProtegida/RutaProtegida";
import RegistrarEstudiante from "./pages/RegistrarEstudiante";
import Carrera from "./pages/Carrera";
import Laboratorio from "./pages/Laboratorio";
import Reporte from "./pages/Reporte";
import LaboratoriosRegistrados from "./pages/LaboratoriosRegistrados";
import ReporteCarrera from "./pages/ReporteCarrera";
import ReporteLaboratorio from "./pages/ReporteLaboratorio";
import TipoDocumento from "./pages/Tipodocumento";
import TipoPoblacion from "./pages/TipoPoblacion";
import Institucion from "./pages/Institucion";
import Cargo from "./pages/Cargo";
import InscribirProyecto from "./pages/InscribirProyecto";
import ReporteProyecto from "./pages/ReporteProyectos";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (token) => {
    setIsAuthenticated(true);
    localStorage.setItem("token", token);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Teclado />} />
          <Route path="login" element={<Login handleLogin={handleLogin} />} />
          <Route path="registrarestudiante" element={<RegistrarEstudiante />} />
          <Route
            path="laboratoriosregistrados"
            element={<LaboratoriosRegistrados />}
          />
          <Route path="inscribirproyecto" element={<InscribirProyecto />} />
        </Route>

        <Route
          path="/administrador"
          element={<RutaProtegida isAuthenticated={isAuthenticated} />}
        >
          <Route index element={<Teclado />} />
          <Route path="carrera" element={<Carrera />} />
          <Route path="laboratorio" element={<Laboratorio />} />
          <Route path="cargo" element={<Cargo />} />
          <Route path="tipodocumento" element={<TipoDocumento />} />
          <Route path="tipopoblacion" element={<TipoPoblacion />} />
          <Route path="institucion" element={<Institucion />} />
          <Route path="reporte" element={<Reporte />} />
          <Route path="reportecarrera" element={<ReporteCarrera />} />
          <Route path="reporteproyecto" element={<ReporteProyecto />} />
          <Route path="reportelaboratorio" element={<ReporteLaboratorio />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
