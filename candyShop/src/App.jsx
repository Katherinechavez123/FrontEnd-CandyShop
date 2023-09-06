import { BrowserRouter, Routes, Route, Navigate, Link} from "react-router-dom";
import Register from "./components/register/register";
import Login from "./components/login/login";
import Contacto from "./components/contacto/contacto";
import Header from "./layouts/Header/Header";
import Home from "./pages/Home/Home";
import Productos from "./components/productos/Productos";
import LlenarDatos from "./components/LlenarDatos/LlenarDatos";
import VerDetalle from "./components/verDetalle/VerDetalle";

function App() {
  return (
    <>
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/inicio" />} />
          <Route
            path="/inicio"
            element={
              <>
                <Home />
              </>
            }
          />
          <Route path="/" element={<Navigate to="/register" />} />
          <Route
            path="/register"
            element={
              <>
                <Register />
              </>
            }
          />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route
            path="/login"
            element={
              <>
                <Login />
              </>
            }
          />
          <Route path="/" element={<Navigate to="/contacto" />} />
          <Route
            path="/contacto"
            element={
              <>
                <Contacto />
              </>
            }
          />
          <Route path="/" element={<Navigate to="/Catalogo" />} />
          <Route
            path="/Catalogo"
            element={
              <>
                <Productos />
              </>
            }
          />
          <Route path="/" element={<Navigate to="/Perfil" />} />
          <Route
            path="/Perfil"
            element={
              <>
                <LlenarDatos />
              </>
            }
          />
          <Route path="/" element={<Navigate to="/Detalle" />} />
          <Route
            path="/Detalle"
            element={
              <>
                <VerDetalle />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
