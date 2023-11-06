import React, { useState, useEffect } from "react";
import Modal from "./Modal"; // Asegúrate de importar el componente Modal

const Modals = ({ isRegistered }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Abre el modal cuando isRegistered sea true
    if (isRegistered) {
      setIsModalOpen(true);
    } else {
      // Cierra el modal cuando isRegistered sea false
      setIsModalOpen(false);
    }
  }, [isRegistered]);
  
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {isModalOpen && (
        <Modal>
          <h2>Registro Exitoso</h2>
          <p>Tu registro ha sido exitoso.</p>
          <button onClick={closeModal}>Cerrar</button>
        </Modal>
      )}
    </div>
  );
};

export default Modals;
