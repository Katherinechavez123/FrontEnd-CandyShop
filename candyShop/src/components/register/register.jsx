import React from "react";
import "./register.css";
import Button from "../Atoms/Button/Button";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import endPoints from "../../services/api";
import { useForm } from "../../hooks";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { serialize } = useForm(); // Llama al hook useForm para obtener la función serialize
  const navigate = useNavigate();
  const [register, setRegister] = useState([]);
  const [isRegistered, setIsRegistered] = useState(false); // Ejemplo: estado para verificar si el registro se completó
  const [showConfirmation, setShowConfirmation] = useState(false); // Estado para mostrar un mensaje de confirmación



  const registerForm = async (ev) => {
    ev.preventDefault();
    const formData = serialize(ev.target); // Utiliza serialize para obtener los datos del formulario
    console.log(formData);

    try {
      const response = await axios.post(endPoints.cliente.postRegister, formData);
      setRegister(response.data);
      setIsRegistered(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Verificar si el registro se completó (esto puede depender de tu lógica específica)
    if (isRegistered) {
      // Redirigir al usuario a la página de inicio o a otra página deseada
      navigate("/login");

      // Mostrar un mensaje de confirmación (puedes personalizarlo según tus necesidades)
      setShowConfirmation(true);

      // Después de un tiempo, ocultar el mensaje de confirmación
      setTimeout(() => {
        setShowConfirmation(false);
      }, 5000); // Por ejemplo, ocultar después de 5 segundos
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
            <input
              name="contrasenia"
              type="password"
              className="rounded-full main__input"
              id="contrasenia"
              placeholder="Ingresa tu contraseña"
            />
                  {showConfirmation && <div>Mensaje de confirmación</div>}
            <Button type="submit" text="Registrarse" />
          </form>

          <br />

          <p className="link_registro">
            ¿Tienes una cuenta?{" "}
            <a href="/login" className="text-fuchsia-950">
              Inicia sesión aquí
            </a>
          </p>
          <p className="main__paragraph">Continuar con</p>

          <article className="main__social">
            <a href="#" className="main__link">
              <img
                src="https://candyshop.publitin.net/redetron/wp-content/uploads/2023/07/google-icon.svg"
                className="main__icon"
                alt="Google"
              />
            </a>
            <a href="#" className="main__link">
              <img
                src="https://candyshop.publitin.net/redetron/wp-content/uploads/2023/07/apple.svg"
                className="main__icon"
                alt="Apple"
              />
            </a>
            <a href="#" className="main__link">
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
