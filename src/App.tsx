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

  const flujoEstados: { [key in Guide['estado']]: Guide['estado'][] } = {
    pendiente: ['en_transito', 'cancelado'],
    en_transito: ['entregado', 'cancelado'],
    entregado: [],
    cancelado: [],
  };

  const obtenerEtiquetaEstado = (estado: string) => {
    const etiquetas: { [key: string]: string } = {
      pendiente: 'Pendiente',
      en_transito: 'En Tránsito',
      entregado: 'Entregado',
      cancelado: 'Cancelado',
    };
    return etiquetas[estado] || estado;
  };

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

  const handleViewHistory = (numeroGuia: string) => {
    setSelectedGuide(numeroGuia);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedGuide(null);
  };

  const activeCount = guides.filter((g) => g.estado === 'pendiente' || g.estado === 'en_transito').length;
  const deliveredCount = guides.filter((g) => g.estado === 'entregado').length;
  const pendingCount = guides.filter((g) => g.estado === 'pendiente').length;

  useEffect(() => {
    console.log('El estado de guías ha cambiado:', guides);
  }, [guides]);

  return (
    <div>
      <Header />

      {/* MAIN para semántica / SEO */}
      <main id="contenido" tabIndex={-1}>
        {/* H1 oculto visualmente (si tu diseño no quiere título grande) */}
        <h1 className="sr-only">Hound Express - Gestión y rastreo de guías</h1>

        {/* Sección: Registro */}
        <section id="registro" aria-labelledby="titulo-registro">
          <h2 id="titulo-registro" className="sr-only">Registro de guías</h2>
          <GuideForm onAddGuide={handleAddGuide} />
        </section>

        {/* Errores accesibles */}
        {error && (
          <div role="alert" aria-live="polite" style={{ color: 'red', textAlign: 'center', margin: '1rem' }}>
            {error}
          </div>
        )}

        {/* Sección: Estado */}
        <section id="estado" aria-labelledby="titulo-estado">
          <h2 id="titulo-estado" className="sr-only">Estado general</h2>
          <StatusPanel
            activeCount={activeCount}
            deliveredCount={deliveredCount}
            pendingCount={pendingCount}
          />
        </section>

        {/* Sección: Lista / Buscar / Historial (misma vista, pero con anclas útiles) */}
        <section id="lista" aria-labelledby="titulo-lista">
          <h2 id="titulo-lista" className="sr-only">Lista de guías</h2>

          {/* Puedes dejar estos anchors como “targets” para el menú */}
          <div id="buscar" />
          <div id="historial" />

          <GuideList
            guides={guides}
            onUpdateStatus={handleUpdateStatus}
            onViewHistory={handleViewHistory}
            obtenerEtiquetaEstado={obtenerEtiquetaEstado}
          />
        </section>

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
      </main>

      <Footer />
    </div>
  );
};

export default App;
