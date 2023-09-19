export default function Testimonios() {
  return (
    <section className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8 ">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
      <br /><br />
      <div className="mx-auto max-w-2xl lg:max-w-4xl ">
        <h2 className="text-3xl font-bold tracking-tight text-pink-600 sm:text-5xl text-center">
          Comentarios
          <br />
        </h2>
        <figure className="mt-10 bg-pink-200 p-20 rounded-md">
          <blockquote className="text-center text-xl font-normal leading-8 text-fuchsia-950 sm:text-xl sm:leading-9 ">
            <p >
              “Recientemente tuve la oportunidad de comprar una ancheta en la
              tienda virtual 'Candy Shop'. Debo decir que quedé muy impresionado
              con la experiencia en general. La página web era fácil de usar,
              con una amplia variedad de opciones para elegir.”
            </p>
          </blockquote>
          <figcaption className="mt-10">
            <img
              className="mx-auto h-12 w-12 rounded-full"
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
            <div className="mt-4 flex items-center justify-center space-x-3 text-base">
              <div className="font-semibold text-fuchsia-950">Diana Lorena</div>
              <svg
                viewBox="0 0 2 2"
                width={3}
                height={3}
                aria-hidden="true"
                className="fill-cyan-300"
              >
                <circle cx={1} cy={1} r={1} />
              </svg>
              <div className="text-fuchsia-950">Programadora</div>
            </div>
          </figcaption>
        </figure>
      </div>
    </section>
    
  );
}
