import { useState } from "react";
import axios from "axios";
import Button from "../Atoms/Button/Button";
import endPoints from "../../services/api";

export default function LlenarDatos() {
  const [formData, setFormData] = useState({
    nombre_cliente: "",
    apellido_cliente: "",
    direccion_cliente: "",
    ciudad_cliente: "",
    telefono_cliente: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (ev) => {
    ev.preventDefault();
  
    try {
      const response = await axios.put(
        endPoints.cliente.updateCliente, // Reemplaza con la ruta correcta de tu API
        formData
      );
  
      // Maneja la respuesta según tus necesidades
      console.log("Respuesta del servidor:", response.data);
    } catch (error) {
      // Maneja los errores
      console.error("Error al actualizar datos:", error);
    }
  };
  
  return (
    <>
      <form
        className="w-4/6 text-align:center justify-content:center ml-96 mt-24"
        onSubmit={handleUpdate}
      >
        {/* ... Otros campos del formulario */}
        <div className="sm:col-span-3">
          <label
            htmlFor="nombre_cliente"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Nombre
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="nombre_cliente"
              id="nombre_cliente"
              autoComplete="given-name"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={formData.nombre_cliente}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="sm:col-span-3">
          <label
            htmlFor="apellido_cliente"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Apellido
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="apellido_cliente"
              id="apellido_cliente"
              autoComplete="family-name"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={formData.apellido_cliente}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-span-full">
          <label
            htmlFor="direccion_cliente"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Dirección
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="direccion_cliente"
              id="direccion_cliente"
              autoComplete="street-address"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={formData.direccion_cliente}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="sm:col-span-2 sm:col-start-1">
          <label
            htmlFor="ciudad_cliente"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Ciudad
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="ciudad_cliente"
              id="ciudad_cliente"
              autoComplete="address-level2"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={formData.ciudad_cliente}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="telefono_cliente"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Teléfono
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="telefono_cliente"
              id="telefono_cliente"
              autoComplete="tel"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={formData.telefono_cliente}
              onChange={handleChange}
            />
          </div>
        </div>
        {/* Repite la estructura anterior para los demás campos del formulario */}
        <div className="mt-6 flex items-center justify-center gap-x-6">
          <Button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
            text= "Cancelar"
          >

          </Button>
          <Button
  type="submit"
  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
  text="Guardar"
>
  
</Button>

        </div>
      </form>
    </>
  );
}
