import { BiCake, BiGift, BiSolidWine, BiSolidTreeAlt,BiSolidHeart, BiSolidComponent,BiParty, BiBody} from "react-icons/bi";
import { Link } from "react-router-dom";


const features = [
  {
    name: 'Cumpleaños ',
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
    name: 'Día de la Madre ',
  icon: BiGift,
  },
  {
    name: 'Dia del Padre ',
  icon: BiBody,
  },
  {
    name: 'Navidad',
  icon:BiSolidTreeAlt,
  },
  {
    name: 'Infantil',
  icon: BiSolidComponent,
  },
  {
    name: 'Graduación',
  icon: BiParty,
  },
]

export default function Sesion2() {
  return (
    <div className=" bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <p className="mt-2 text-3xl font-bold tracking-tight text-pink-600 sm:text-5xl">
          Explora las Categorías
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-900 ">
          Únete a esta sesión de categorías para sumergirte en un mundo de diversidad y clasificación.
          </p>
        </div>
        <Link to="/catalogo"><div className=" mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl text-center">
          <dl className=" grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16 text-white  bg-pink-600 h-16 rounded-full p-4 hover:bg-cyan-300 hover:text-black ">
                <dt className="text-base font-semibold leading-7 ">
                  <div className="mt-2.5 absolute left-100 top-0 flex h-10 w-10 items-center justify-center rounded-lg text-white hover:text-black ">
                    <feature.icon className="h-8 w-8  " aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
              </div>
            
            ))}
          </dl>
        </div>
        </Link>
      </div>
    </div>
  )
}