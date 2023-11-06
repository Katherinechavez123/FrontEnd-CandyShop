import React, { useState } from "react";
import Button from "../Atoms/Button/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import endPoints from "../../services/api";
import { useForm } from "../../hooks";
import { Eye, EyeOff } from "react-feather";

const Login = () => {
  const [showIncorrectPasswordAlert, setShowIncorrectPasswordAlert] = useState(false);
  const { serialize } = useForm();
  const [correoCliente, setCorreoCliente] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Estado para mostrar/ocultar confirmar contraseña

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const handleLogin = async (ev) => {
    ev.preventDefault();
    const formData = serialize(ev.target);

    try {
      const response = await axios.post(endPoints.cliente.getLogin, formData);

      const token = response.data.token;

      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("correo_cliente", correoCliente);
        navigate("/"); // Redirige al usuario a la página principal después de iniciar sesión
      } else {
        // Respuesta del servidor indica contraseña incorrecta, muestra la alerta
        setShowIncorrectPasswordAlert(true);
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  return (
    <div>
      <section className="main mt-32 mb-11">
        <figure className="main__figure ">
          <div className="logo h-72 w-72 bg-pink-150 rounded-full mt-44">
            <img
              src="https://candyshop.publitin.net/redetron/wp-content/uploads/2023/06/logo-v1-01.png"
              className="main__img w-full max-w-60vw  "
              alt="Logo_candy_shop"
            />
          </div>
        </figure>

        <div className="main__contact">
          <h2 className="main__title text-5xl font-Candylove">
            ¡Iniciar sesión!
          </h2>
          <p className="main__paragraph mt-3">
            ¡Bienvenido/a de vuelta! Por favor, ingresa tus credenciales para
            iniciar sesión en nuestra página.
          </p>

          <form
            className="main__form grid justify-items-center gap-6 mt-3"
            onSubmit={handleLogin}
          >
            <input
              name="correo_cliente"
              type="email"
              className="main__input outline-none border-none p-4 font-inherit rounded-full w-96 h-10"
              id="exampleInputEmail1"
              placeholder="Ingresa tu correo"
              onChange={(e) => setCorreoCliente(e.target.value)}
            />
            <div className="password-input-container relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="contrasenia"
                className="main__input w-96 h-10 outline-none border-none p-4 font-inherit rounded-full"
                id="exampleInputPassword1"
                placeholder="Ingresa tu contraseña"
                onChange={(e) => setContrasenia(e.target.value)}
              />
              <span
                className="password-toggle cursor-pointer absolute top-1/2 transform -translate-y-1/2 right-5"
                onClick={toggleShowConfirmPassword}
              >
                {showConfirmPassword ? (
                  <EyeOff size={20} className="text-fuchsia-950" />
                ) : (
                  <Eye size={20} className="text-fuchsia-950" />
                )}
              </span>
            </div>

            <Button text="Ingresar" type="submit" />
          </form>

          {showIncorrectPasswordAlert && (
  <div className="bg-red-500 text-white p-2 mt-3">
    Contraseña incorrecta. Por favor, inténtalo de nuevo.
  </div>
)}


          <p className="link_registro mt-3">
            ¿No tienes una cuenta?{" "}
            <a href="/register" className="text-fuchsia-950">
              Registrate aquí
            </a>
          </p>
          <p className="main__paragraph mt-3">Continuar con</p>

          <article className="main__social grid grid-auto-flow-col justify-content-center grid-auto-columns-max-content gap-6">
            <a
              href="https://www.google.com/?hl=es"
              className="main__link border border-white rounded-10px p-2"
            >
              <img
                src="https://candyshop.publitin.net/redetron/wp-content/uploads/2023/07/google-icon.svg"
                className="main__icon w-30 h-30"
                alt="Google"
              />
            </a>
            <a
              href="https://www.apple.com/co"
              className="main__link border border-white rounded-10px p-2"
            >
              <img
                src="https://candyshop.publitin.net/redetron/wp-content/uploads/2023/07/apple.svg"
                className="main__icon w-30 h-30"
                alt="Apple"
              />
            </a>
            <a
              href="https://www.facebook.com"
              className="main__link border border-white rounded-10px p-2"
            >
              <img
                src="https://candyshop.publitin.net/redetron/wp-content/uploads/2023/07/facebook.svg"
                className="main__icon w-30 h-30"
                alt="Facebook"
              />
            </a>
          </article>
        </div>
      </section>
    </div>
  );
};

export default Login;
