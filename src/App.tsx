import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import GuideForm from './components/GuideForm';
import StatusPanel from './components/StatusPanel';
import GuideList from './components/GuideList';
import Modal from './components/Modal';
import Footer from './components/Footer';
import { Guide, HistoryEntry } from './types';

const App: React.FC = () => {
  const mapEstadoBackend = (status: string): Guide["estado"] => {
  const mapa: any = {
    pendiente: "pendiente",
    en_transito: "en_transito",
    entregado: "entregado",
    cancelado: "cancelado",
  };

  return mapa[status] || "pendiente";
};

const mapEstadoFrontendToBackend = (status: string): string => {
  const mapa: any = {
    "Pendiente": "pendiente",
    "En tránsito": "en_transito",
    "Entregado": "entregado",
    "Cancelado": "cancelado",
  };

  return mapa[status] || status.toLowerCase();
};
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

 const handleAddGuide = async (guide: Guide) => {
  if (guides.some((g) => g.numeroGuia === guide.numeroGuia)) {
    setError("El número de guía ya existe.");
    setTimeout(() => setError(null), 3000);
    return;
  }

  try {
    const response = await fetch("http://127.0.0.1:8000/api/shipments/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tracking_number: guide.numeroGuia,
        customer_name: guide.destinatario,
        origin: guide.origen,
        destination: guide.destino,
        status: mapEstadoFrontendToBackend(guide.estado),
        description: "Envío registrado desde React",
      }),
    });

    if (!response.ok) {
      throw new Error("No se pudo crear el envío en Django");
    }

    const newShipment = await response.json();

    const nuevaGuiaMapeada: Guide = {
      id: newShipment.id,
      numeroGuia: newShipment.tracking_number,
      origen: newShipment.origin,
      destino: newShipment.destination,
      destinatario: newShipment.customer_name,
      telefono: "N/A",
      fechaCreacion: new Date(newShipment.created_at).toLocaleString(),
      estado: mapEstadoBackend(newShipment.status),
    };

    setGuides([...guides, nuevaGuiaMapeada]);

    setHistorialGuias({
      ...historialGuias,
      [nuevaGuiaMapeada.numeroGuia]: [
        {
          estado: nuevaGuiaMapeada.estado,
          fecha: new Date().toLocaleString(),
        },
      ],
    });
  } catch (error) {
    console.error("Error al crear guía:", error);
    setError("Hubo un problema al guardar la guía en el backend.");
    setTimeout(() => setError(null), 3000);
  }
};

  const handleUpdateStatus = async (numeroGuia: string) => {
  const guide = guides.find((g) => g.numeroGuia === numeroGuia);

  if (!guide?.id) {
  setError("La guía no tiene id del backend.");
  setTimeout(() => setError(null), 3000);
  return;
  }

  const estadoActual = guide.estado;
  const estadosSiguientes = flujoEstados[estadoActual] || [];

  if (estadosSiguientes.length === 0) {
    setError("No se puede actualizar el estado de esta guía.");
    setTimeout(() => setError(null), 3000);
    return;
  }

  const nuevoEstado = estadosSiguientes[0];

  try {
    const response = await fetch(`http://127.0.0.1:8000/api/shipments/${guide.id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: nuevoEstado,
      }),
    });

    if (!response.ok) {
      throw new Error("No se pudo actualizar el estado en Django");
    }

    const updatedShipment = await response.json();

    const updatedGuides = guides.map((g) =>
      g.numeroGuia === numeroGuia
        ? {
            ...g,
            estado: mapEstadoBackend(updatedShipment.status),
          }
        : g
    );

    setGuides(updatedGuides);

    setHistorialGuias({
      ...historialGuias,
      [numeroGuia]: [
        ...(historialGuias[numeroGuia] || []),
        {
          estado: mapEstadoBackend(updatedShipment.status),
          fecha: new Date().toLocaleString(),
        },
      ],
    });
  } catch (error) {
    console.error("Error al actualizar estado:", error);
    setError("Hubo un problema al actualizar el estado en el backend.");
    setTimeout(() => setError(null), 3000);
  }
};
const handleDeleteGuide = async (numeroGuia: string) => {
  const guide = guides.find((g) => g.numeroGuia === numeroGuia);

  if (!guide?.id) {
    setError("La guía no tiene id del backend.");
    setTimeout(() => setError(null), 3000);
    return;
  }

  const confirmDelete = window.confirm("¿Seguro que quieres eliminar esta guía?");
  if (!confirmDelete) return;

  try {
    const response = await fetch(`http://127.0.0.1:8000/api/shipments/${guide.id}/`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("No se pudo eliminar la guía en Django");
    }

    const updatedGuides = guides.filter((g) => g.numeroGuia !== numeroGuia);
    setGuides(updatedGuides);

    const nuevoHistorial = { ...historialGuias };
    delete nuevoHistorial[numeroGuia];
    setHistorialGuias(nuevoHistorial);
  } catch (error) {
    console.error("Error al eliminar guía:", error);
    setError("Hubo un problema al eliminar la guía en el backend.");
    setTimeout(() => setError(null), 3000);
  }
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
  fetch("http://127.0.0.1:8000/api/shipments/")
    .then((res) => {
      console.log("STATUS:", res.status);
      return res.json();
    })
    .then((data) => {
      console.log("DATA DEL BACKEND:", data);

      const mappedData = data.map((item: any) => ({
        id: item.id,
        numeroGuia: item.tracking_number,
        origen: item.origin,
        destino: item.destination,
        destinatario: item.customer_name,
        telefono: "N/A",
        fechaCreacion: new Date(item.created_at).toLocaleString(),
        estado: mapEstadoBackend(item.status),
      }));

      setGuides(mappedData);
    })
    .catch((error) => {
      console.error("Error al obtener datos:", error);
    });
}, []);

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
            onDeleteGuide={handleDeleteGuide}
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
