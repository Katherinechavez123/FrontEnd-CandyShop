import React, { useState, useEffect } from "react";
import "./register.css";
import Button from "../Atoms/Button/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import endPoints from "../../services/api";
import { useForm } from "../../hooks";
import { useNavigate } from "react-router-dom";
import Modal from "../../layouts/Modal/Modal";

const Register = () => {
  const { serialize } = useForm();
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [registroExitoso, setRegistroExitoso] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleRegistroExitoso = () => {
    setRegistroExitoso(true);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const registerForm = async (ev) => {
    ev.preventDefault();
    const formData = serialize(ev.target);

    try {
      const response = await axios.post(
        endPoints.cliente.postRegister,
        formData
      );
      setIsRegistered(true);
      handleRegistroExitoso();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isRegistered) {
      navigate("/login");
      setShowConfirmation(true);

      setTimeout(() => {
        setShowConfirmation(false);
      }, 5000);
    }
  }, [isRegistered]);

  return (
    <div>
      <br />
      <br />
      <section className="main">
        <figure className="main__figure">
          <div className="logo">
            <img
              src="https://candyshop.publitin.net/redetron/wp-content/uploads/2023/06/logo-v1-01.png"
              className="main-img "
              alt="Logo_candy_shop"
            />
          </div>
        </figure>

        <div className="main__contact">
          <h2 className="main__title">¡Bienvenidos!</h2>
          <p className="main__paragraph">
            Estamos encantados de tenerte aquí y queremos asegurarnos de que tu
            experiencia de compra sea excepcional.
          </p>

          <form className="main__form" onSubmit={registerForm} method="post">
            <input
              name="id_cliente"
              type="text"
              className="rounded-full main__input"
              id="id_cliente"
              placeholder="Ingresa tu documento"
            />
            <input
              name="nombre_cliente"
              type="text"
              className="rounded-full main__input"
              id="nombre_cliente"
              placeholder="Ingresa tu nombre"
            />
            <input
              name="apellido_cliente"
              type="text"
              className="rounded-full main__input"
              id="apellido_cliente"
              placeholder="Ingresa tu apellido"
            />
            <input
              name="direccion_cliente"
              type="text"
              className="rounded-full main__input"
              id="direccion_cliente"
              placeholder="Ingresa tu dirección"
            />
            <input
              name="ciudad_cliente"
              type="text"
              className="rounded-full main__input"
              id="ciudad_cliente"
              placeholder="Ingresa tu ciudad"
            />
            <input
              name="telefono_cliente"
              type="text"
              className="rounded-full main__input"
              id="telefono_cliente"
              placeholder="Ingresa tu telefono"
            />
            <input
              name="correo_cliente"
              type="email"
              className="rounded-full main__input"
              id="correo_cliente"
              placeholder="Ingresa tu correo"
            />
            <div className="password-input-container">
              <input
                name="contrasenia"
                type={showPassword ? "text" : "password"}
                className="rounded-full main__input" // Añade la misma clase de estilo para el campo de contraseña
                id="contrasenia"
                placeholder="Ingresa tu contraseña"
              />
              <span className="password-toggle" onClick={toggleShowPassword}>
                {showPassword ? "Ocultar" : "Mostrar"}
              </span>
            </div>
            {showConfirmation && <div>Mensaje de confirmación</div>}
            <Button type="submit" text="Registrarse" />
          </form>

          <br />

          <p className="link_registro">
            ¿Tienes una cuenta?{" "}
            <Link to="/login" className="text-fuchsia-950">
              Inicia sesión aquí
            </Link>
          </p>
          <p className="main__paragraph">Continuar con</p>

          <article className="main__social">
            <a href="#" className="main__link">
              {/* ...iconos de redes sociales */}
            </a>
          </article>
        </div>
      </section>
      <Modal
        isOpen={isModalOpen}
        message="Registro exitoso"
        onClose={closeModal}
      />
    </div>
  );
};

export default Register;
