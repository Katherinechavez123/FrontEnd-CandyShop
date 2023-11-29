import React, { useState, useEffect } from "react";
import Button from "../Atoms/Button/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import endPoints from "../../services/api";
import { useForm } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "react-feather";
import "./register.css";
import { FiAlertTriangle } from "react-icons/fi";

const Register = () => {
  const { serialize } = useForm();
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const [nombreCliente, setNombreCliente] = useState("");
  
  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const registerForm = async (ev) => {
    ev.preventDefault();
    const formData = serialize(ev.target);

    try {
      const response = await axios.post(endPoints.cliente.postRegister, formData);

      // Guardar datos de registro en localStorage
      localStorage.setItem("registrationData", JSON.stringify(formData));

      setIsRegistered(true);
      setShowConfirmation(true);

      setTimeout(() => {
        setShowConfirmation(false);
        navigate("/login");
      }, 3000); // Redirigir después de 3 segundos
    } catch (error) {
      if (error.response) {
        setErrorMessage("*Hubo un error en el registro*");
      } else if (error.request) {
        setErrorMessage("No se pudo conectar con el servidor. Inténtalo de nuevo más tarde.");
      } else {
        setErrorMessage("Ocurrió un error desconocido. Por favor, inténtalo de nuevo.");
      }
    }
  };

  useEffect(() => {
    if (isRegistered) {
      setTimeout(() => {
        setShowConfirmation(false);
        navigate("/login");
      }, 5000);
    }
  }, [isRegistered, navigate]);

  return (
    <div>
      <section className="main mt-28 mb-11">
        <figure className="main__figure flex justify-center items-center text-center">
          <div className="logo h-72 w-72 bg-pink-150 rounded-full flex justify-center items-center text-center -mt-12 ">
            <img
              src="https://candyshop.publitin.net/redetron/wp-content/uploads/2023/06/logo-v1-01.png"
              className="main-img -mt-5"
              alt="Logo_candy_shop"
            />
          </div>
        </figure>

        <div className="main__contact">
          <h2 className="main__title text-5xl font-Candylove">¡Bienvenidos!</h2>
          <p className="main__paragraph mt-3">
            Estamos encantados de tenerte aquí y queremos asegurarnos de que tu
            experiencia de compra sea excepcional.
          </p>

          <form className="main__form" onSubmit={registerForm} method="post">
            <input
              name="id_cliente"
              type="text"
              className="rounded-full main__input w-96"
              id="id_cliente"
              placeholder="Ingresa tu documento"
            />
            <input
              name="nombre_cliente"
              type="text"
              className="rounded-full main__input w-96"
              id="nombre_cliente"
              placeholder="Ingresa tu nombre"
            />
            <input
              name="apellido_cliente"
              type="text"
              className="rounded-full main__input w-96"
              id="apellido_cliente"
              placeholder="Ingresa tu apellido"
            />
            <input
              name="direccion_cliente"
              type="text"
              className="rounded-full main__input w-96"
              id="direccion_cliente"
              placeholder="Ingresa tu dirección"
            />
            <input
              name="ciudad_cliente"
              type="text"
              className="rounded-full main__input w-96"
              id="ciudad_cliente"
              placeholder="Ingresa tu ciudad"
            />
            <input
              name="telefono_cliente"
              type="text"
              className="rounded-full main__input w-96"
              id="telefono_cliente"
              placeholder="Ingresa tu telefono"
            />
            <input
              name="correo_cliente"
              type="email"
              className="rounded-full main__input w-96"
              id="correo_cliente"
              placeholder="Ingresa tu correo"
            />
            <div className="password-input-container relative">
              <input
                name="contrasenia"
                type={showPassword ? "text" : "password"}
                className="rounded-full main__input w-96"
                id="contrasenia"
                placeholder="Ingresa tu contraseña"
              />
              <span
                className="password-toggle cursor-pointer absolute top-1/2 transform -translate-y-1/2 right-5"
                onClick={toggleShowPassword}
              >
                {showPassword ? (
                  <EyeOff size={20} className="text-fuchsia-950" />
                ) : (
                  <Eye size={20} className="text-fuchsia-950" />
                )}
              </span>
            </div>
            <div className="password-input-container relative">
              <input
                name="confirmar_contrasenia"
                type={showConfirmPassword ? "text" : "password"}
                className="rounded-full main__input w-96"
                id="confirmar_contrasenia"
                placeholder="Confirma tu contraseña"
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
            {errorMessage && (
              <div className="bg-white text-red-500 font-bold p-2 mt-3 grid grid-flow-col items-center justify-center text-center w-80 rounded-full">
              <FiAlertTriangle className="text-red-500 font-bold text-2xl" />
                {errorMessage}
              </div>
            )}
            <Button type="submit" text="Registrarse" />
            {showConfirmation && (
            <div className="modal-container">
              <div className="modal">
                <img src="https://upload.wikimedia.org/wikipedia/commons/8/86/Purple_check.svg" alt=""  />
                <p>¡Registro exitoso!</p>
              </div>
            </div>
          )}

          </form>

          <p className="link_registro">
            ¿Tienes una cuenta?{" "}
            <Link to="/login" className="text-fuchsia-950">
              Inicia sesión aquí
            </Link>
          </p>
          <p className="main__paragraph">Continuar con</p>

          <article className="main__social">
            <a href="https://www.google.com/?hl=es" className="main__link">
              <img
                src="https://candyshop.publitin.net/redetron/wp-content/uploads/2023/07/google-icon.svg"
                className="main__icon"
                alt="Google"
              />
            </a>
            <a href="https://www.apple.com/co" className="main__link">
              <img
                src="https://candyshop.publitin.net/redetron/wp-content/uploads/2023/07/apple.svg"
                className="main__icon"
                alt="Apple"
              />
            </a>
            <a href="https://www.facebook.com" className="main__link">
              <img
                src="https://candyshop.publitin.net/redetron/wp-content/uploads/2023/07/facebook.svg"
                className="main__icon"
                alt="Facebook"
              />
            </a>
          </article>
        </div>
      </section>
    </div>
  );
};

export default Register;
``;
