import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./components/register/register";
import Login from "./components/login/login";
import Contacto from "./components/contacto/contacto";
import Menu from "./components/menu/menu";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route
          path="/register"
          element={
            <>
                <Menu/>
              <Register />
            </>
          }
        />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path="/login"
          element={
            <>
                <Menu/>
              <Login />
            </>
          }
          />
            <Route path="/" element={<Navigate to="/contacto" />} />
            <Route
              path="/contacto"
              element={
                <>
                    <Menu/>
                  <Contacto />
                </>
              }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
