import React from "react";
import "./register.css"
import Button from "../Atoms/Button/Button";
import { Link } from "react-router-dom";

const Register = () => {
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
          <h2 className="main__title">¡Bienvenidos!</h2>
          <p className="main__paragraph">
            Estamos encantados de tenerte aquí y queremos asegurarnos de que tu
            experiencia de compra sea excepcional.
          </p>

          <form className="main__form" action="/register" method="post">
            <input
              name="correo_cliente"
              type="email"
              className="rounded-full main__input"
              id="exampleInputEmail1"
              placeholder="Ingresa tu correo"
            />
            <input
              name="contrasenia"
              type="password"
              className="rounded-full main__input"
              id="exampleInputPassword1"
              placeholder="Ingresa tu contraseña"
            />
            <Link to="/Inicio">
            <Button text="Ver productos" />
            </Link>
          </form>

          <br />

          <p className="link_registro">
            ¿Tienes una cuenta? <a href="/login">Inicia sesión aquí</a>
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
