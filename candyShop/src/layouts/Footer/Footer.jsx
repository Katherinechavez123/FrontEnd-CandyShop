/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/ 
import { FaFacebook, FaWhatsapp, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import Button from "../../components/Atoms/Button/Button";
import Logo from "../../components/menu/Logo";
import "./Footer.css"

export default function Footer() {
  return (
    <>
      <br />
      <br /> <br />
      <br /> <br />
      <br />
      <br /> <br />
      <br /> <br />
      <br />
      <footer className="bg-pink-200 text-white py-8">
        <div className="container mx-auto flex flex-col items-center md:flex-row">
          <div className="flex-1 md:text-center mb-4 md:mb-0 text-fuchsia-950">
            <br /><br />
            <h2 className="text-2xl font-semibold fuente">Accesos Rápidos</h2>
            <br />
            <Link to="/catalogo">Catálogo</Link>
            <br />
            <Link to="/contacto">Blog</Link>
            <br />
            <Link to="/contacto">Términos y condiciones</Link>
            <br />
            <Link to="/contacto">Política de privacidad</Link>
          </div>
          <div className="flex-1 text-center">
            {/* Coloca aquí tu logo */}
            <img
              src="https://candyshop.publitin.net/redetron/wp-content/uploads/2023/06/logo-v1-01.png"
              alt="Logo"
              className="w-29 h-24 mx-auto mb-4"
            />
            <div className="container mx-auto flex justify-center items-center">
              <br />
              <a href="#" className="text-pink-600 hover:text-cyan-300 mx-3">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="text-pink-600 hover:text-cyan-300 mx-3">
                <FaWhatsapp size={24} />
              </a>
              <a href="#" className="text-pink-600 hover:text-cyan-300 mx-3">
                <FaInstagram size={24} />
              </a>
            </div>
          </div>
          <div className="flex-1 md:text-center text-fuchsia-950">
            <h2 className="text-2xl text-fuchsia-950 font-semibold fuente">
              Información
            </h2>
            <br />
            <Link to="/contacto">Términos y condiciones</Link>
            <br />
            <Link to="/contacto">Política de privacidad</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
