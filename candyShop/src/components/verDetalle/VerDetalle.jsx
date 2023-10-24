import { useParams, Link } from "react-router-dom";
import Button from "../Atoms/Button/Button";
import { useState, useEffect } from "react";
import axios from "axios";
import endPoints from "../../services/api";
import "./VerDetalle.css";
import SliderAnchetas from "../../layouts/SliderAnchetas/SliderAnchetas";

function VerDetalle() {
  const { id_ancheta } = useParams();
  const [ancheta, setAncheta] = useState(null);

  useEffect(() => {
    async function fetchAncheta() {
      try {
        const response = await axios.get(
          endPoints.anchetas.getAncheta(id_ancheta)
        );
        console.log(response);
        setAncheta(response.data);
      } catch (error) {
        console.error("Error al obtener los detalles de la ancheta:", error);
      }
    }

    fetchAncheta();
  }, [id_ancheta]);

  if (!ancheta) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="bg-white">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
        <Link to="/catalogo" className="text-pink-600 hover:text-cyan-700 ml-52 text-2xl mt-16">
            Volver al catálogo
          </Link>
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          ></ol>
        </nav>

        {/* Image gallery */}
        <div className="mt-6 text-center">
          <div className="hidden overflow-hidden rounded-lg lg:block img_detalle ml-20">
            <img
              src={ancheta.url_imagen_ancheta}
              className="mx-auto my-auto w-full h-full"
              alt="Imagen de la ancheta"
            />
          </div>
        </div>

        {/* Product info */}

        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">

          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-pink-600 sm:text-3xl">
              {ancheta.nombre_ancheta}
            </h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <p className="text-3xl tracking-tight text-fuchsia-950">
              ${ancheta.valor_ancheta}
            </p>

            <br />

              <Button text="Añadir al carrito" />
        
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>

              <div className="space-y-6">
                <p className="text-base text-fuchsia-950">
                  {ancheta.detalle_ancheta}
                </p>
              </div>
            

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerDetalle;
