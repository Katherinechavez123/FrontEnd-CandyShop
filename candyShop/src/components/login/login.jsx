import React from "react";
import "./login.css"
import Button from "../Atoms/Button/Button";

const Login = () => {
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
          ¡Bienvenido/a de vuelta! Por favor, ingresa tus credenciales para iniciar sesión en nuestra página.
          </p>

          <form className="main__form" action="/login" method="post">
            <input
              name="correo_cliente"
              type="email"
              className="main__input"
              id="exampleInputEmail1"
              placeholder="Ingresa tu correo"
            />
            <input
              name="contrasenia"
              type="password"
              className="main__input"
              id="exampleInputPassword1"
              placeholder="Ingresa tu contraseña"
            />
            <Link to="/inicio">
            <Button text="Ver productos" />
            </Link>
          </form>

          <br />

          <p className="link_registro">
            ¿No tienes una cuenta? <a href="/register">Registrate aquí</a>
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

export default Login;
