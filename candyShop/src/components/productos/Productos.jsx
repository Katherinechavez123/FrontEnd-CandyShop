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
      id: 1,
      name: 'Ancheta primavera',
      href: '#',
      imageSrc: 'https://candyshop.publitin.net/redetron/wp-content/uploads/2023/06/desayuno.png',
      imageAlt: "Front of men's Basic Tee in black.",
      price: '$150.000'
    },
    {
      id: 1,
      name: 'Candy Birhtday',
      href: '#',
      imageSrc: 'https://candyshop.publitin.net/redetron/wp-content/uploads/2019/07/desayuno-cumpleanos-e1686646302636.png',
      imageAlt: "Front of men's Basic Tee in black.",
      price: '$200.000'
    },
    {
      id: 1,
      name: 'Ancheta primavera',
      href: '#',
      imageSrc: 'https://candyshop.publitin.net/redetron/wp-content/uploads/2023/06/desayuno_cumpleanos_hombre-removebg-preview.png',
      imageAlt: "Front of men's Basic Tee in black.",
      price: '$150.000'
    },
    {
      id: 1,
      name: 'Ancheta primavera',
      href: '#',
      imageSrc: 'https://candyshop.publitin.net/redetron/wp-content/uploads/2019/04/ancheta-sorpresa-de-aniversario-con-flores-removebg-preview.png',
      imageAlt: "Front of men's Basic Tee in black.",
      price: '$150.000'
    },
  ]
  
  export default function Productos() {
    return (
      <div className="bg-white flex-row" >
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 flex-row">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Lo más vendido esta semana</h2>
  
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <div key={product.id} className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href={product.href}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </a>
                    </h3>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{product.price}</p>
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
  