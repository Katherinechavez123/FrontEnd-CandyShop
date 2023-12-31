import React, { useEffect } from "react";
import Sidebar from "../../../layouts/SideBar/SideBar";
import NavAdmin from "../../../layouts/NavAdmin/NavAdmin";
import AnchetasAdmin from "../../components/AnchetasAdmin/AnchetasAdmin";
import { useNavigate } from "react-router-dom";

const Anchetas = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar si el usuario está autenticado
    const isAuthenticated = !!localStorage.getItem("token");

    if (!isAuthenticated) {
      // Redirigir al usuario a la página de inicio de sesión
      navigate("/miweb");
    }
  }, [navigate]);

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <NavAdmin />
        <AnchetasAdmin/>
      </div>
    </div>
  );
};

export default Anchetas;
