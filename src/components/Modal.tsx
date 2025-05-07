import React from 'react';

interface HistoryEntry {
  estado: string;
  fecha: string;
}

interface ModalProps {
  isOpen: boolean;
  history: HistoryEntry[];
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, history, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal" style={{ display: 'flex' }}>
      <div className="modal__content">
        <h2 className="modal__title">Historial de Cambios</h2>
        <div className="modal__body">
          {history.length > 0 ? (
            history.map((entry, index) => (
              <p key={index}>
                <strong>Estado:</strong> {entry.estado}<br />
                <strong>Fecha:</strong> {entry.fecha}
              </p>
            ))
          ) : (
            <p>No hay historial disponible.</p>
          )}
        </div>
        <button className="modal__button" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default Modal;
