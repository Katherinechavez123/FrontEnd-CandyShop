import React, { useState } from "react";
import Button from "../../../components/Atoms/Button/Button";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import endPoints from "../../../services/api";
import { useForm } from "../../../hooks";
import "./loginAdmin.css";

const Login = () => {
  const { serialize } = useForm();
  const [correoAdmin, setCorreoAdmin] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateFields = () => {
    const errors = {};

    if (!correoAdmin || !contrasenia) {
      errors.general = 'Por favor, completa todos los campos.';
    }

    return errors;
  };

  const handleLogin = async (ev) => {
    ev.preventDefault();

    const errors = validateFields();

    if (Object.keys(errors).length > 0) {
      setError(errors.general || 'Error en los campos.');
      return;
    }

    try {
      const formData = {
        correo_admin: correoAdmin,
        contrasenia_hash: contrasenia,
      };

      const response = await axios.post(endPoints.admin.getLogin, formData);
      const token = response.data.token;

      localStorage.setItem('token', token);
      localStorage.setItem('correo_admin', correoAdmin);

      if (token) {
        navigate("/panelAdmin");
      }
      return null;
    } catch (error) {
      setError('Correo o contraseña incorrectos. Por favor, inténtalo de nuevo.');
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
                onChange={(e) => setCorreoAdmin(e.target.value)}
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

            {error && (
              <p className="error-message">{error}</p>
            )}

            <br />
          </div>
        </section>
      </div>
    </>
  );
};

export default Login;
