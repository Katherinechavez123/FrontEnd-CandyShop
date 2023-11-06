import { Link } from "react-router-dom";

import Button from "../Atoms/Button/Button";

function Nosotros() {
  return (
    <div className="text-center p-4 mb-16">
      <h1 className="text-5xl font-bold text-fuchsia-950 mt-32">
        Sobre Nosotros
      </h1>
      <p className="mt-6 text-fuchsia-950 text-xl">¡Bienvenido a Candy Shop!</p>
      <p className="mt-4 text-fuchsia-950 text-lg">
        Somos tu destino para desayunos sorpresa, anchetas llenas de amor y
        regalos especiales.
      </p>
      <p className="mt-6 text-fuchsia-950 text-2xl">¿Qué nos hace únicos?</p>
      <p className="mt-6 text-fuchsia-950 text-lg">
        Nuestra pasión por la personalización. Ofrecemos a nuestros clientes dos
        emocionantes opciones:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 items-center justify-center">
        <div>
          <h2 className="text-2xl font-semibold text-pink-600">
            Modelos de Anchetas Predeterminadas
          </h2>
          <p className="mt-4 text-fuchsia-950 text-lg">
            Hemos seleccionado cuidadosamente una variedad de modelos de
            anchetas prediseñadas que seguramente te encantarán. Simplemente
            elige uno de nuestros modelos y nosotros nos encargaremos de hacerlo
            especial.
          </p>
          <br />
          <Link to="/catalogo">
            <Button text="Ver productos" />
          </Link>
        </div>
        <div>
          <img
            src="https://candyshop.publitin.net/redetron/wp-content/uploads/2023/11/anchetas.png"
            alt="Candy Shop"
            className="rounded-lg shadow-md"
          />
        </div>
      </div>
      <br />
      <br />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 items-center justify-center">
        <div>
          <h2 className="text-2xl font-semibold text-pink-500">
            Crea tu Propia Ancheta
          </h2>
          <p className="mt-4 text-fuchsia-950 text-lg">
            ¿Tienes una visión única en mente? Con nuestra opción de
            personalización, puedes armar tu propia ancheta desde cero.
            Selecciona los productos, el diseño y los detalles que más te
            gusten, y nosotros la crearemos exactamente como la imaginas.
          </p>
          <br />
          <Link to="/personalizar">
            <Button text="Personalizar" />
          </Link>
        </div>

        <img
          src="https://candyshop.publitin.net/redetron/wp-content/uploads/2023/11/personalizar-e1698959318849.png"
          alt="Candy Shop"
          className="rounded-lg shadow-md"
        />
      </div>
      <br />

      <p className="mt-8 text-fuchsia-950 text-lg ml-16 mr-16">
        En Candy Shop, nos enorgullece ofrecer un servicio excepcional que te
        permitirá sorprender a tus seres queridos de una manera memorable.
        Nuestra misión es hacer que cada ocasión sea especial y que cada regalo
        cuente.
      </p>
    </div>
  );
}

export default Nosotros;
