import React, { useState, useEffect, useRef } from "react";
import Button from "../Atoms/Button/Button";
import endPoints from "../../services/api";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { useReactToPrint } from "react-to-print";
import "./compra.css";

const formatPrice = (price) => {
  if (typeof price === "string") {
    const numericValue = parseFloat(price.replace(/[^\d.-]/g, ""));
    if (!isNaN(numericValue)) {
      return numericValue.toLocaleString("es-ES");
    }
  } else if (typeof price === "number") {
    return price.toLocaleString("es-ES");
  }

  return price;
};
const setAvailableHoursForDate = (selectedDate) => {
  // Tu lógica para establecer las horas disponibles según la fecha seleccionada
  // Por ejemplo, podrías obtener esta información de una API
  const hours = ["10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM", "6:00 PM"];
  setAvailableHours(hours);
};

function FacturaModal(props) {
  const {
    facturaId,
    totalPrice,
    allProducts,
    deliveryDate,
    deliveryAddress,
    nombre_cliente,
    correo_cliente,
    telefono_cliente,
    id_cliente,
    showFacturaProp = false,
  } = props;
  const componentRef = useRef();
  const [showFactura, setShowFactura] = useState(showFacturaProp); // Agrega estado para controlar la visibilidad

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => setShowFactura(true),
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
      const { nombre_cliente, correo_cliente, telefono_cliente, id_cliente } =
        JSON.parse(storedRegistrationData);

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
  const handleCerrarClick = () => {
    // Navegar a la página de inicio
    navigate("/");
  };
  return (
    <Modal
      isOpen={showFactura} // Añade esta línea
      contentLabel="Factura"
      className="factura-modal"
      overlayClassName="factura-overlay"
    >
      <div ref={componentRef} className="factura-content">
        <div className="factura-header">
          <div className="div-factura">
            <img
              className="logo-factura"
              src="https://candyshop.publitin.net/redetron/wp-content/uploads/2023/06/logo-v1-01.png"
              alt="logo"
            />
          </div>

          <h2 className="factura-title">Factura de Compra</h2>
        </div>
        <div className="factura-info-section">
          <p className="factura-info">Número de factura: {facturaId}</p>
          <p className="factura-info">Fecha de compra: {getCurrentDate()}</p>
          <p className="factura-info">
            Dirección de entrega: {deliveryAddress}
          </p>
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
                  <td>
                    ${formatPrice(product.valor_ancheta || product.precio)}
                  </td>
                  <td>${formatPrice(calculateSubtotal(product))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="factura-info factura-total">
          Total pagado: ${formatPrice(totalPrice)}
        </p>
        <div className="factura-buttons mt-4">
          <Button
            onClick={handlePrint}
            className="factura-button "
            text="Descargar en PDF"
          />

          <Button
            onClick={handleCerrarClick} // Suponiendo que "/" es la ruta a la página de inicio
            className="factura-button"
            text="Cerrar"
          />
        </div>
      </div>
    </Modal>
  );
}

function SuccessfulPurchaseModal({ onClose }) {
  return (
    <div className="modal-container">
      <div className="modal">
        <img
          src="http://localhost:10101/img/newProductoPersonalizado-1702394377617.png"
          alt="exito"
        />
        <p>¡Compra exitosa!</p>
      </div>
    </div>
  );
}

function getCurrentDate() {
  const currentDate = new Date();
  return currentDate.toLocaleDateString();
}

function calculateSubtotal(product) {
  return (product.valor_ancheta || product.precio) * product.cantidad;
}
function CustomerData() {
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
      const { nombre_cliente, correo_cliente, telefono_cliente, id_cliente } =
        JSON.parse(storedRegistrationData);

      // Actualizar el estado con los datos recuperados del cliente
      setCustomerData({
        nombre_cliente,
        correo_cliente,
        telefono_cliente,
        id_cliente,
      });
    }
  }, []); // Ensure this effect runs only once on mount

  return customerData;
}

