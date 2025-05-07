export interface Guide {
    numeroGuia: string;
    origen: string;
    destino: string;
    destinatario: string;
    telefono: string;
    fechaCreacion: string;
    estado: 'pendiente' | 'en_transito' | 'entregado' | 'cancelado';
}

export interface HistoryEntry {
    estado: string;
    fecha: string;
}

