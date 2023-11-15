import React, { useState } from "react";
import "./loginAdmin.css"
import Button from "../../../components/Atoms/Button/Button";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import endPoints from "../../../services/api";
import { useForm } from "../../../hooks";

const LoginAdmin = () => {
  const { serialize } = useForm();
  const [correoCliente, setCorreoCliente] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (ev) => {
    ev.preventDefault();
    const formData = serialize(ev.target);

    try {
      const response = await axios.post(endPoints.cliente.getLogin, formData, {
        correo_cliente: correoCliente,
        contrasenia: contrasenia,
      });
      console.log(response);
      const token = response.data.token;

      localStorage.setItem('token', token);
      localStorage.setItem('correo_cliente', correoCliente);

      if (token) {
        navigate("/");
      }
      return null;
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <div>
      <br />
      <br />
      <section className="my-updated-main">
        <figure className="my-updated-figure bg-pink-200">
          <div className="my-updated-logo">
            <img
              src="https://candyshop.publitin.net/redetron/wp-content/uploads/2023/06/logo-v1-01.png"
              className="my-updated-img"
              alt="Logo_candy_shop"
            />
          </div>
        </figure>

        <div className="my-updated-contact">
          <h2 className="my-updated-title">¡Iniciar sesión!</h2>
          <p className="my-updated-paragraph text-base">
            Ingresa tus credenciales.
          </p>

          <form className="my-updated-form" onSubmit={handleLogin}>
            <input
              name="correo_cliente"
              type="email"
              className="my-updated-input rounded-full"
              id="exampleInputEmail1"
              placeholder="Ingresa tu correo"
              onChange={(e) => setCorreoCliente(e.target.value)}
            />
            <input
              name="contrasenia"
              type="password"
              className="my-updated-input rounded-full"
              id="exampleInputPassword1"
              placeholder="Ingresa tu contraseña"
              onChange={(e) => setContrasenia(e.target.value)}
            />

            <Button text="Ingresar" type="submit" />
          </form>

          <br />
        </div>
      </section>
    </div>
  );
};

export default LoginAdmin;
