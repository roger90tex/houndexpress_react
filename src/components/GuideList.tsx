import React from 'react';
import { Guide } from '../types';

interface GuideListProps {
  guides: Guide[];
  onUpdateStatus: (numeroGuia: string) => void;
  onViewHistory: (numeroGuia: string) => void;
  obtenerEtiquetaEstado: (estado: string) => string;
}

const GuideList: React.FC<GuideListProps> = ({ guides, onUpdateStatus, onViewHistory, obtenerEtiquetaEstado }) => {
  return (
    <section className="section" id="lista-guias">
      <h2 className="section__title">Lista de Guías</h2>
      <table className="table">
        <thead className="table__head">
          <tr>
            <th className="table__header">Número de Guía</th>
            <th className="table__header">Origen</th>
            <th className="table__header">Destino</th>
            <th className="table__header">Destinatario</th>
            <th className="table__header">Teléfono</th>
            <th className="table__header">Fecha de Creación</th>
            <th className="table__header">Estado</th>
            <th className="table__header">Acciones</th>
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
                  className="table__button table__button--primary"
                  onClick={() => onUpdateStatus(guide.numeroGuia)}
                >
                  Actualizar Estado
                </button>
                <button
                  className="table__button table__button--secondary"
                  onClick={() => onViewHistory(guide.numeroGuia)}
                >
                  Ver Historial
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default GuideList;