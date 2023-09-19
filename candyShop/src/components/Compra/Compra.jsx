import React, { useState, useEffect } from 'react';
import axios from "axios";
import endPoints from "../../services/api";
import { useParams } from 'react-router-dom';

function Buy() {
  const { id_ancheta } = useParams();
  const [cantidad, setCantidad] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  //const [ancheta, setAncheta] = useState();


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(endPoints.buy.postBuy(id_ancheta), {
      
        body: JSON.stringify({
          detalleOrden: [{ id_ancheta, cantidad }],
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setResponseMessage(`Compra exitosa. ID de factura: ${data.id_venta_ancheta}`);
      } else {
        setResponseMessage('Error al realizar la compra. Por favor, intenta de nuevo.');
      }
    } catch (error) {
      console.error(error);
      setResponseMessage('Error al realizar la compra. Por favor, intenta de nuevo.');
    }
  };

  return (
    <div className="container mx-auto p-4">
        

        <p>Comprando la ancheta con ID: {id_ancheta}</p>

      <form className="bg-white p-4 shadow-md rounded-lg" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="cantidad" className="block text-gray-600">Cantidad:</label>
          <input type="number" id="cantidad" className="border rounded-md p-2 w-full" value={cantidad} onChange={(e) => setCantidad(e.target.value)} required />
        </div>
        <button type="submit" className="bg-blue-500 text-white rounded-md p-2">Comprar</button>
      </form>

      <div className="mt-4">{responseMessage}</div>
    </div>
  );
}

export default Buy;