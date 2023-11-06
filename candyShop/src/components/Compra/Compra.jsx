import React, { useState, useEffect } from "react";
import Button from "../Atoms/Button/Button";
import Modal from "../../layouts/Modal/Modal";
import endPoints from "../../services/api";
import Modals from "../../layouts/Modal/Modals";
import { useForm, useModal } from "../../hooks";
import { Link } from "react-router-dom";

function Compra({ allProducts }) {
  const [responseMessage, setResponseMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [identification, setIdentification] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountHolder, setAccountHolder] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [showBankForm, setShowBankForm] = useState(false);
  const { serialize } = useForm();

  useEffect(() => {
    // Calcula el precio total de la compra
    const totalPrice = allProducts.reduce((total, ancheta) => {
      return total + ancheta.valor_ancheta * ancheta.cantidad || total + ancheta.precio * ancheta.cantidad;
    }, 0);

    setTotalPrice(totalPrice);
  }, [allProducts]);

  const handleBankChange = (e) => {
    const selectedBank = e.target.value;
    setSelectedBank(selectedBank);
    // Si el banco seleccionado requiere formulario, muestra el formulario
    setShowBankForm(selectedBank === "banco1" || selectedBank === "banco2" || selectedBank === "banco3");
  };
  const handleSubmit = async (ev) => {
    ev.preventDefault();
  
    if (allProducts.length === 0) {
      setResponseMessage("No se encontraron detalles de la ancheta.");
      return;
    }
  
    if (!name || !email || !phone || !identification || !selectedBank) {
      setResponseMessage("Por favor, completa todos los campos.");
      return;
    }
  
    if (showBankForm && (!accountNumber || !accountHolder)) {
      setResponseMessage("Por favor, completa los campos del formulario bancario.");
      return;
    }
  
    const datosCompra = {
      nombre: name,
      email,
      telefono: phone,
      identificacion: identification,
      banco: selectedBank,
      valorTotal: totalPrice,
      productos: allProducts, 
      idCliente: userId, 
    };
  
    try {
      const response = await axios.post(endPoints.buy.saveBuy, datosCompra);
  
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
    <div className="container mx-auto p-4 mt-32 text-center">
      <h1 className="text-3xl font-semibold mb-4 text-center text-fuchsia-950">
        Finaliza tu compra
      </h1>
      <p className="text-fuchsia-950">Precio total: ${totalPrice}</p>

      <div className="bg-white p-4 shadow-md rounded-lg max-w-md mx-auto mt-8 text-fuchsia-950 text-center items-center justify-center">
        <h2 className="text-2xl font-semibold mb-4 text-center text-fuchsia-950">
          Realiza tu pago por PSE
        </h2>

        <div className="flex flex-col items-center justify-center mb-4">
          <img
            src="https://www.sifer.com.co/wp-content/uploads/2021/02/pse-forma.jpg"
            alt="PSE"
            className="w-32 h-32"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="name">Nombre Completo:</label>
          <input
            type="text"
            id="name"
            className="w-full p-2 rounded-full focus:ring-pink-600"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            className="w-full p-2 rounded-full focus:ring-pink-600"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone">Teléfono:</label>
          <input
            type="tel"
            id="phone"
            className="w-full p-2 rounded-full focus:ring-pink-600"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="identification">Número de Identificación:</label>
          <input
            type="text"
            id="identification"
            className="w-full p-2 rounded-full focus:ring-pink-600"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="bank">Seleccione el banco:</label>
          <select id="bank" className="w-full p-2 rounded-full focus:ring-pink-600" onChange={handleBankChange}>
            <option value="">Seleccionar banco</option>
            <option value="banco1">Nequi</option>
            <option value="banco2">Bancolombia</option>
            <option value="banco3">Banco de Bogotá</option>
            <option value="banco4">Banco de la Mujer</option>
            <option value="banco5">Davivienda</option>
            {/* Agrega más opciones de banco según tus necesidades */}
          </select>
        </div>

        {showBankForm && (
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-center text-fuchsia-950">
              Datos Bancarios
            </h2>
            <h3>Por tu seguridad no guardaremos esta información <a href="" className=" text-sky-600">términos y condiciones</a></h3>
              <br />
    
            <div className="mb-4">
              <label htmlFor="accountNumber">Número de cuenta:</label>
              <input
                type="text"
                id="accountNumber"
                className="w-full p-2 rounded-full focus:ring-pink-600"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="accountHolder">Nombre del titular:</label>
              <input
                type="text"
                id="accountHolder"
                className="w-full p-2 rounded-full focus:ring-pink-600"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="accountHolder">Clave:</label>
              <input
                type="password"
                id="password"
                className="w-full p-2 rounded-full focus:ring-pink-600"
              />
            </div>
          </div>
        )}

        <Button text="Comprar" onClick={handleSubmit} type="submit" />
      </div>
    </div>
  );
}

export default Compra;
