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
        </Route>
        <Route
          path="/administrador"
          element={<RutaProtegida isAuthenticated={isAuthenticated} />}
        >
          <Route index element={<Teclado />} />
          <Route path="carrera" element={<Carrera />} />
          <Route path="laboratorio" element={<Laboratorio />} />
          <Route path="reporte" element={<Reporte />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
