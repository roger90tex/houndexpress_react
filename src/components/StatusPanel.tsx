import React from "react";

interface StatusPanelProps {
  activeCount: number;
  deliveredCount: number;
  pendingCount: number;
}

const StatusPanel: React.FC<StatusPanelProps> = ({
  activeCount,
  deliveredCount,
  pendingCount,
}) => {
  return (
    <>
      <h2 className="section__title">Estado General</h2>

      {/* aria-live para anunciar cambios de contadores */}
      <div className="status-grid" role="status" aria-live="polite">
        <dl className="status-grid__card">
          <dt className="status-grid__card-title">Guías Activas</dt>
          <dd className="status-grid__card-value">{activeCount}</dd>
        </dl>

        <dl className="status-grid__card">
          <dt className="status-grid__card-title">Guías Entregadas</dt>
          <dd className="status-grid__card-value">{deliveredCount}</dd>
        </dl>

        <dl className="status-grid__card">
          <dt className="status-grid__card-title">Guías Pendientes</dt>
          <dd className="status-grid__card-value">{pendingCount}</dd>
        </dl>
      </div>
    </>
  );
};

export default StatusPanel;