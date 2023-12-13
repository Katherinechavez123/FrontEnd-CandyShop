// Importa las bibliotecas necesarias y los estilos
import "./New.scss";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Button from "../../../components/Atoms/Button/Button";
import { ModalConfirm, ModalError } from "../NewProducto/New";

const API = import.meta.env.VITE_API_URL;

// Define el componente EditarAncheta
const EditarAncheta = ({ onUpdateAncheta, onCancel }) => {
  // Estado para almacenar los datos de la ancheta
  const [nombre_ancheta, setNombre] = useState("");
  const [valor, setValor] = useState("");
  const [detalle, setDetalle] = useState("");
  const [categoria, setCategoria] = useState("");
  const [cantidadInventario, setCantidadInventario] = useState("");
  const [file, setFile] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [modalError, setModalError] = useState(null);
  const [modalConfirm, setModalConfirm] = useState(null);

  // Obtiene el ID de la ancheta de los parámetros de la URL
  const { id } = useParams();

  // Objeto de navegación para redirigir después de la actualización
  const navigate = useNavigate();

  // Hook useEffect para cargar los datos de la ancheta al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Realiza una solicitud para obtener los datos de la ancheta por su ID
        const response = await axios.get(`${API}/anchetas-admin/${id}`);
        const anchetaData = response.data.product;

        // Actualiza el estado con los datos de la ancheta
        setNombre(anchetaData.nombre_ancheta || "");
        setValor(anchetaData.valor_ancheta || "");
        setDetalle(anchetaData.detalle_ancheta || "");
        setCategoria(anchetaData.categoria || "");
        setCantidadInventario(anchetaData.cantidad_inventario || "");
      } catch (error) {
        console.error("Error al cargar los datos de la ancheta", error);
        // Maneja el error de acuerdo a tus necesidades
      }
    };

    fetchData();
  }, [id]);

  // Manejador de cambio de archivo
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };
  const [errorMessages, setErrorMessages] = useState({
    nombre: "",
    tipo: "",
    precio: "",
    cantidadInventario: "",
    file: "",
  });

  // Validaciones para campos obligatorios
  const validateFields = () => {
    const errors = {};
    if (!nombre_ancheta.trim()) {
      errors.nombre_ancheta = "El nombre es obligatorio.";
    }
    if (!`${valor}`.trim()) {
      errors.valor = "El valor es obligatorio.";
    }
    if (!detalle.trim()) {
      errors.detalle = "El detalle es obligatorio.";
    }
    if (!categoria.trim()) {
      errors.categoria = "La categoría es obligatoria.";
    }
    if (!`${cantidadInventario}`.trim()) {
      errors.cantidadInventario = "La cantidad en inventario es obligatoria.";
    }
    if (!file) {
      errors.file = "La imagen es obligatoria.";
    }
    setErrorMessages(errors);
    return errors;
  };

  // Manejador de clic en el botón de actualizar
  const handleUpdateClick = async () => {
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
      formData.append("nombre_ancheta", nombre_ancheta);
      formData.append("valor_ancheta", valor);
      formData.append("detalle_ancheta", detalle);
      formData.append("categoria", categoria);
      formData.append("cantidad_inventario", cantidadInventario);

      const response = await axios.put(
        `${API}/anchetas-admin/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Llama a la función de actualización proporcionada como prop
      onUpdateAncheta && onUpdateAncheta();
      // Muestra el mensaje de éxito
      setShowSuccessMessage(true);

      // Después de 2 segundos, oculta el mensaje y redirige
      setTimeout(() => {
        setShowSuccessMessage(false);
        // Redirige a la página de anchetas después de la actualización
        navigate("/anchetas-admin");
      }, 2000);
    } catch (error) {
      const errorMessage =
        "Error al actualizar la ancheta. Inténtalo de nuevo.";
      setModalError(
        <ModalError message={errorMessage} onClose={() => setModalError(null)} />
      );
    }
  };

  // Manejador de clic en el botón de cancelar
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

  // Renderiza el componente
  return (
    <div className="new">
      <div className="newContainer">
        <div className="top">
          <h1>Editar Ancheta</h1>
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
                  value={nombre_ancheta}
                  onChange={(e) => setNombre(e.target.value)}
                />
                {errorMessages.nombre_ancheta && (
                  <span className="error-message">{errorMessages.nombre_ancheta}</span>
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

              <Button
                type="button"
                onClick={handleUpdateClick}
                text={"Actualizar"}
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
            <p>¡Ancheta Actualizada!</p>
          </div>
        </div>
      )}
      {modalError}
      {modalConfirm}
    </div>
  );
};

export default EditarAncheta;
