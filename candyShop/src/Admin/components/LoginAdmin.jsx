import React, { useState, useEffect } from "react";
import "./loginAdmin.scss"
import Button from "../../components/Atoms/Button/Button";
import { Link, redirect, Navigate, useNavigate} from "react-router-dom";
import axios from 'axios';
import endPoints from "../../services/api";
import { useForm } from "../../hooks";

const LoginAdmin = () => {
  const { serialize } = useForm();
  const [correoCliente, setCorreoCliente] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (ev) => {
    ev.preventDefault();
    const formData = serialize(ev.target); // Utiliza serialize para obtener los datos del formulario

    try {
      const response = await axios.post(endPoints.cliente.getLogin,formData,{
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
      <section className="main">
        <figure className="main__figure">
          <div className="logo">
            <img
              src="https://candyshop.publitin.net/redetron/wp-content/uploads/2023/06/logo-v1-01.png"
              className="main__img"
              alt="Logo_candy_shop"
            />
          </div>
        </figure>

        <div className="main__contact">
          <h2 className="main__title">¡Iniciar sesión!</h2>
          <p className="main__paragraph">
          Ingresa tus credenciales.
          </p>

          <form className="main__form" onSubmit={handleLogin}>
            <input
              name="correo_cliente"
              type="email"
              className="main__input rounded-full"
              id="exampleInputEmail1"
              placeholder="Ingresa tu correo"
              onChange={(e) => setCorreoCliente(e.target.value)}

            />
            <input
              name="contrasenia"
              type="password"
              className="main__input rounded-full"
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
