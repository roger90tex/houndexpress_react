import React from "react";
import { Guide } from "../types";

interface GuideListProps {
  guides: Guide[];
  onUpdateStatus: (numeroGuia: string) => void;
  onViewHistory: (numeroGuia: string) => void;
  obtenerEtiquetaEstado: (estado: string) => string;
}

const GuideList: React.FC<GuideListProps> = ({
  guides,
  onUpdateStatus,
  onViewHistory,
  obtenerEtiquetaEstado,
}) => {
  return (
    <>
      <h2 className="section__title">Lista de Guías</h2>

      {guides.length === 0 ? (
        <p>No hay guías registradas todavía.</p>
      ) : (
        <table className="table">
          <caption className="sr-only">
            Tabla con guías registradas: origen, destino, destinatario, fecha, estado y acciones.
          </caption>

          <thead className="table__head">
            <tr>
              <th className="table__header" scope="col">Número de Guía</th>
              <th className="table__header" scope="col">Origen</th>
              <th className="table__header" scope="col">Destino</th>
              <th className="table__header" scope="col">Destinatario</th>
              <th className="table__header" scope="col">Teléfono</th>
              <th className="table__header" scope="col">Fecha de Creación</th>
              <th className="table__header" scope="col">Estado</th>
              <th className="table__header" scope="col">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {guides.map((guide) => (
              <tr key={guide.numeroGuia}>
                <td className="table__cell">{guide.numeroGuia}</td>
                <td className="table__cell">{guide.origen}</td>
                <td className="table__cell">{guide.destino}</td>
                <td className="table__cell">{guide.destinatario}</td>
                <td className="table__cell">{guide.telefono}</td>
                <td className="table__cell">{guide.fechaCreacion}</td>

                <td className="table__cell" data-state={guide.estado}>
                  {obtenerEtiquetaEstado(guide.estado)}
                </td>

                <td className="table__cell">
                  <button
                    type="button"
                    className="table__button table__button--primary"
                    onClick={() => onUpdateStatus(guide.numeroGuia)}
                    aria-label={`Actualizar estado de la guía ${guide.numeroGuia}`}
                  >
                    Actualizar Estado
                  </button>

                  <button
                    type="button"
                    className="table__button table__button--secondary"
                    onClick={() => onViewHistory(guide.numeroGuia)}
                    aria-label={`Ver historial de la guía ${guide.numeroGuia}`}
                  >
                    Ver Historial
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default GuideList;