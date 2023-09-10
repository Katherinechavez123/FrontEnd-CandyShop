import React from "react";
import {Link}  from "react-router-dom";
import "./menu.css";
import { BiCart, BiUser, BiSearchAlt } from "react-icons/bi";

function Nav() {
  return (
    <>
      <nav className="flex justify-center space-x-4 mt-20 text-xl">
        <Link
          to="/inicio"
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
          className="font-bold px-3 py-2 text-fuchsia-950  hover:text-pink-600"
        >
          Contacto
        </Link>
        <Link
          to="/login"
          className="font-bold px-3 py-2 text-fuchsia-950  hover:text-pink-600"
        >
          Iniciar sesión
        </Link>

        <BiSearchAlt className="text-3xl text-pink-600  " />
        <BiUser className="text-3xl text-pink-600  " />
        <BiCart className="text-3xl text-pink-600 " />
      </nav>
    </>
  );
}

export default Nav;