function Compra({ allProducts, limpiarCarrito }) {
  const [facturaId, setFacturaId] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedBank, setSelectedBank] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [showBankForm, setShowBankForm] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [email, setEmail] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [error, setError] = useState(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showFactura, setShowFactura] = useState(false);

  const [availableHours, setAvailableHours] = useState([]);
  const { currentDate, maxDate } = getCurrentDate();

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;

    // Verifica si la fecha seleccionada es válida
    if (selectedDate < currentDate || selectedDate > maxDate) {
      setError(
        "La fecha de entrega debe ser posterior a la fecha actual y dentro de los próximos 2 meses."
      );
      setShowErrorModal(true);
      return;
    }

    // Limpiamos el error si la fecha es válida
    setError(null);
    setDeliveryDate(selectedDate);
  };
  const [showFacturaModal, setShowFacturaModal] = useState(false);

  // Establecer las horas disponibles de 8 am a 7 pm
  useEffect(() => {
    const hours = [];
    for (let i = 8; i <= 19; i++) {
      const formattedHour = i < 10 ? `0${i}` : `${i}`;
      hours.push(`${formattedHour}:00`);
    }
    setAvailableHours(hours);
  }, []);

  const handleHourChange = (e) => {
    const selectedHour = e.target.value;
    setDeliveryTime(selectedHour);
  };
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
    if (!deliveryDate || !deliveryTime || !deliveryAddress) {
      setError("Todos los campos marcados con * son obligatorios.");
      setShowErrorModal(true);
      return;
    }

    const currentDate = new Date();
    const formattedCurrentDate = currentDate.toISOString().split("T")[0];

    if (!deliveryDate || deliveryDate <= formattedCurrentDate) {
      setError("La fecha de entrega debe ser posterior a la fecha actual.");
      setShowErrorModal(true);
      return;
    }

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

    /*const anchetasFiltradas = allProducts.map((product) => ({
      id_ancheta: product.id_ancheta ?? null,
      cantidad: product.cantidad,
      id_producto:product.id_producto,
      nombre_ancheta: product.nombre_ancheta ?? product.nombre_producto,
      valor_ancheta: product.valor_ancheta ?? product.precio,
    }));*/
    const datosCompra = {
      detalleOrden: anchetasFiltradas,
      id_cliente: localStorage.getItem("registrationData")
        ? JSON.parse(localStorage.getItem("registrationData")).id_cliente
        : "",
      correo_cliente: localStorage.getItem("correo_cliente"),
      direccion_entrega: deliveryAddress,
      fecha_entrega: formattedDeliveryDateTime,
      estado_pedido: "Pendiente",
    };

    const endpoint = allProducts.some(
      (product) => product.id_ancheta !== undefined
    )
      ? endPoints.buy.postBuy // Si hay al menos una ancheta en los productos, usa el endpoint buy-default
      : endPoints.buyPersonalize.postBuy; // Si no hay anchetas, usa el endpoint buy-personalize
    try {
      const response = await axios.post(endpoint, datosCompra);
      console.log(response);
      if (response.data.code === 200) {
        setFacturaId(response.data.facturaId);
        setShowSuccessModal(true);
        setTimeout(() => {
          setShowFacturaModal(true);
          setTimeout(() => {
            limpiarCarrito();
          }, 15000);
        }, 3000);


      } else {
        setError("Error al realizar la compra. " + response.data.error);
        setShowErrorModal(true);
      }
    } catch (error) {
      setError("Error al realizar la compra. " + error.response.data.error);
      setShowErrorModal(true);
    }
  };

  useEffect(() => {
    if (showSuccessModal) {
      setTimeout(() => {
        setShowSuccessModal(false);
      }, 3000);
    }
  }, [showSuccessModal]);

  function getCurrentDate(addedMonths = 2) {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);

    // Calcula la fecha máxima permitida (2 meses adicionales)
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + addedMonths);

    const formattedCurrentDate = currentDate.toISOString().split("T")[0];
    const formattedMaxDate = maxDate.toISOString().split("T")[0];

    return { currentDate: formattedCurrentDate, maxDate: formattedMaxDate };
  }
  return (
    <div className="container mt-32 text-center p-4 shadow-md rounded-lg max-w-md mx-auto">
      <h1 className="text-3xl font-semibold mb-4 text-center text-fuchsia-950">
        Finaliza tu compra
      </h1>
      <p className="text-fuchsia-950 text-xl">
        Precio total: ${formatPrice(totalPrice)}
      </p>
      <br />
      <div className="mb-4">
        <label htmlFor="deliveryDate">
          Fecha de Entrega<span className="text-red-600">*</span>:
        </label>
        <input
          type="date"
          id="deliveryDate"
          className="w-full p-2 rounded-full focus:ring-pink-600"
          onChange={handleDateChange}
          min={currentDate}
          max={maxDate} // Establecer la fecha máxima permitida
          required
        />
        <h2 className="text-red-600">
          *Recuerda que no puedes programar entregas superiores a dos meses*
        </h2>
        {showErrorModal && (
          <div className="error-popup">
            <p>{error}</p>
            <button onClick={() => setShowErrorModal(false)}>Cerrar</button>
          </div>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="deliveryTime">
          Hora de Entrega<span className="text-red-600">*</span>:
        </label>
        <select
          id="deliveryTime"
          className="w-full p-2 rounded-full focus:ring-pink-600"
          onChange={handleHourChange}
          required
        >
          <option value="">Seleccionar hora</option>
          {availableHours.map((hour) => (
            <option key={hour} value={hour}>
              {hour}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="deliveryAddress">
          Dirección de Entrega<span className="text-red-600">*</span>:
        </label>
        <input
          type="text"
          id="deliveryAddress"
          className="w-full p-2 rounded-full focus:ring-pink-600"
          onChange={(e) => setDeliveryAddress(e.target.value)}
          required
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
          <label htmlFor="name">
            Nombre Completo<span className="text-red-600">*</span>:
          </label>
          <input
            type="text"
            id="name"
            className="w-full p-2 rounded-full focus:ring-pink-600"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email">
            Correo Electrónico<span className="text-red-600">*</span>:
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-2 rounded-full focus:ring-pink-600"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone">
            Teléfono<span className="text-red-600">*</span>:
          </label>
          <input
            type="tel"
            id="phone"
            className="w-full p-2 rounded-full focus:ring-pink-600"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="identification">
            Número de Identificación<span className="text-red-600">*</span>:
          </label>
          <input
            type="text"
            id="identification"
            className="w-full p-2 rounded-full focus:ring-pink-600"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="bank">
            Seleccione el banco<span className="text-red-600">*</span>:
          </label>
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
              <Link to={"/terminos"}>
                <h3>términos y condiciones</h3>
                </Link>
            </h3>
            <br />

            <div className="mb-4">
              <label htmlFor="accountNumber">
                Número de cuenta<span className="text-red-600">*</span>:
              </label>
              <input
                type="text"
                id="accountNumber"
                className="w-full p-2 rounded-full focus:ring-pink-600"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="accountHolder">
                Nombre del titular<span className="text-red-600">*</span>:
              </label>
              <input
                type="text"
                id="accountHolder"
                className="w-full p-2 rounded-full focus:ring-pink-600"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password">
                Clave<span className="text-red-600">*</span>:
              </label>
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
      {showSuccessModal && <SuccessfulPurchaseModal />}
      {showFacturaModal && (
        <FacturaModal
          facturaId={facturaId}
          totalPrice={totalPrice}
          allProducts={allProducts}
          deliveryDate={deliveryDate}
          deliveryAddress={deliveryAddress}
          showFacturaProp={showFacturaModal}
        />
      )}

      {showErrorModal && (
        <div className="error-popup">
          <p>{error}</p>
          <button onClick={() => setShowErrorModal(false)}>Cerrar</button>
        </div>
      )}
    </div>
  );
}

export default Compra;
