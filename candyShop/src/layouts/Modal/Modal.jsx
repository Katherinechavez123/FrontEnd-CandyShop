import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  const handleModalContainerClick = (e) => e.stopPropagation();

  return (
    <article className={`modal ${isOpen && "is-open"}`} onClick={onClose}>
      <div className="modal-container" onClick={handleModalContainerClick}>
        <button className="modal-close" onClick={onClose}>
          X
        </button>
        {children}
      </div>
    </article>
  );
};

export default Modal;
