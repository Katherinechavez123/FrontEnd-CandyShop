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
import { FaFacebook, FaWhatsapp, FaInstagram } from "react-icons/fa";

const Register = () => {
  const { serialize } = useForm();
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

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

    // Validación de la contraseña
    const contraseña = formData.contrasenia;
    const tieneMayuscula = /[A-Z]/.test(contraseña);
    const tieneMinuscula = /[a-z]/.test(contraseña);
    const tieneNumero = /\d/.test(contraseña);
    const tieneEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(contraseña);

    if (!(tieneMayuscula && tieneMinuscula && tieneNumero && tieneEspecial)) {
      setErrorMessage("Formato de contraseña incorrecto.");
      return;
    }
    if (formData.contrasenia !== formData.confirmar_contrasenia) {
      setPasswordError("Las contraseñas no coinciden.");
      return;
    } else {
      setPasswordError(""); // Reiniciar el mensaje de error si las contraseñas coinciden
    }
      // Validar campos obligatorios
  const requiredFields = ["id_cliente", "nombre_cliente", "direccion_cliente", "ciudad_cliente", "telefono_cliente", "correo_cliente", "contrasenia", "confirmar_contrasenia"];
  const emptyFields = requiredFields.filter(field => !formData[field]);

  if (emptyFields.length > 0) {
    setErrorMessage("Todos los campos son obligatorios.");
    return;
  } else {
    setErrorMessage(""); // Reiniciar el mensaje de error si todos los campos están llenos
  }
    try {
      const response = await axios.post(
        endPoints.cliente.postRegister,
        formData
      );

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
        setErrorMessage("Hubo un error en el registro");
      } else if (error.request) {
        setErrorMessage(
          "No se pudo conectar con el servidor. Inténtalo de nuevo más tarde."
        );
      } else {
        setErrorMessage(
          "Ocurrió un error desconocido. Por favor, inténtalo de nuevo."
        );
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
              placeholder="Ingresa tu documento*"
            />
            <input
              name="nombre_cliente"
              type="text"
              className="rounded-full main__input w-96"
              id="nombre_cliente"
              placeholder="Ingresa tu nombre*"
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
              placeholder="Ingresa tu dirección*"
            />
            <input
              name="ciudad_cliente"
              type="text"
              className="rounded-full main__input w-96"
              id="ciudad_cliente"
              placeholder="Ingresa tu ciudad*"
            />
            <input
              name="telefono_cliente"
              type="text"
              className="rounded-full main__input w-96"
              id="telefono_cliente"
              placeholder="Ingresa tu telefono*"
            />
            <input
              name="correo_cliente"
              type="email"
              className="rounded-full main__input w-96"
              id="correo_cliente"
              placeholder="Ingresa tu correo*"
            />
            <div className="password-input-container relative">
              <input
                name="contrasenia"
                type={showPassword ? "text" : "password"}
                className="rounded-full main__input w-96"
                id="contrasenia"
                placeholder="Ingresa tu contraseña*"
                onChange={(e) => setErrorMessage("")}
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
                placeholder="Confirma tu contraseña*"
                onChange={(e) => setConfirmPassword(e.target.value)}
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
            {passwordError && (
                <div className="bg-white text-red-500 font-bold p-2 mt-3 grid grid-flow-col items-center justify-center text-center w-80 rounded-full">
                  <FiAlertTriangle className="text-red-500 font-bold text-2xl" />
                  {passwordError}
                </div>
              )}
            {errorMessage && (
              <div className="bg-white text-red-500 font-bold p-2 mt-3 grid grid-flow-col items-center justify-center text-center w-80 rounded-full">
                <FiAlertTriangle className="text-red-500 font-bold text-2xl" />
                {errorMessage}
              </div>
            )}{" "}
            <span className="text-xs">
              *La contraseña debe de contener al menos una letra mayúscula, una
              letra minúscula, un número y un carácter especial, y mínimo 8
              caracteres*
            </span>
            <Button type="submit" text="Registrarse" />
            {showConfirmation && (
              <div className="modal-container">
                <div className="modal">
                  <img
                    src="http://localhost:10101/img/newProductoPersonalizado-1702394377617.png"
                    alt=""
                  />
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
          <p className="main__paragraph">Encuéntranos en:</p>

          <article className="main__social">
            <a
              href="https://www.facebook.com"
              className="hover:text-pink-600 mx-3 text-fuchsia-950"
            >
              <FaFacebook size={30} />
            </a>
            <a
              href="https://www.whatsapp.com/"
              className="text-fuchsia-950 hover:text-pink-600 mx-3"
            >
              <FaWhatsapp size={30} />
            </a>
            <a
              href="https://www.instagram.com"
              className="text-fuchsia-950 hover:text-pink-600 mx-3"
            >
              <FaInstagram size={30} />
            </a>
          </article>
        </div>
      </section>
    </div>
  );
};

export default Register;
``;
