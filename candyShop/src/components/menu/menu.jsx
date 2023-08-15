import React from 'react';
import './menu.css'; // Asegúrate de tener el archivo CSS en la misma ubicación

function Menu() {
    return (
        <div>
            <header>
                <nav>
                    <div>
                        <img src="images/logo-v1-01.png" alt="Logo" className="logo" />
                    </div>
                    <div className="menu">
                        <ul>
                            <li><a href="#">Inicio</a></li>
                            <li><a href="#">Personalizar</a></li>
                            <li><a href="#">Tienda</a></li>
                            <li><a href="#">Nosotros</a></li>
                            <li><a href="#">Contáctanos</a></li>
                        </ul>
                    </div>
                    <div className="iconos">
                        <img src="images/CandyShopPersona.svg" alt="Imagen 1" />
                        <img src="images/CandyShopBuscar-02.svg" alt="Imagen 2" />
                        <img src="images/CandyShopCarrito.svg" alt="Imagen 3" />
                    </div>
                </nav>
            </header>
            <div className="divv"></div>
        </div>
    );
}

export default Menu;