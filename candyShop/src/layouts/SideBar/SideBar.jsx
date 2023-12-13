import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { BiGift } from "react-icons/bi";
import Button from "../../components/Atoms/Button/Button";
import "./SideBar.scss";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogout = () => {
    // Realizar la lógica de cierre de sesión (limpiar localStorage, etc.)
    localStorage.removeItem("token");
    localStorage.removeItem("correo_admin");

    // Redirigir al login después de cerrar sesión
    navigate("/miweb");
  };

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <img
            src="https://candyshop.publitin.net/redetron/wp-content/uploads/2023/06/logo-v1-01.png"
            alt=""
            className="logosidebar"
          />
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <Link to={"/panelAdmin"}>
            <li>
              <DashboardIcon className="icon" />
              <span>Panel</span>
            </li>
          </Link>
          <p className="title">LISTS</p>
          <Link to="/productos-admin" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Productos</span>
            </li>
          </Link>
          <Link to={"/anchetas-admin"}>
            <li>
              <BiGift className="icon" />
              <span>Anchetas</span>
            </li>
          </Link>
          <Link to={"/ventas"}>
            <li>
              <CreditCardIcon className="icon" />
              <span>Ventas</span>
            </li>
          </Link>

          <li onClick={() => setIsLogoutModalOpen(true)}>
            <ExitToAppIcon className="icon" />
            <span>Salir</span>
          </li>
        </ul>
      </div>

      {isLogoutModalOpen && (
        <div className="modal-overlay">
          <div className="logout-modal">
            <h2>¿Estás seguro de que quieres cerrar sesión?</h2>
            <div className="modal-buttons">
              <button
                onClick={() => setIsLogoutModalOpen(false)}
                className="cancel-button"
              >
                Cancelar
              </button>
              <button onClick={handleLogout} className="confirm-button">
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
