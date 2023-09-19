import { BrowserRouter, Routes, Route, Navigate, Link} from "react-router-dom";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import Contacto from "./components/contacto/Contacto";
import Header from "./layouts/Header/Header";
import Home from "./pages/Home/Home";
import Productos from "./components/productos/Productos";
import LlenarDatos from "./components/LlenarDatos/LlenarDatos";
import VerDetalle from "./components/verDetalle/VerDetalle";
import Footer from "./layouts/Footer/Footer";
import Nosotros from "./components/nosotros/Nosotros";
import Compra from "./components/Compra/Compra";

function App() {
  return (
    <>
      <BrowserRouter>
      <Header />
        <Routes>

          <Route
            path="/"
            element={
              <>
                <Home />
              </>
            }
          />

          <Route
            path="/register"
            element={
              <>
                <Register />
              </>
            }
          />

          <Route
            path="/login"
            element={
              <>
                <Login />
              </>
            }
          />

          <Route
            path="/nosotros"
            element={
              <>
                <Nosotros />
              </>
            }
          />

          <Route
            path="/contacto"
            element={
              <>
                <Contacto />
              </>
            }
          />

          <Route
            path="/Catalogo"
            element={
              <>
                <Productos />
              </>
            }
          />

          <Route
            path="/Perfil"
            element={
              <>
                <LlenarDatos />
              </>
            }
          />

          <Route
            path="/Detalle/:id_ancheta"
            element={
              <>
                <VerDetalle />
              </>
            }
          />
                   <Route
            path="/compra/:id_ancheta"
            element={
              <>
                <Compra />
              </>
            }
          />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
