import { Link } from "react-router-dom";
import Button from "../Atoms/Button/Button"

export default function Sesion3() {
    return (
      <div className="bg-cyan-100">
        <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="relative isolate overflow-hidden bg-white px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0 hover:bg-slate-100">

            <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
              <h2 className="text-3xl font-bold tracking-tight text-fuchsia-950 sm:text-4xl">
              ¿Qué te parece agregar un toque personal a tus regalos y hacer que destaquen entre la multitud?
                <br />
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-900">
              Desde delicias gourmet hasta dulces tentaciones, puedes seleccionar cuidadosamente cada artículo para asegurarte de que refleje su estilo y personalidad.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
              <Link to="/personalizar">
            <Button text="Personalizar" />
            </Link>
              </div>
            </div>
            <div className="relative mt-16 h-80 lg:mt-8 ">
              <img
                className="absolute left-0 top-0 w-[57rem] max-w-none  rounded-3xl h-25 mb-150"
                src="https://candyshop.publitin.net/redetron/wp-content/uploads/2023/09/fonditoo-2.png"
                alt="App screenshot"
                width={1824}
                height={1080}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }