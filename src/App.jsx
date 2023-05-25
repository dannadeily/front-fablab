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

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (token) => {
    setIsAuthenticated(true);
    localStorage.setItem("token", token);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Teclado />} />
          <Route path="login" element={<Login handleLogin={handleLogin} />} />
        </Route>
        <Route
          path="/administrador"
          element={<RutaProtegida isAuthenticated={isAuthenticated} />}
        >
          <Route index element={<Teclado />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
