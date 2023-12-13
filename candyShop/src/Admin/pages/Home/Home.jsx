import "./Home.scss";
import Sidebar from "../../../layouts/SideBar/SideBar";
import NavAdmin from "../../../layouts/NavAdmin/NavAdmin";
import Panel from "../../components/Panel/Panel";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";



const HomeAdmin = () => {
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
        <Panel/>
        
      </div>
    </div>
  );
};

export default HomeAdmin;
