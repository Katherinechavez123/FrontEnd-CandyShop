import React from 'react';
import ReactDOM from 'react-dom';
import { BiCake, BiGift, BiSolidWine, BiSolidTreeAlt, BiSolidHeart, BiSolidComponent, BiParty, BiBody } from "react-icons/bi";
import { Link } from 'react-router-dom';


const features = [
  {
    name: 'Cumpleaños',
    icon: BiCake,
  },
  {
    name: 'Aniversario',
    icon: BiSolidWine,
  },
  {
    name: 'Amor y amistad',
    icon: BiSolidHeart,
  },
  {
    name: 'Día de la Madre',
    icon: BiGift,
  },
  {
    name: 'Dia del Padre',
    icon: BiBody,
  },
  {
    name: 'Navidad',
    icon: BiSolidTreeAlt,
  },
  {
    name: 'Infantil',
    icon: BiSolidComponent,
  },
  {
    name: 'Graduación',
    icon: BiParty,
  },
];

const Sesion2 = () => {
  return(
  <div className=" bg-white py-24 sm:py-32">
  <div className="mx-auto max-w-7xl px-6 lg:px-8">
    <div className="mx-auto max-w-2xl lg:text-center">
      <p className="mt-2 text-3xl font-bold tracking-tight text-pink-600 sm:text-5xl">
        Explora las Categorías
      </p>
      <p className="mt-6 text-lg leading-8 text-gray-900 text-center">
        Únete a esta sesión de categorías para sumergirte en un mundo de diversidad y clasificación.
      </p>
    </div>
    <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
         <Link to="/catalogo">          
         <img
            className="col-span-2 max-h-15 w-full object-contain lg:col-span-1 hover:bg-pink-100 rounded-full"
            src="https://candyshop.publitin.net/redetron/wp-content/uploads/2023/09/cumpleanos-1.png"
            width={200}
            height={100}
          />
          </Link>
          <Link to="/catalogo">
          <img
            className="col-span-2 max-h-15 w-full object-contain lg:col-span-1 hover:bg-pink-100 rounded-full"
            src="https://candyshop.publitin.net/redetron/wp-content/uploads/2023/09/aniversario.png"
            width={200}
            height={100}
          />
          </Link>
          <Link to="/catalogo">
          <img
            className="col-span-2 max-h-15 w-full object-contain lg:col-span-1 hover:bg-pink-100 rounded-full"
            src="https://candyshop.publitin.net/redetron/wp-content/uploads/2023/09/infantil.png"
            width={200}
            height={100}
          />
          </Link>
          <Link to="/catalogo">
          <img
            className="col-span-2 max-h-15 w-full object-contain sm:col-start-2 lg:col-span-1 hover:bg-pink-100 rounded-full"
            src="https://candyshop.publitin.net/redetron/wp-content/uploads/2023/09/navidad.png"
            width={200}
            height={100}
          />
          </Link>
          <Link to="/catalogo">
          <img
            className="col-span-2 col-start-2 max-h-15 w-full object-contain sm:col-start-auto lg:col-span-1 hover:bg-pink-100 rounded-full"
            src="https://candyshop.publitin.net/redetron/wp-content/uploads/2023/09/hombre.png"
            width={200}
            height={100}
          />
          </Link>

        </div>
  </div>
</div>
);
};


export default Sesion2;
