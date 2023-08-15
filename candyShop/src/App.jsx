import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./components/register/register";
import Login from "./components/login/login";
import Contacto from "./components/contacto/contacto";
import Menu from "./components/menu/menu";

import "./App.css";

function App() {
  return (
    <>
    <Menu/>
    <BrowserRouter>
      <Routes>
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
                <Login />
              </>
            }
        />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
