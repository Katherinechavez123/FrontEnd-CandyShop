import React, { useState, useEffect, useRef } from "react";
import Button from "../Atoms/Button/Button";
import endPoints from "../../services/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { useReactToPrint } from "react-to-print";
import "./compra.css"; // Importa un archivo CSS separado para los estilos
// ... (importaciones y otros componentes)

function FacturaModal({
  facturaId,
  totalPrice,
  allProducts,
  deliveryDate,
  deliveryAddress,
  nombre_cliente,
  correo_cliente,
  telefono_cliente,
  id_cliente,
}) {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const [customerData, setCustomerData] = useState({
    nombre_cliente: "",
    correo_cliente: "",
    telefono_cliente: "",
    id_cliente: "",
  });

  useEffect(() => {
    // Recuperar datos del cliente del localStorage
    const storedRegistrationData = localStorage.getItem("registrationData");

    // Verificar si hay datos almacenados
    if (storedRegistrationData) {
      const {
        nombre_cliente,
        correo_cliente,
        telefono_cliente,
        id_cliente,
      } = JSON.parse(storedRegistrationData);

      // Actualizar el estado con los datos recuperados del cliente
      setCustomerData({
        nombre_cliente,
        correo_cliente,
        telefono_cliente,
        id_cliente,
      });
    }
  }, []); // Ensure this effect runs only once on mount
  const navigate = useNavigate();

  return (
    <Modal
      isOpen={true}
      onRequestClose={() => {}}
      contentLabel="Factura"
      className="factura-modal"
      overlayClassName="factura-overlay"
    >
      <div ref={componentRef} className="factura-content mt-28">
        <div className="factura-header">

          <h2 className="factura-title">Factura de Compra</h2>
        </div>
        <div className="factura-info-section">
          <p className="factura-info">Número de factura: {facturaId}</p>
          <p className="factura-info">Fecha de compra: {getCurrentDate()}</p>
          <p className="factura-info">Dirección de entrega: {deliveryAddress}</p>
        </div>

        <div className="factura-section">
          <h3>Detalles del Cliente</h3>
          <p>Nombre: {customerData.nombre_cliente}</p>
          <p>Correo Electrónico: {customerData.correo_cliente}</p>
          <p>Teléfono: {customerData.telefono_cliente}</p>
          <p>Número de Identificación: {customerData.id_cliente}</p>
        </div>

        <div className="factura-section">
          <h3>Productos</h3>
          <table className="factura-table">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio Unitario</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {allProducts.map((product) => (
                <tr key={product.id}>
                  <td>{product.nombre_ancheta || product.nombre_producto}</td>
                  <td>{product.cantidad}</td>
                  <td>${product.valor_ancheta || product.precio}</td>
                  <td>${calculateSubtotal(product)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>


        <p className="factura-info factura-total">Total pagado: ${totalPrice}</p>
<div className="factura-buttons mt-4">
  <Button onClick={handlePrint} className="factura-button " text="Descargar Factura en PDF"/>

  <Button
  onClick={() => navigate("/")} // Assuming "/" is the path to the home page
  className="factura-button"
  text="Cerrar"
/>
</div>
      </div>

    </Modal>
  );
}

function getCurrentDate() {
  const currentDate = new Date();
  return currentDate.toLocaleDateString();
}

function calculateSubtotal(product) {
  return (product.valor_ancheta || product.precio) * product.cantidad;
}

function Compra({ allProducts, limpiarCarrito }) {
  const [facturaId, setFacturaId] = useState(null);
  const navigate = useNavigate();
const [nombre_cliente, setName] = useState("");
const [telefono_cliente, setPhone] = useState("");
const [id_cliente, setIdentification] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountHolder, setAccountHolder] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [showBankForm, setShowBankForm] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [email, setEmail] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");

  useEffect(() => {
    const totalPrice = allProducts.reduce((total, ancheta) => {
      return (
        total + ancheta.valor_ancheta * ancheta.cantidad ||
        total + ancheta.precio * ancheta.cantidad
      );
    }, 0);

    setTotalPrice(totalPrice);
  }, [allProducts]);


  const handleBankChange = (e) => {
    const selectedBank = e.target.value;
    setSelectedBank(selectedBank);
    setShowBankForm(
      selectedBank === "banco1" ||
        selectedBank === "banco2" ||
        selectedBank === "banco3" ||
        selectedBank === "banco4" ||
        selectedBank === "banco5" ||
        selectedBank === "banco6"
    );
  };

  const correo_cliente = localStorage.getItem("correo_cliente");

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    const formattedDateTime = `${deliveryDate} ${deliveryTime}`;
    const formattedDeliveryDateTime = new Date(formattedDateTime).toISOString();

    const anchetasFiltradas = allProducts.map((product) => {
      if (product.id_ancheta !== undefined) {
        return {
          id_ancheta: product.id_ancheta,
          cantidad: product.cantidad,
          nombre_ancheta: product.nombre_ancheta,
          valor_ancheta: product.valor_ancheta,
        };
      } else {
        return {
          id_producto: product.id_producto,
          cantidad: product.cantidad,
          nombre_producto: product.nombre_producto,
          precio: product.precio,
        };
      }
    });

    const datosCompra = {
      detalleOrden: anchetasFiltradas,
      id_cliente: localStorage.getItem("registrationData")
        ? JSON.parse(localStorage.getItem("registrationData")).id_cliente
        : "",
      correo_cliente: correo_cliente,
      direccion_entrega: deliveryAddress,
      fecha_entrega: formattedDeliveryDateTime,
      estado_pedido: "Pendiente",
    };

    const endpoint =
      allProducts.some((product) => product.id_ancheta !== undefined)
        ? endPoints.buy.postBuy
        : endPoints.buyPersonalize.postBuy;

    try {
      const response = await axios.post(endpoint, datosCompra);
      if (response.status === 200) {
        setFacturaId(response.data.facturaId);
        setResponseMessage(
          "Compra exitosa. ID de factura: " + response.data.facturaId
        );
        setShowConfirmation(true);
        limpiarCarrito();
      } else {
        setResponseMessage(
          "Error al realizar la compra. " + response.data.message
        );
      }
    } catch (error) {
      console.error(error);
      setResponseMessage(
        "Error al realizar la compra. " + error.response.data.message
      );
    }
  };

  if (showConfirmation) {
    return (
      <FacturaModal
        facturaId={facturaId}
        totalPrice={totalPrice}
        allProducts={allProducts}
        deliveryDate={deliveryDate}
        deliveryAddress={deliveryAddress}
        name={nombre_cliente}  // Pasamos las propiedades aquí
        email={correo_cliente}
        phone={telefono_cliente}
        identification={id_cliente}
      />
    );
  }

  return (
    <div className="container mt-32 text-center p-4 shadow-md rounded-lg max-w-md mx-auto">
      <h1 className="text-3xl font-semibold mb-4 text-center text-fuchsia-950">
        Finaliza tu compra
      </h1>
      <p className="text-fuchsia-950">Precio total: ${totalPrice}</p>
      <div className="mb-4">
        <label htmlFor="deliveryDate">Fecha de Entrega:</label>
        <input
          type="date"
          id="deliveryDate"
          className="w-full p-2 rounded-full focus:ring-pink-600"
          onChange={(e) => setDeliveryDate(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="deliveryTime">Hora de Entrega:</label>
        <input
          type="time"
          id="deliveryTime"
          className="w-full p-2 rounded-full focus:ring-pink-600"
          onChange={(e) => setDeliveryTime(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="deliveryAddress">Dirección de Entrega:</label>
        <input
          type="text"
          id="deliveryAddress"
          className="w-full p-2 rounded-full focus:ring-pink-600"
          onChange={(e) => setDeliveryAddress(e.target.value)}
        />
      </div>
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
          <select
            id="bank"
            className="w-full p-2 rounded-full focus:ring-pink-600"
            onChange={handleBankChange}
          >
            <option value="">Seleccionar banco</option>
            <option value="banco1">Nequi</option>
            <option value="banco2">Bancolombia</option>
            <option value="banco3">Banco de Bogotá</option>
            <option value="banco4">Banco de la Mujer</option>
            <option value="banco5">Davivienda</option>
          </select>
        </div>

        {showBankForm && (
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-center text-fuchsia-950">
              Datos Bancarios
            </h2>
            <h3>
              Por tu seguridad no guardaremos esta información{" "}
              <a href="" className=" text-sky-600">
                términos y condiciones
              </a>
            </h3>
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
                  <label htmlFor="password">Clave:</label>
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
    