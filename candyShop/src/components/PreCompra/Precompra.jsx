import React, { useState, useEffect } from "react";
import axios from "axios";
import endPoints from "../../services/api";
import { useParams, useLocation, Link } from "react-router-dom";
import Button from "../Atoms/Button/Button";

function PreCompra({ allProducts }) {
  const [responseMessage, setResponseMessage] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  const formatPrice = (price) => {
    const numericValue = parseFloat(price);
  
    if (!isNaN(numericValue)) {
      // Redondear a dos decimales para evitar problemas con cálculos
      const roundedPrice = Math.round(numericValue * 100) / 100;
  
      // Convertir a cadena y dividir en partes antes y después del punto decimal
      const parts = roundedPrice.toString().split(".");
  
      // Formatear la parte entera con separadores de miles
      const formattedInteger = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  
      // Unir la parte entera y la parte decimal (si existe)
      const formattedPrice =
        parts.length === 2
          ? `${formattedInteger}.${parts[1]}`
          : formattedInteger;
  
      return formattedPrice;
    }
  
    return price;
  };
  

  useEffect(() => {
    // Calcular el precio total sumando el precio de cada producto
    const totalPrice = allProducts.reduce((total, ancheta) => {
      return (
        total +
        ancheta.valor_ancheta * ancheta.cantidad ||
        total + ancheta.precio * ancheta.cantidad
      );
    }, 0);

    setTotalPrice(totalPrice);
  }, [allProducts]);

  return (
    <div className="container mx-auto p-4 mt-40">
      <h1 className="text-3xl font-semibold mb-4 text-center text-fuchsia-950">
        Resumen de tu compra
      </h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-cyan-100 text-fuchsia-950">
            <th className="py-2">Producto</th>
            <th className="py-2">Precio por unidad</th>
            <th className="py-2">Cantidad seleccionada</th>
            <th className="py-2">Precio total</th>
          </tr>
        </thead>
        <tbody>
          {allProducts.map((ancheta) => (
            <tr
              key={ancheta.id_ancheta || ancheta.id_producto}
              className="border-b border-gray-300"
            >
              <td className="py-2">
                <div className="flex justify-center items-center">
                  <img
                    src={
                      ancheta.url_imagen_ancheta ||
                      ancheta.url_imagen_producto
                    }
                    alt={ancheta.nombre_ancheta || ancheta.nombre_producto}
                    className="w-16 h-16 object-cover mr-2"
                  />
                  <span className="text-fuchsia-950 justify-center items-center text-center">
                    {ancheta.nombre_ancheta || ancheta.nombre_producto}
                  </span>
                </div>
              </td>
              <td className="py-2 text-fuchsia-950 justify-center items-center text-center">
                ${formatPrice(ancheta.valor_ancheta || ancheta.precio)}
              </td>
              <td className="py-2 text-fuchsia-950 justify-center items-center text-center">
                {ancheta.cantidad}
              </td>
              <td className="py-2 text-fuchsia-950 justify-center items-center text-center">
                ${formatPrice(
                  ancheta.valor_ancheta * ancheta.cantidad ||
                    ancheta.precio * ancheta.cantidad
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="p-4 shadow-md rounded-lg max-w-lg mx-auto mt-6 text-center">
        <p className="text-fuchsia-950 text-xl font-semibold">
          Precio total a pagar: ${formatPrice(totalPrice)}
        </p>
        <br />
        <Link
          to={{
            pathname: "/compra",
            state: { allProducts },
          }}
        >
          <Button text="Ir a pagar" />
        </Link>
      </div>
      <div className="mt-4 text-fuchsia-950 text-center">
        {responseMessage}
      </div>
    </div>
  );
}

export default PreCompra;
