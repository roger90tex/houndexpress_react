import React from 'react';
import { render, screen } from '@testing-library/react';
import StatusPanel from '../StatusPanel';

describe('StatusPanel', () => {
  it('muestra los conteos correctos de guías', () => {
    const props = {
      activeCount: 3,
      deliveredCount: 5,
      pendingCount: 2,
    };

    render(<StatusPanel {...props} />);

    expect(screen.getByText('Estado General')).toBeInTheDocument();
    expect(screen.getByText('Guías Activas')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();

    expect(screen.getByText('Guías Entregadas')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();

    expect(screen.getByText('Guías Pendientes')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });
});
