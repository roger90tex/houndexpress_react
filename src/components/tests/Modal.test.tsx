import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from '../Modal';

describe('Modal', () => {
  const mockOnClose = jest.fn();

  const mockHistory = [
    { estado: 'En tránsito', fecha: '2025-06-10' },
    { estado: 'Entregado', fecha: '2025-06-11' },
  ];

  it('no renderiza nada si isOpen es false', () => {
    const { container } = render(<Modal isOpen={false} history={mockHistory} onClose={mockOnClose} />);
    expect(container.firstChild).toBeNull();
  });

  it('muestra el historial cuando isOpen es true', () => {
    render(<Modal isOpen={true} history={mockHistory} onClose={mockOnClose} />);
    expect(screen.getByText('Historial de Cambios')).toBeInTheDocument();
    expect(screen.getByText(/En tránsito/)).toBeInTheDocument();
    expect(screen.getByText(/2025-06-10/)).toBeInTheDocument();
    expect(screen.getByText(/Entregado/)).toBeInTheDocument();
    expect(screen.getByText(/2025-06-11/)).toBeInTheDocument();
  });

  it('muestra mensaje si el historial está vacío', () => {
    render(<Modal isOpen={true} history={[]} onClose={mockOnClose} />);
    expect(screen.getByText('No hay historial disponible.')).toBeInTheDocument();
  });

  it('llama a onClose al hacer clic en "Cerrar"', () => {
    render(<Modal isOpen={true} history={mockHistory} onClose={mockOnClose} />);
    const closeButton = screen.getByRole('button', { name: /cerrar/i });
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
