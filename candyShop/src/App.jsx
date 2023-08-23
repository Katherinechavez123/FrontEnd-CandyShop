import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./components/register/register";
import Login from "./components/login/login";
import Contacto from "./components/contacto/contacto";
import Menu from "./components/menu/menu";
import Home from "./components/home/home";
import Productos from "./components/productos/Productos";
import LlenarDatos from "./components/LlenarDatos/LlenarDatos";
import VerDetalle from "./components/verDetalle/VerDetalle";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/inicio" />} />
      <Route
        path="/inicio"
        element={
          <>
            <Menu />
            <Home />

          </>
        }
      />
      <Route path="/" element={<Navigate to="/register" />} />
      <Route
        path="/register"
        element={
          <>
            <Menu />
            <Register />
          </>
        }
      />
      <Route path="/" element={<Navigate to="/login" />} />
      <Route
        path="/login"
        element={
          <>
            <Menu />
            <Login />
          </>
        }
      />
      <Route path="/" element={<Navigate to="/contacto" />} />
      <Route
        path="/contacto"
        element={
          <>
            <Menu />
            <Contacto />
          </>
        }
      />
      <Route path="/" element={<Navigate to="/Catalogo" />} />
      <Route
        path="/Catalogo"
        element={
          <>
            <Menu />
            <Productos />
          </>
        }
      />
      <Route path="/" element={<Navigate to="/Perfil" />} />
      <Route
        path="/Perfil"
        element={
          <>
            <Menu />
            <LlenarDatos />
          </>
        }
      />
      <Route path="/" element={<Navigate to="/Detalle" />} />
      <Route
        path="/Detalle"
        element={
          <>
            <Menu />
            <VerDetalle />
          </>
        }
      />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
