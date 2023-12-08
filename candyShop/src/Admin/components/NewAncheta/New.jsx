// New.js

import "./New.scss";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import endPoints from "../../../services/api";
import axios from "axios";
import Button from "../../../components/Atoms/Button/Button";
const API = import.meta.env.VITE_API_URL;

const New = ({ onAddAncheta, onCancel }) => {
  const [file, setFile] = useState(null);
  const [nombre, setNombre] = useState("");
  const [valor, setValor] = useState("");
  const [detalle, setDetalle] = useState("");
  const [categoria, setCategoria] = useState("");
  const [cantidadInventario, setCantidadInventario] = useState("");
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleAddClick = async () => {
    try {
      // Crea un objeto FormData para enviar la imagen al backend
      const formData = new FormData();
      formData.append("imagen", file);

      // Realiza una solicitud para subir la imagen y obtén la URL
      const response = await axios.post(endPoints.admin.uploadImage, formData);
      const urlImagenSubida = response.data.url; // Ajusta según la respuesta real del backend

      // Crea un objeto con los datos de la ancheta, incluida la URL de la imagen
      const nuevaAncheta = {
        nombre_ancheta: nombre,
        valor_ancheta: valor,
        url_imagen_ancheta: urlImagenSubida,
        detalle_ancheta: detalle,
        categoria: categoria,
        cantidad_inventario: cantidadInventario,
        // Agrega otros campos según tu modelo de datos
      };

      // Realiza una solicitud para agregar la ancheta utilizando la URL correspondiente
      await axios.post(`${API}/anchetas-admin`, nuevaAncheta);

      // Llama a la función proporcionada por el padre para manejar la adición de la ancheta
      onAddAncheta(nuevaAncheta);
    } catch (error) {
      console.error("Error al agregar la ancheta", error);
      // Puedes manejar el error de alguna manera, por ejemplo, mostrando un mensaje al usuario
    }
  };
  const handleCancelClick = () => {
    const isConfirmed = window.confirm("¿Estás seguro que deseas cancelar?");
    
    if (isConfirmed) {
      // Llama a la función proporcionada por el padre para cancelar la operación
      onCancel();
  
      // Redirige a la ruta "anchetas-admin"
      window.location.href = "/anchetas-admin";
    }
  };
  
  return (
    <div className="new">
      <div className="newContainer">
        <div className="top">
          <h1>Añadir Nueva Ancheta</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <label htmlFor="file" className="fileLabel">
              <img
                src={
                  file
                    ? URL.createObjectURL(file)
                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                }
                alt=""
                className="previewImage"
              />
              <DriveFolderUploadOutlinedIcon className="uploadIcon" />
              <input
                type="file"
                id="file"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </label>
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label>Nombre:</label>
                <input
                  type="text"
                  placeholder="Nombre de la ancheta"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>

              <div className="formInput">
                <label>Valor:</label>
                <input
                  type="number"
                  placeholder="Valor de la ancheta"
                  value={valor}
                  onChange={(e) => setValor(e.target.value)}
                />
              </div>

              <div className="formInput">
                <label>Detalle:</label>
                <input
                  type="text"
                  placeholder="Detalle de la ancheta"
                  value={detalle}
                  onChange={(e) => setDetalle(e.target.value)}
                />
              </div>

              <div className="formInput">
                <label>Categoría:</label>
                <input
                  type="text"
                  placeholder="Categoría de la ancheta"
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                />
              </div>

              <div className="formInput">
                <label>Cantidad en Inventario:</label>
                <input
                  type="number"
                  placeholder="Cantidad en inventario"
                  value={cantidadInventario}
                  onChange={(e) => setCantidadInventario(e.target.value)}
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
