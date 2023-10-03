import React from "react";
import {Link, redirect, Navigate, useNavigate}  from "react-router-dom";
import "./menu.css";import { BiSearchAlt, BiUser, BiCart } from "react-icons/bi"; // Asegúrate de importar los íconos
import { useState, useEffect } from "react";


function Nav() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Inicialmente, el usuario no ha iniciado sesión
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Verificar si el token está presente en el almacenamiento local
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // Establecer isLoggedIn a true si el token está presente
  }, []);

  const handleMouseEnter = () => {
    setIsMenuOpen(true);
  };

  const handleMouseLeave = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    // Realiza las acciones necesarias para cerrar la sesión, como eliminar el token y redirigir al usuario a la página de inicio de sesión.
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    // También puedes redirigir al usuario a la página de inicio de sesión si lo deseas.
    navigate("/");
  };

  return (
    <>
      <nav className="flex justify-center space-x-4 mt-20 text-xl">
        <Link
          to="/"
          className="font-bold px-3 py-2 text-fuchsia-950  hover:text-pink-600"
        >
          Inicio
        </Link>
        <Link
          to="/catalogo"
          className="font-bold px-3 py-2 text-fuchsia-950  hover:text-pink-600"
        >
          Catálogo
        </Link>
        <Link
          to="/nosotros"
          className="font-bold px-3 py-2 text-fuchsia-950  hover:text-pink-600"
        >
          Nosotros
        </Link>
        <Link
          to="/contacto"
          className="font-bold px-3 py-2 text-fuchsia-950 hover:text-pink-600"
        >
          Contacto
        </Link>

        {!isLoggedIn && (
           <li style={{ listStyleType: 'none' }}><Link to="/login" className="font-bold px-3 py-2 text-fuchsia-950 hover:text-pink-600">Iniciar sesión</Link></li>)}

        {isLoggedIn && (
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <span
              className="font-bold px-3 py-2 text-fuchsia-950 cursor-pointer hover:text-pink-600"
            >
              {localStorage.getItem('correo_cliente')}
            </span>
            {isMenuOpen && (
              <div className="absolute top-full right-0 mt-2 border rounded-lg shadow-md text-fuchsia-950 font-bold hover:text-pink-600">
                <ul>
                  <li>
                    <Link to="/perfil" className="block px-4 py-2 text-fuchsia-950 font-bold hover:text-pink-600">
                      Perfil
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="block w-full px-4 py-2 text-left text-fuchsia-950 font-bold hover:text-pink-600"
                    >
                      Cerrar sesión
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
        <Link to={"/catalogo"}>            
        <BiSearchAlt className="text-3xl text-pink-600" />
        </Link>
        <Link to={"/catalogo"}>   
        <BiUser className="text-3xl text-pink-600" />
        </Link>
        <Link to={"/carrito"}>   
        <BiCart className="text-3xl text-pink-600" />
        </Link>


      
      </nav>
    </>
  );
}

export default Nav;
