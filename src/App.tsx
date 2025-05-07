import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import GuideForm from './components/GuideForm';
import StatusPanel from './components/StatusPanel';
import GuideList from './components/GuideList';
import Modal from './components/Modal';
import Footer from './components/Footer';
import { Guide, HistoryEntry } from './types';

const App: React.FC = () => {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [historialGuias, setHistorialGuias] = useState<{ [key: string]: HistoryEntry[] }>({});
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedGuide, setSelectedGuide] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Definir transiciones permitidas de estados con tipo explícito
  const flujoEstados: { [key in Guide['estado']]: Guide['estado'][] } = {
    pendiente: ['en_transito', 'cancelado'],
    en_transito: ['entregado', 'cancelado'],
    entregado: [],
    cancelado: [],
  };

  // Función para obtener etiquetas de estado legibles
  const obtenerEtiquetaEstado = (estado: string) => {
    const etiquetas: { [key: string]: string } = {
      pendiente: 'Pendiente',
      en_transito: 'En Tránsito',
      entregado: 'Entregado',
      cancelado: 'Cancelado',
    };
    return etiquetas[estado] || estado;
  };

  // Agregar una nueva guía
  const handleAddGuide = (guide: Guide) => {
    if (guides.some((g) => g.numeroGuia === guide.numeroGuia)) {
      setError('El número de guía ya existe.');
      setTimeout(() => setError(null), 3000);
      return;
    }

    setGuides([...guides, guide]);
    setHistorialGuias({
      ...historialGuias,
      [guide.numeroGuia]: [{ estado: guide.estado, fecha: new Date().toLocaleString() }],
    });
  };

  // Actualizar el estado de una guía
  const handleUpdateStatus = (numeroGuia: string) => {
    const guide = guides.find((g) => g.numeroGuia === numeroGuia);
    if (!guide) return;

    const estadoActual = guide.estado;
    const estadosSiguientes = flujoEstados[estadoActual] || [];

    if (estadosSiguientes.length === 0) {
      setError('No se puede actualizar el estado de esta guía.');
      setTimeout(() => setError(null), 3000);
      return;
    }

    const nuevoEstado = estadosSiguientes[0];
    const updatedGuides = guides.map((g) =>
      g.numeroGuia === numeroGuia ? { ...g, estado: nuevoEstado } : g
    );

    setGuides(updatedGuides);
    setHistorialGuias({
      ...historialGuias,
      [numeroGuia]: [
        ...(historialGuias[numeroGuia] || []),
        { estado: nuevoEstado, fecha: new Date().toLocaleString() },
      ],
    });
  };

  // Mostrar historial de una guía
  const handleViewHistory = (numeroGuia: string) => {
    setSelectedGuide(numeroGuia);
    setModalOpen(true);
  };

  // Cerrar el modal
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedGuide(null);
  };

  // Calcular contadores para el panel de estado
  const activeCount = guides.filter((g) => g.estado === 'pendiente' || g.estado === 'en_transito').length;
  const deliveredCount = guides.filter((g) => g.estado === 'entregado').length;
  const pendingCount = guides.filter((g) => g.estado === 'pendiente').length;

  // Log para depuración
  useEffect(() => {
    console.log('El estado de guías ha cambiado:', guides);
  }, [guides]);

  return (
    <div>
      <Header />
      <GuideForm onAddGuide={handleAddGuide} />
      {error && <div style={{ color: 'red', textAlign: 'center', margin: '1rem' }}>{error}</div>}
      <StatusPanel
        activeCount={activeCount}
        deliveredCount={deliveredCount}
        pendingCount={pendingCount}
      />
      <GuideList
        guides={guides}
        onUpdateStatus={handleUpdateStatus}
        onViewHistory={handleViewHistory}
        obtenerEtiquetaEstado={obtenerEtiquetaEstado}
      />
      <Modal
        isOpen={modalOpen}
        history={
          selectedGuide
            ? (historialGuias[selectedGuide] || []).map((entry) => ({
                ...entry,
                estado: obtenerEtiquetaEstado(entry.estado),
              }))
            : []
        }
        onClose={handleCloseModal}
      />
      <Footer />
    </div>
  );
};

export default App;