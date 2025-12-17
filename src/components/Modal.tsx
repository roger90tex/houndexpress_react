import React, { useEffect, useRef } from "react";

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
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    lastFocusedElementRef.current = document.activeElement as HTMLElement | null;
    closeBtnRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();

      // Focus trap básico
      if (e.key === "Tab" && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        if (focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      lastFocusedElementRef.current?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="modal" style={{ display: "flex" }} onClick={handleOverlayClick}>
      <div
        className="modal__content"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <h2 className="modal__title" id="modal-title">
          Historial de Cambios
        </h2>

        <div className="modal__body">
          {history.length > 0 ? (
            <ul>
              {history.map((entry, index) => (
                <li key={index}>
                  <p>
                    <strong>Estado:</strong> {entry.estado}
                    <br />
                    <strong>Fecha:</strong> {entry.fecha}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay historial disponible.</p>
          )}
        </div>

        <button ref={closeBtnRef} className="modal__button" onClick={onClose} type="button">
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default Modal;