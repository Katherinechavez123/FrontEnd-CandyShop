import React, { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";

import "./Sales.css";

const API = import.meta.env.VITE_API_URL;

const Sales = () => {
  const [data, setData] = useState({
    predeterminadaAncheta: [],
    personalizadaAncheta: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API}/sales-admin`);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleStatusChange = async (idVenta, newStatus) => {
    try {
      await axios.put(`${API}/sales-admin`, {
        id_venta_ancheta: idVenta,
        nuevo_estado: newStatus,
      });
      const response = await axios.get(`${API}/sales-admin`);
      setData(response.data);
    } catch (error) {
      console.error("Error al cambiar el estado del pedido", error);
    }
  };

  const handleExportToExcel = () => {
    const workbook = XLSX.utils.book_new();
    const predeterminadaSheet = XLSX.utils.json_to_sheet(data.predeterminadaAncheta);
    const personalizadaSheet = XLSX.utils.json_to_sheet(data.personalizadaAncheta);
    XLSX.utils.book_append_sheet(workbook, predeterminadaSheet, "Predeterminada");
    XLSX.utils.book_append_sheet(workbook, personalizadaSheet, "Personalizada");
    XLSX.writeFile(workbook, "ventas.xlsx");
  };

  const getStatusColor = (estadoPedido) => {
    if (!estadoPedido) {
      return "black";
    }

    switch (estadoPedido.toLowerCase()) {
      case "pendiente":
        return "red";
      case "entregado":
        return "green";
      default:
        return "black";
    }
  };

  const filteredData =
    filter === "all"
      ? [...data.predeterminadaAncheta, ...data.personalizadaAncheta]
      : filter === "predeterminada"
      ? data.predeterminadaAncheta
      : data.personalizadaAncheta;

  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  if (error) {
    return <div className="error">Error: {error.message}</div>;
  }

  return (
    <div className="sales-container">
      <div className="filter-section">
        <div className="filter">
          <label>Filtrar por:</label>
          <select onChange={(e) => setFilter(e.target.value)}>
            <option value="all">Todas</option>
            <option value="predeterminada">Predeterminadas</option>
            <option value="personalizada">Personalizadas</option>
          </select>
        </div>
      </div>
      <div className="export-section">
        <div className="export-button">
          <button onClick={handleExportToExcel}>Exportar a Excel</button>
        </div>
      </div>
      <table className="sales-table">
        <thead>
          <tr>
            <th>ID Venta</th>
            <th>Fecha</th>
            <th>Valor</th>
            <th>Dirección de Entrega</th>
            <th>Estado del Pedido</th>
            <th>Nombre del Cliente</th>
            <th>Apellido del Cliente</th>
            <th>Tipo</th>
            <th>ID Producto</th>
            <th>Cantidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((venta, index) => (
            <tr key={index}>
              <td>{venta.id_venta}</td>
              <td>{venta.fecha}</td>
              <td>{venta.valor}</td>
              <td>{venta.direccion_entrega}</td>
              <td style={{ color: getStatusColor(venta.estado_pedido) }}>
                {venta.estado_pedido}
              </td>
              <td>{venta.nombre_cliente}</td>
              <td>{venta.apellido_cliente}</td>
              <td>
                {venta.id_producto_predeterminado
                  ? "Predeterminada"
                  : "Personalizada"}
              </td>
              <td>
                {venta.id_producto_predeterminado ||
                  venta.id_producto_personalizado}
              </td>
              <td>
                {venta.cantidad_predeterminada || venta.cantidad_personalizada}
              </td>
              <td>
                {venta.estado_pedido &&
                  venta.estado_pedido.toLowerCase() === "pendiente" && (
                    <button
                      onClick={() =>
                        handleStatusChange(venta.id_venta, "Entregado")
                      }
                    >
                      Marcar como Entregado
                    </button>
                  )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Sales;
