/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { Link } from "react-router-dom"
import Button from "../../components/Atoms/Button/Button"
import Logo from "../../components/menu/Logo"

export default function Footer() {
  return (
    <>
    <br /><br /> <br /><br /> <br />
    <br /><br /> <br /><br /> <br />
    <br />
    <div className="relative isolate overflow-hidden bg-fuchsia-950 py-16 sm:py-24 lg:py-32 h-25">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
          <div className="max-w-xl lg:max-w-l bg-white p-10 rounded-xl">
           <div > <Logo/></div>
            <p className="mt-4 text-lg leading-8 text-gray-900">
            Es un placer extenderte una cálida invitación para que explores las maravillas que tenemos en nuestra tienda. 
            </p>
          </div>
          <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
            <div className="flex flex-col items-start">
              <dt className="mt-4 font-semibold text-white"></dt>
              <dd className="mt-2 leading-7 text-white text-2xl text-center">
                Accesos rápidos
                <br /><br />
                <Link to="/catalogo">
                <Button text="Catálogo"/>
              </Link>
              <br /><br />
              <Link to="/nosotros">
                <Button text="Sobre nosotros"/>
              </Link>
              <br /><br />
              <Link to="/contacto">
                <Button text="Contacto"/>
              </Link>
              </dd>
            </div>
            <div className="flex flex-col items-start text-center">
              <dt className="mt-4  text-white text-2xl text-center">Información
              <br /><br />
              <Link to="/inicio">
                <Button text="Términos y condiciones"/>
              </Link>
              <br /><br />
              <Link to="/inicio">
                <Button text="Política de privacidad"/>
              </Link>
              </dt>
            </div>
          </dl>
        </div>
      </div>
      <div className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6" aria-hidden="true">
        <div
          className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
    </div>
    </>
  )
}