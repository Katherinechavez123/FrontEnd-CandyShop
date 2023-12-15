import "./New.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../../../components/Atoms/Button/Button";

const API = import.meta.env.VITE_API_URL;

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

const New = ({ onAddAncheta, onCancel }) => {
  const [nombre, setNombre] = useState("");
  const [valor, setValor] = useState("");
  const [detalle, setDetalle] = useState("");
  const [categoria, setCategoria] = useState("");
  const [cantidadInventario, setCantidadInventario] = useState("");
  const [file, setFile] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [modalError, setModalError] = useState(null);
  const [modalConfirm, setModalConfirm] = useState(null);
  const [errorMessages, setErrorMessages] = useState({});

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
    if (!valor.trim()) {
      errors.valor = "El valor es obligatorio.";
    }
    if (!detalle.trim()) {
      errors.detalle = "El detalle es obligatorio.";
    }
    if (!categoria.trim()) {
      errors.categoria = "La categoría es obligatoria.";
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
      setModalError(
        <ModalError message={errorMessage} onClose={() => setModalError(null)} />
      );
      return;
    }

    try {
      const formData = new FormData();

      formData.append("url_imagen_ancheta", file);
      formData.append("nombre_ancheta", nombre);
      formData.append("valor_ancheta", valor);
      formData.append("detalle_ancheta", detalle);
      formData.append("categoria", categoria);
      formData.append("cantidad_inventario", cantidadInventario);

      const response = await axios.post(`${API}/anchetas-admin`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const responseImageUrl = response.data.imageUrl;

      onAddAncheta && onAddAncheta();

      setShowSuccessMessage(true);

      setTimeout(() => {
        setShowSuccessMessage(false);
        navigate("/anchetas-admin");
      }, 2000);
    } catch (error) {
      const errorMessage = "Error al agregar la ancheta. Inténtalo de nuevo.";
      setModalError(
        <ModalError message={errorMessage} onClose={() => setModalError(null)} />
      );
    }
  };

  const handleCancelClick = () => {
    const confirmationMessage = "¿Estás seguro que deseas cancelar?";
    setModalConfirm(
      <ModalConfirm
        message={confirmationMessage}
        onConfirm={() => {
          onCancel && onCancel();
          navigate("/anchetas-admin");
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
          <h1>Añadir Nueva Ancheta</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              <div className="formInput">
                <label>Nombre:</label>
                <input
                  type="text"
                  className="rounded-full"
                  placeholder="Nombre de la ancheta"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
                {errorMessages.nombre && (
                  <span className="error-message">{errorMessages.nombre}</span>
                )}
              </div>

              <div className="formInput">
                <label>Valor:</label>
                <input
                  type="number"
                  className="rounded-full"
                  placeholder="Valor de la ancheta"
                  value={valor}
                  onChange={(e) => setValor(e.target.value)}
                />
                {errorMessages.valor && (
                  <span className="error-message">{errorMessages.valor}</span>
                )}
              </div>

              <div className="formInput">
                <label>Detalle:</label>
                <input
                  type="text"
                  className="rounded-full"
                  placeholder="Detalle de la ancheta"
                  value={detalle}
                  onChange={(e) => setDetalle(e.target.value)}
                />
                {errorMessages.detalle && (
                  <span className="error-message">{errorMessages.detalle}</span>
                )}
              </div>

              <div className="formInput">
                <label>Categoría:</label>
                <input
                  type="text"
                  className="rounded-full"
                  placeholder="Categoría de la ancheta"
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                />
                {errorMessages.categoria && (
                  <span className="error-message">{errorMessages.categoria}</span>
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
                  name="url_imagen_ancheta"
                  onChange={handleFileChange}
                  accept="image/*"
                />
                {errorMessages.file && (
                  <span className="error-message">{errorMessages.file}</span>
                )}
              </div>

              <Button type="button" onClick={handleAddClick} text={"Añadir Ancheta"}></Button>
              <Button type="button" onClick={handleCancelClick} text={"Cancelar"}></Button>
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
            <p>¡Ancheta Añadida!</p>
          </div>
        </div>
      )}

      {modalError}

      {modalConfirm}
    </div>
  );
};

export default New;
