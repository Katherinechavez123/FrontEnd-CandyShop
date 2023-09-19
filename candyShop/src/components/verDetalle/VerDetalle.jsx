
import { useParams, Link } from "react-router-dom";
import Button from '../Atoms/Button/Button'
import { useState, useEffect } from "react";
import axios from "axios";
import endPoints from "../../services/api";

function VerDetalle() {
  const { id_ancheta } = useParams();
  const [ancheta, setAncheta] = useState(null);

  useEffect(() => {
    async function fetchAncheta() {
      try {
        const response = await axios.get(endPoints.anchetas.getAncheta(id_ancheta));
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

/*
export default function VerDetalle() {
  const [anchetas, setAnchetas] = useState([]);
  
  async function getAnchetas() {
    
    const response = await axios.get(endPoints.anchetas.getAnchetas);
    setAnchetas(response.data);
  }
  try {
  } catch (error) {
    console.log(error);
  }

  useEffect(() => {getAnchetas()}, [anchetas]);
  console.log(anchetas);
*/
  return (
    <div className="bg-white">

      <div className="pt-6">
        
        <nav aria-label="Breadcrumb">
        <Link to="/catalogo">Volver a la lista de anchetas</Link>
          <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            

          </ol>
        </nav>

        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8 text-center justify-center items-center">
  <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block text-center justify-center items-center">
    <img
      src={ancheta.url_imagen_ancheta}
      className="h-full w-full object-cover object-center mx-auto"
      alt="Imagen de la ancheta"
    />
  </div>
</div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{ancheta.nombre_ancheta}</h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">{ancheta.valor_ancheta}</p>



<br />
<Link to={`/compra/${id_ancheta}`}>
<Button text="Comprar"/>
</Link>
          
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{ancheta.detalle_ancheta}</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
export default VerDetalle;