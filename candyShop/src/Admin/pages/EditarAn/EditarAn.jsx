import "./Home.scss";
import Sidebar from "../../../layouts/SideBar/SideBar";
import NavAdmin from "../../../layouts/NavAdmin/NavAdmin";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import EditarAncheta from "../../components/EditarAncheta/EditarAncheta";

const EditarAn = () => {
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
        <EditarAncheta />
      </div>
    </div>
  );
};

export default EditarAn;
