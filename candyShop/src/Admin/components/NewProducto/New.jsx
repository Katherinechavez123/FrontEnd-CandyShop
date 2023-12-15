// NewProducto.jsx
import "./New.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../../../components/Atoms/Button/Button";

const API = import.meta.env.VITE_API_URL;
// ModalError.jsx
const ModalError = ({ message, onClose }) => (
  <div className="modal modal-error">
    <div className="modal-content">
      <p>{message}</p>
      <button onClick={onClose}>Cerrar</button>
    </div>
  </div>
);

// ModalConfirm.jsx
const ModalConfirm = ({ message, onConfirm, onCancel }) => (
  <div className="modal modal-confirm">
    <div className="modal-content">
      <p>{message}</p>
      <button onClick={onConfirm}>Confirmar</button>
      <button onClick={onCancel}>Cancelar</button>
    </div>
  </div>
);

const NewProducto = ({ onAddProducto, onCancel }) => {
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("");
  const [precio, setPrecio] = useState("");
  const [cantidadInventario, setCantidadInventario] = useState("");
  const [file, setFile] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [modalError, setModalError] = useState(null);
  const [modalConfirm, setModalConfirm] = useState(null);

  // Define el estado de los mensajes de error
  const [errorMessages, setErrorMessages] = useState({
    nombre: "",
    tipo: "",
    precio: "",
    cantidadInventario: "",
    file: "",
  });

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log("Selected File:", selectedFile);
    setFile(selectedFile);
  };

  const validateFields = () => {
    const errors = {};
    if (!nombre.trim()) {
      errors.nombre = "El nombre es obligatorio.";
    }
    if (!tipo.trim()) {
      errors.tipo = "El tipo es obligatorio.";
    }
    if (!precio.trim()) {
      errors.precio = "El precio es obligatorio.";
    }
    if (!cantidadInventario.trim()) {
      errors.cantidadInventario = "La cantidad en inventario es obligatoria.";
    }
    if (!file) {
      errors.file = "La imagen es obligatoria.";
    }
    setErrorMessages(errors);
    return errors;
  };

  const handleAddClick = async () => {
    const errors = validateFields();

    if (Object.keys(errors).length > 0) {
      const errorMessage = "Por favor, completa todos los campos.";
      setModalError(<ModalError message={errorMessage} onClose={() => setModalError(null)} />);
      return;
    }

    try {
      const formData = new FormData();

      formData.append("url_imagen_producto", file);
      formData.append("nombre_producto", nombre);
      formData.append("tipo_producto", tipo);
      formData.append("precio", precio);
      formData.append("cantidad_productos_inventario", cantidadInventario);

      const response = await axios.post(`${API}/productos-admin`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const responseImageUrl = response.data.imageUrl;

      onAddProducto && onAddProducto();

      setShowSuccessMessage(true);

      setTimeout(() => {
        setShowSuccessMessage(false);
        navigate("/productos-admin");
      }, 2000);
    } catch (error) {
      const errorMessage = "Error al agregar el producto. Inténtalo de nuevo.";
      setModalError(<ModalError message={errorMessage} onClose={() => setModalError(null)} />);
    }
  };

  const handleCancelClick = () => {
    const confirmationMessage = "¿Estás seguro que deseas cancelar?";
    setModalConfirm(
      <ModalConfirm
        message={confirmationMessage}
        onConfirm={() => {
          onCancel && onCancel();
          navigate("/productos-admin");
          setModalConfirm(null);
        }}
        onCancel={() => setModalConfirm(null)}
      />
    );
  };

  return (
    <div className="new">
      <div className="newContainer">
        <div className="top">
          <h1>Añadir Nuevo Producto</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              <div className="formInput">
                <label>Nombre:</label>
                <input
                  type="text"
                  className="rounded-full"
                  placeholder="Nombre del producto"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
                {errorMessages.nombre && (
                  <span className="error-message">{errorMessages.nombre}</span>
                )}
              </div>

              <div className="formInput">
                <label>Tipo:</label>
                <input
                  type="text"
                  className="rounded-full"
                  placeholder="Tipo del producto"
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                />
                {errorMessages.tipo && (
                  <span className="error-message">{errorMessages.tipo}</span>
                )}
              </div>

              <div className="formInput">
                <label>Precio:</label>
                <input
                  type="number"
                  className="rounded-full"
                  placeholder="Precio del producto"
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                />
                {errorMessages.precio && (
                  <span className="error-message">{errorMessages.precio}</span>
                )}
              </div>

              <div className="formInput">
                <label>Cantidad en Inventario:</label>
                <input
                  type="number"
                  className="rounded-full"
                  placeholder="Cantidad en inventario"
                  value={cantidadInventario}
                  onChange={(e) => setCantidadInventario(e.target.value)}
                />
                {errorMessages.cantidadInventario && (
                  <span className="error-message">{errorMessages.cantidadInventario}</span>
                )}
              </div>

              <div className="formInput">
                <label>Imagen:</label>
                <input
                  className="rounded-full"
                  type="file"
                  name="url_imagen_producto"
                  onChange={handleFileChange}
                  accept="image/*"
                />
                {errorMessages.file && (
                  <span className="error-message">{errorMessages.file}</span>
                )}
              </div>

              <Button
                type="button"
                onClick={handleAddClick}
                text={"Añadir Producto"}
              ></Button>

              <Button
                type="button"
                onClick={handleCancelClick}
                text={"Cancelar"}
              ></Button>
            </form>
          </div>
        </div>
      </div>
      {showSuccessMessage && (
        <div className="modal-container">
          <div className="modal">
            <img
              src="http://localhost:10101/img/newProductoPersonalizado-1702394377617.png"
              alt="exito"
            />
            <p>¡Producto Añadido!</p>
          </div>
        </div>
      )}
      {modalError}
      {modalConfirm}
    </div>
  );
};
export { NewProducto, ModalConfirm, ModalError };

