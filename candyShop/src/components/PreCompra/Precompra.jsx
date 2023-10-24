import React, { useState, useEffect } from "react";
import axios from "axios";
import endPoints from "../../services/api";
import {
  useParams,
  useLocation,
  Link
} from "react-router-dom";
import Button from "../Atoms/Button/Button";

function PreCompra({ allProducts }) {
  const [responseMessage, setResponseMessage] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  

  useEffect(() => {
    // Calcular el precio total sumando el precio de cada producto
    const totalPrice = allProducts.reduce((total, ancheta) => {
      return total + ancheta.valor_ancheta * ancheta.cantidad;
    }, 0);

    setTotalPrice(totalPrice);
  }, [allProducts]);

  return (
    <div className="container mx-auto p-4 mt-40">
      <h1 className="text-3xl font-semibold mb-4 text-center">
        Resumen de tu compra
      </h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {allProducts.map((ancheta) => (
          <div
            key={ancheta.id_ancheta}
           className="bg-white p-4 shadow-cyan-300 rounded-lg mx-auto text-center ">
            <img
              src={ancheta.url_imagen_ancheta}
              alt={ancheta.nombre_ancheta}
              className="w-32 h-32 object-cover mx-auto mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">
              {ancheta.nombre_ancheta}
            </h2>
            <p className="text-fuchsia-950">
              Precio por unidad: ${ancheta.valor_ancheta}
            </p>
            <p className="text-fuchsia-950">
              Cantidad seleccionada: {ancheta.cantidad}
            </p>
            <p className="text-fuchsia-950">
              Precio total: ${ancheta.valor_ancheta * ancheta.cantidad}
            </p>
          </div>
        ))}
      </div>

      <div className="p-4 shadow-md rounded-lg max-w-lg mx-auto mt-6 text-center">
        <p className="text-fuchsia-950 text-xl font-semibold">
          Precio total a pagar: ${totalPrice}
        </p>
        <br />
        <Link
          to={{
            pathname: "/compra",
            state: { allProducts },
          }}
        >
          <Button text="Ir a pagar"  />
        </Link>
      </div>
      <div className="mt-4 text-fuchsia-950 text-center">{responseMessage}</div>
    </div>
  );
}

export default PreCompra;
