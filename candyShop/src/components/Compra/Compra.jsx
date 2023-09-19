import React, { useState, useEffect } from 'react';
import axios from "axios";
import endPoints from "../../services/api";
import { useParams } from 'react-router-dom';
import Button from '../Atoms/Button/Button';

function Buy() {
  const { id_ancheta } = useParams();
  const [cantidad, setCantidad] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  //const [ancheta, setAncheta] = useState();
  const [valorAncheta, setValorAncheta] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(endPoints.buy.postBuy(id_ancheta), {

        body: JSON.stringify({
          detalleOrden: [{ id_ancheta, cantidad }],
        }),
        
      });
      
      console.log(response);

      if (response.status == 200) {
        setResponseMessage(`Compra exitosa. ID de factura: ${response.data.facturaId}`);
      } else {
        setResponseMessage('Error al realizar la compra. Por favor, intenta de nuevo.');
      }
    } catch (error) {
      console.error(error);
      setResponseMessage('Error al realizar la compra. Por favor, intenta de nuevo.');
    }
  };
    // Aquí obtendremos la fecha actual
    const fechaActual = new Date();

    // Formatea la fecha como desees (por ejemplo, en formato de cadena)
    const fechaFormateada = fechaActual.toLocaleDateString(); // Opcionalmente, puedes pasar opciones de formato como argumento



  return (
    <div className="container mx-auto p-4">
        

        <p className='text-3xl ml-5 mt-20 text-fuchsia-950'>Codigo de la ancheta seleccionada: {id_ancheta}</p>
<br />
        <p className="ml-5 text-fuchsia-950">Fecha: {fechaFormateada}</p>

      <form className="bg-white p-4 shadow-md rounded-lg" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="cantidad" className="block text-fuchsia-950">Seleccione la cantidad:</label> <br />
          <input type="number" id="cantidad" className="w-150 rounded-full border-0 px-3.5  pl-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6" value={cantidad} onChange={(e) => setCantidad(e.target.value)} required />
        </div>
        <Button text="Comprar" type="submit"/>

      </form>

      <div className="mt-4">{responseMessage}</div>
    </div>
  );
}

export default Buy;