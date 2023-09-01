import { ArrowPathIcon, FingerPrintIcon, LockClosedIcon } from '@heroicons/react/24/outline'


const features = [
  {
    name: 'Regalos Personalizados: ',
    description:
      'Haz que tus obsequios sean verdaderamente únicos con nuestra colección de regalos personalizados. ',
    icon: FingerPrintIcon,
  },
  {
    name: 'Regalos para Ocasiones Especiales:',
    description:
      'Celebra momentos únicos con nuestra selección de regalos temáticos. Desde San Valentín hasta Navidad, te ofrecemos opciones que se ajustan a cada festividad.',
    icon: LockClosedIcon,
  },
  {
    name: 'Desayunos Especiales para Niños:',
    description:
      'Haz que los más pequeños se sientan como reyes con nuestros desayunos diseñados especialmente para ellos. Con colores vivos y sabores divertidos, crearás recuerdos felices desde temprano.',
    icon: ArrowPathIcon,
  },
  {
    name: 'Anchetas Gourmet: ',
    description:
      'Sumérgete en un mundo de sabores exquisitos con nuestras anchetas gourmet. Combina los ingredientes más selectos, desde quesos artesanales hasta chocolates de alta calidad, para regalar una experiencia culinaria sofisticada.',
    icon:FingerPrintIcon,
  },
]

export default function Sesion2() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Deploy faster</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to deploy your app
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Quis tellus eget adipiscing convallis sit sit eget aliquet quis. Suspendisse eget egestas a elementum
            pulvinar et feugiat blandit at. In mi viverra elit nunc.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-pink-600">
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
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