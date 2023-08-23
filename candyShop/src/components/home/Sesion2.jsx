

const features = [
  {
    name: 'Regalos Personalizados: ',
    description:
      'Haz que tus obsequios sean verdaderamente únicos con nuestra colección de regalos personalizados. ',
    icon: <img src="/candyShop/src/assets/svg/Icono_personalizar-03.svg" alt="icono_personalizar" />,
  },
  {
    name: 'Regalos para Ocasiones Especiales:',
    description:
      'Celebra momentos únicos con nuestra selección de regalos temáticos. Desde San Valentín hasta Navidad, te ofrecemos opciones que se ajustan a cada festividad.',
    icon: <img src="/candyShop/src/assets/svg/Icono_personalizar-03.svg" alt="icono_personalizar" />,
  },
  {
    name: 'Desayunos Especiales para Niños:',
    description:
      'Haz que los más pequeños se sientan como reyes con nuestros desayunos diseñados especialmente para ellos. Con colores vivos y sabores divertidos, crearás recuerdos felices desde temprano.',
    icon: <img src="/candyShop/src/assets/svg/Icono_personalizar-03.svg" alt="icono_personalizar" />,
  },
  {
    name: 'Anchetas Gourmet: ',
    description:
      'Sumérgete en un mundo de sabores exquisitos con nuestras anchetas gourmet. Combina los ingredientes más selectos, desde quesos artesanales hasta chocolates de alta calidad, para regalar una experiencia culinaria sofisticada.',
    icon: <img src="/candyShop/src/assets/svg/Icono_personalizar-03.svg" alt="icono_personalizar" />,
  },
]

export default function Sesion2() {
  return (
    <div className="bg-cyan-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-2xl font-semibold leading-7 text-pink-600">Categorías</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            
¡Bienvenidos a nuestro rincón de emociones y delicias en forma de regalos!
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
          En nuestro encantador rincón de sorpresas y alegrías, te invitamos a explorar nuestras diversas categorías de regalos cuidadosamente seleccionados para cada ocasión especial. 
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <div key={feature.icon} className="icono">
                    </div>
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}