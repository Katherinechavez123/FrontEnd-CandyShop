import React, { useState } from "react";
import Button from "../../../components/Atoms/Button/Button";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import endPoints from "../../../services/api";
import { useForm } from "../../../hooks";
import "./loginAdmin.css"


const Login= () => {
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
    <>
    <div>
      <br />
      <br />

      <section className="my-updated-main" >
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
    </>
  );
};

export default Login;
