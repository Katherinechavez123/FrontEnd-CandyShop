import "./New.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../../../components/Atoms/Button/Button";

const API = import.meta.env.VITE_API_URL;

const New = ({ onAddAncheta, onCancel }) => {
  const [nombre, setNombre] = useState("");
  const [valor, setValor] = useState("");
  const [detalle, setDetalle] = useState("");
  const [categoria, setCategoria] = useState("");
  const [cantidadInventario, setCantidadInventario] = useState("");
  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log("Selected File:", selectedFile);
    setFile(selectedFile);
  };
  const handleAddClick = async () => {
    try {
      const formData = new FormData();

  
      // Asegúrate de que la clave ('url_imagen_ancheta') coincida con la esperada en el servidor
      formData.append("url_imagen_ancheta", file);
      formData.append("nombre_ancheta", nombre);
      formData.append("valor_ancheta", valor);
      formData.append("detalle_ancheta", detalle);
      formData.append("categoria", categoria);
      formData.append("cantidad_inventario", cantidadInventario);
  
      console.log("Form Data:", formData);
  
      const response = await axios.post(`${API}/anchetas-admin`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      // Verifica que response.data.imageUrl proporcione la URL de la imagen correctamente
      const responseImageUrl = response.data.imageUrl;
  
      onAddAncheta && onAddAncheta();
  
      navigate("/anchetas-admin");
    } catch (error) {
      console.error("Error al agregar la ancheta", error);
      // Muestra un mensaje de error al usuario o realiza alguna acción específica
    }
  };
  
  
  const handleCancelClick = () => {
    const isConfirmed = window.confirm("¿Estás seguro que deseas cancelar?");

    if (isConfirmed) {
      onCancel && onCancel();
      navigate("/anchetas-admin");
    }
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
              </div>

              <div className="formInput">
                <label>Imagen:</label>
                <input
                  className="rounded-full"
                  type="file"
                  name="url_imagen_ancheta"  // Asegúrate de que este sea el nombre esperado en el servidor
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </div>

              <Button
                type="button"
                onClick={handleAddClick}
                text={"Añadir Ancheta"}
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
    </div>
  );
};

export default New;
