import React from "react";
import "./menu.css";
import {Link } from "react-router-dom";
import Home from "../home/home";
import Productos from "../productos/Productos";
import Contacto from "../contacto/contacto";
import Nosotros from "../nosotros/Nosotros";
import Persolanizar from "../Personalizar/Persolanizar";

function Menu() {
  return (
    <div>
      <header>
        <nav>
          <div>
            <img
              src="https://candyshop.publitin.net/redetron/wp-content/uploads/2023/06/logo-v1-01.png"
              alt="Logo"
              className="logomenu"
            />
          </div>
          <div className="menu">

              <ul>
                <li>
                  <Link to="/">Inicio</Link>
                </li>
                <li>
                  <Link to="/personalizar">Personalizar</Link>
                </li>
                <li>
                  <Link to="/tienda">Tienda</Link>
                </li>
                <li>
                  <Link to="/nosotros">Nosotros</Link>
                </li>
                <li>
                  <Link to="/contacto">Contacto</Link>
                </li>
              </ul>
          </div>
          <div className="iconos">
            <img
              src="https://candyshop.publitin.net/redetron/wp-content/uploads/2023/08/CandyShopPersona.svg"
              alt="Imagen 1"
            />
            <img
              src="https://candyshop.publitin.net/redetron/wp-content/uploads/2023/08/CandyShopBuscar-02.svg"
              alt="Imagen 2"
            />
            <img
              src="https://candyshop.publitin.net/redetron/wp-content/uploads/2023/08/CandyShopCarrito.svg"
              alt="Imagen 3"
            />
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Menu;
