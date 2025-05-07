import React from "react";

interface StatusPanelProps {
    activeCount: number;
    deliveredCount: number;
    pendingCount: number;
}

const StatusPanel: React.FC<StatusPanelProps> = ({ activeCount, deliveredCount, pendingCount }) => {
    return (
        <section className="section" id="estado-general">
            <h2 className="section__title">Estado General</h2>
            <div className="status-grid">
                <div className="status-grid__card">
                    <h3 className="status-grid__card-title">Guías Activas</h3>
                    <p className="status-grid__card-value">{activeCount}</p>
                </div>
                <div className="status-grid__card">
                    <h3 className="status-grid__card-title">Guías Entregadas</h3>
                    <p className="status-grid__card-value">{deliveredCount}</p>
                </div>
                <div className="status-grid__card">
                    <h3 className="status-grid__card-title">Guías Pendientes</h3>
                    <p className="status-grid__card-value">{pendingCount}</p>   
                </div>
            </div>
        </section>
    );
};

export default StatusPanel;

// posible error  en la const StatusPanel
//export default StatusPanelProps;  // no se si es correcto el nombre de la exportacion, ya que el nombre de la funcion es StatusPanelProps y no StatusPanel
// // Este componente es un panel de estado que muestra el número de guías activas, entregadas y pendientes. Recibe estos valores como props y los muestra en tarjetas dentro de una cuadrícula. El diseño y estilo del panel se manejan a través de clases CSS.    