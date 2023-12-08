// MisCompras.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import endPoints from "../../services/api";
import "./MisCompras.css";

const MisCompras = () => {
  const [historialCompras, setHistorialCompras] = useState([]);
  const id_cliente = JSON.parse(localStorage.getItem("registrationData")).id_cliente;

  useEffect(() => {
    const fetchHistorialCompras = async () => {
      try {
        const response = await axios.get(
          endPoints.cliente.myShopping(id_cliente)
        );

        const { historialCompras, status } = response.data;

        if (
          Array.isArray(historialCompras.customAncheta) &&
          Array.isArray(historialCompras.predeterminadaAncheta)
        ) {
          const historialFormateado = [
            ...historialCompras.customAncheta,
            ...historialCompras.predeterminadaAncheta,
          ].map((compra) => ({
            id_venta_ancheta: compra.id_venta,
            fecha: new Date(compra.fecha).toLocaleDateString(),
            valor: compra.valor,
            id_cliente: id_cliente,
            producto: compra.nombre_ancheta_predeterminada || compra.nombre_producto_personalizado,
            cantidad: compra.cantidad_personalizada || compra.cantidad_predeterminada || 'No disponible',
            imagen: compra.imagen_ancheta_predeterminada || compra.imagen_producto_personalizado || 'No disponible',
          }));

          console.log("Historial Formateado:", historialFormateado);
          setHistorialCompras(historialFormateado);
        } else {
          console.error(
            "La respuesta del servidor no contiene un historial de compras válido:",
            response.data
          );
          setHistorialCompras([]);
        }
      } catch (error) {
        console.error("Error al obtener el historial de compras:", error);
        setHistorialCompras([]);
      }
    };

    fetchHistorialCompras();
  }, [id_cliente]);

  return (
    <div className="mis-compras-container mt-28">
      <h2 className="text-center text-3xl text-fuchsia-950 font-bold">
        Mis Compras
      </h2>
      <ul className="compras-list">
        {historialCompras.map((compra, index) => (
          <li key={`${compra.id_venta_ancheta}-${index}`} className="compra-item">
            <div className="compra-detalle">
              <div className="detalle-izquierdo">
                <img src={compra.imagen} alt="Imagen de la compra" />
              </div>
              <div className="detalle-derecho">
                <p>ID de la compra: {compra.id_venta_ancheta}</p>
                <p>Fecha de la compra: {compra.fecha}</p>
                <p>Valor: {compra.valor}</p>
                <p>ID del cliente: {compra.id_cliente}</p>
                <p>Producto: {compra.producto}</p>
                <p>Cantidad: {compra.cantidad}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MisCompras;
