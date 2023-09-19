import { Link } from "react-router-dom";
import Button from "../Atoms/Button/Button";
import Titlle from "./Titlle";
import { useState, useEffect } from "react";
import axios from "axios";
import endPoints from "../../services/api";



export default function Productos() {
  const [anchetas, setAnchetas] = useState([]);
  
  async function getAnchetas() {
    const response = await axios.get(endPoints.anchetas.getAnchetas);
    setAnchetas(response.data);
  }
  try {
  } catch (error) {
    console.log(error);
  }

  useEffect(() => {getAnchetas()}, []);

  return (
    <>
      <Titlle />

      <div className="bg-white flex-row">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 flex-row">
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {anchetas.map((ancheta) => (
              <div key={ancheta.id_ancheta} className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <Link to={`/detalle/${ancheta.id_ancheta}`} className="hover:underline ">
                  <img
                    src={ancheta.url_imagen_ancheta}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                  </Link>
                </div>
                <div className="mt-4 flex justify-between ">
                  
                    <h3 className="text-sm text-gray-700">
    
                        <span aria-hidden="true" className="inset-0" />
                        {ancheta.nombre_ancheta}
                    
                    </h3>
                  
                  <p className="text-sm font-medium text-gray-900">
                    {ancheta.valor_ancheta}
                  </p>
                  <br />
                </div>
                <Link to={`/detalle/${ancheta.id_ancheta}`} className="hover:underline ">Ver detalle</Link>
                <br />
                <br />
                <div className="text-center">
                <Link  to="/compra">
                <Button  text="Comprar" />
                </Link>
              
                
                <br /> <br />

                </div>
              </div>
              
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
