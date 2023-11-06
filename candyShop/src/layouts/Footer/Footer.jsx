import { FaFacebook, FaWhatsapp, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import Button from "../../components/Atoms/Button/Button";
import Logo from "../../components/menu/Logo";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center">
        <div className="text-fuchsia-950 text-center mr-16">
          <h2 className="text-3xl font-light mb-4 fuente">Accesos Rápidos</h2>
          <Link to="/nosotros" className="text-pink-600 hover:text-cyan-300 block mb-2">Nosotros</Link>
          <Link to="/contacto" className="text-pink-600 hover:text-cyan-300 block mb-2">Contácto</Link>
        </div>
        <div className="text-center">
          {/* Coloca aquí tu logo */}
          <Link to="/">
          <img
            src="https://candyshop.publitin.net/redetron/wp-content/uploads/2023/06/logo-v1-01.png"
            alt="Logo"
            className="w-24 h-20 mx-auto mb-4"
          />
          </Link>
          <div className="container mx-auto flex justify-center items-center text-center">
            <a href="https://www.facebook.com" className="hover:text-cyan-300 mx-3 text-fuchsia-950">
              <FaFacebook size={30} />
            </a>
            <a href="https://www.whatsapp.com/" className="text-fuchsia-950 hover:text-cyan-300 mx-3">
              <FaWhatsapp size={30} />
            </a>
            <a href="https://www.instagram.com" className="text-fuchsia-950 hover:text-cyan-300 mx-3">
              <FaInstagram size={30} />
            </a>
          </div>
        </div>
        <div className="text-fuchsia-950 text-center ml-16">
          <h2 className="text-3xl font-light mb-4 fuente">Información</h2>
          <Link to="/terminos" className="text-pink-600 hover:text-cyan-300 block mb-2">Términos y condiciones</Link>
          <Link to="/politicas" className="text-pink-600 hover:text-cyan-300 block mb-2">Política de privacidad</Link>
        </div>
      </div>
      <div className="text-center text-fuchsia-950 mt-4">
        &copy; 2023 Candy Shop
      </div>
    </footer>
  );
}
