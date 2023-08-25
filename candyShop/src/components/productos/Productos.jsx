/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
const products = [
    {
      codigo: 1,
      categoria:'CUMPLEAÑOS',
      nombre: 'Ancheta primavera',
      valor: '$150.000',
      imagen_ancheta: 'https://candyshop.publitin.net/redetron/wp-content/uploads/2023/06/desayuno.png',
      detalle: "Front of men's Basic Tee in black.",

    },
    {
      codigo: 1,
      categoria:'CUMPLEAÑOS',
      nombre: 'Ancheta primavera',
      valor: '$150.000',
      imagen_ancheta: 'https://candyshop.publitin.net/redetron/wp-content/uploads/2023/06/desayuno.png',
      detalle: "Front of men's Basic Tee in black.",

    },
    {
      codigo: 1,
      categoria:'CUMPLEAÑOS',
      nombre: 'Ancheta primavera',
      valor: '$150.000',
      imagen_ancheta: 'https://candyshop.publitin.net/redetron/wp-content/uploads/2023/06/desayuno.png',
      detalle: "Front of men's Basic Tee in black.",

    },
    {
      codigo: 1,
      categoria:'CUMPLEAÑOS',
      nombre: 'Ancheta primavera',
      valor: '$150.000',
      imagen_ancheta: 'https://candyshop.publitin.net/redetron/wp-content/uploads/2023/06/desayuno.png',
      detalle: "Front of men's Basic Tee in black.",

    },
    {
      codigo: 1,
      categoria:'CUMPLEAÑOS',
      nombre: 'Ancheta primavera',
      valor: '$150.000',
      imagen_ancheta: 'https://candyshop.publitin.net/redetron/wp-content/uploads/2023/06/desayuno.png',
      detalle: "Front of men's Basic Tee in black.",

    },
  ]
  
  export default function Productos() {
    return (
      
      <div className="bg-white flex-row" >
          <div className="bg-pink-600">
          <h1>
          ¡Bienvenidos a nuestra emocionante sesión de productos! En esta ocasión, queremos compartir con ustedes el maravilloso mundo de desayunos sorpresa y regalos que tenemos para ofrecer.
          </h1>
        </div>
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 flex-row">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Lo más vendido esta semana</h2>
  
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <div key={product.codigo} className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={product.imagen_ancheta}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                        
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href={product.href}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.nombre}
                      </a>
                    </h3>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{product.valor}</p>
                  <br />
                  <button class="rounded-none bg-pink-600 text-slate-50">Comprar</button>
                </div>
              </div>
            ))}

          </div>
        </div>        
      </div>
    )
  }
  