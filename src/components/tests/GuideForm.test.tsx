import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import GuideForm from '../GuideForm'; // Ajusta si moviste rutas

describe('GuideForm', () => {
  const setup = () => {
    const mockOnAddGuide = jest.fn();
    render(<GuideForm onAddGuide={mockOnAddGuide} />);
    return { mockOnAddGuide };
  };

  it('renders the form correctly', () => {
    setup();
    expect(screen.getByText('Registro de Guías')).toBeInTheDocument();
    expect(screen.getByLabelText('Número de Guía')).toBeInTheDocument();
  });

  it('shows error message when submitting empty form', () => {
  setup();

  const submitButton = screen.getByRole('button', { name: /registrar guía/i });
  fireEvent.click(submitButton);

  expect(screen.getByRole('alert')).toHaveTextContent('Por favor, completa todos los campos.');
});

});

 
