import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "../Atoms/Button/Button";
import Modal from "../../layouts/Modal/Modal";
import endPoints from "../../services/api";

function Compra({ allProducts }) {
  const [cantidad, setCantidad] = useState(1);
  const [responseMessage, setResponseMessage] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("tarjeta");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [creditCard, setCreditCard] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCVV] = useState("");

  useEffect(() => {
    const totalPrice = allProducts.reduce((total, ancheta) => {
      return total + ancheta.valor_ancheta * ancheta.cantidad;
    }, 0);

    setTotalPrice(totalPrice);
  }, [allProducts]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (allProducts.length === 0) {
      setResponseMessage("No se encontraron detalles de la ancheta.");
      return;
    }

    const formData = {
      cantidad,
      paymentMethod,
      cartData: allProducts,
      street,
      city,
      state,
    };

    if (paymentMethod === "tarjeta") {
      formData.creditCard = creditCard;
      formData.expiryDate = expiryDate;
      formData.cvv = cvv;
    }

    try {
      const response = await axios.post(endPoints.buy.saveBuy, {
        detalleOrden: [formData],
      });

      if (response.status === 200) {
        setModalMessage("Compra exitosa. ID de factura: " + response.data.facturaId);
        setShowModal(true);
      } else {
        setResponseMessage("Error al realizar la compra. Por favor, intenta de nuevo.");
      }
    } catch (error) {
      console.error(error);
      setResponseMessage("Error al realizar la compra. Por favor, intenta de nuevo.");
    }
  };

  return (
    <div className="container mx-auto p-4 mt-40 text-center">
      <h1 className="text-3xl font-semibold mb-4 text-center">
        Finaliza tu compra
      </h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {allProducts.map((ancheta) => (
          <div
            key={ancheta.id_ancheta}
            className="bg-white p-4 shadow-md rounded-lg mx-auto text-center"
          >
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

      <br />
      <div className="bg-white p-4 shadow-md rounded-lg max-w-lg mx-auto mt-24">
        <div className="mb-4">
          <label htmlFor="paymentMethod" className="block text-fuchsia-950">
            Método de pago:
          </label>
          <div className="flex justify-between items-center">
            <button
              className={`w-24 h-12 rounded-full border-2 border-transparent ${
                paymentMethod === "tarjeta" ? "border-fuchsia-950" : ""
              }`}
              onClick={() => setPaymentMethod("tarjeta")}
            >
              Tarjeta de Crédito
            </button>
            <button
              className={`w-24 h-12 rounded-full border-2 border-transparent ${
                paymentMethod === "paypal" ? "border-fuchsia-950" : ""
              }`}
              onClick={() => setPaymentMethod("paypal")}
            >
              PayPal
            </button>
          </div>
        </div>

        
          <div className="mb-4">
  <label htmlFor="creditCard" className="block text-fuchsia-950">
    Número de Tarjeta:
  </label>
  <input
    type="text"
    id="creditCard"
    value={creditCard}
    onChange={(e) => setCreditCard(e.target.value)}
  />
</div>

<div className="mb-4">
  <label htmlFor="expiryDate" className="block text-fuchsia-950">
    Fecha de Vencimiento:
  </label>
  <input
    type="text"
    id="expiryDate"
    value={expiryDate}
    onChange={(e) => setExpiryDate(e.target.value)}
  />
</div>

<div className="mb-4">
  <label htmlFor="cvv" className="block text-fuchsia-950">
    CVV:
  </label>
  <input
    type="text"
    id="cvv"
    value={cvv}
    onChange={(e) => setCVV(e.target.value)}
  />
</div>
        

        <p className="text-fuchsia-950">Precio total: ${totalPrice}</p>
        <Button text="Comprar" type="submit" onClick={handleSubmit} />
      </div>

      {showModal && (
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <p>{modalMessage}</p>
        </Modal>
      )}
      <div className="mt-4 text-fuchsia-950">{responseMessage}</div>
    </div>
  );
}

export default Compra;
