import React from "react";
import "./menu.css"
import Contacto from "../contacto/contacto";

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
                <a href="#">Inicio</a>
              </li>
              <li>
                <a href="#">Personalizar</a>
              </li>
              <li>
                <a href="#">Tienda</a>
              </li>
              <li>
                <a href="#">Nosotros</a>
              </li>
              <li>
                <a onClick={<Contacto/>}> Contacto</a>
              </li>
            </ul>
          </div>
          <div className="iconos">
            <img src="https://candyshop.publitin.net/redetron/wp-content/uploads/2023/08/CandyShopPersona.svg" alt="Imagen 1" />
            <img
              src="https://candyshop.publitin.net/redetron/wp-content/uploads/2023/08/CandyShopBuscar-02.svg"
              alt="Imagen 2"
            />
            <img src="https://candyshop.publitin.net/redetron/wp-content/uploads/2023/08/CandyShopCarrito.svg" alt="Imagen 3" />
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Menu;
