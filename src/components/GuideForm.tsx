import React, { FormEvent, useId, useState } from "react";
import { Guide } from "../types/index";

interface GuideFormProps {
  onAddGuide: (guide: Guide) => void;
}

const GuideForm: React.FC<GuideFormProps> = ({ onAddGuide }) => {
  const [error, setError] = useState<string | null>(null);

  // IDs únicos para accesibilidad (por si renderizas más de un formulario alguna vez)
  const titleId = useId();
  const errorId = useId();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const guide: Guide = {
      numeroGuia: (formData.get("numero-guia") as string)?.trim(),
      origen: (formData.get("origen") as string)?.trim(),
      destino: (formData.get("destino") as string)?.trim(),
      destinatario: (formData.get("destinatario") as string)?.trim(),
      telefono: (formData.get("telefono") as string)?.trim(),
      fechaCreacion: (formData.get("fecha-creacion") as string)?.trim(),
      estado: formData.get("estado") as Guide["estado"],
    };

    if (Object.values(guide).some((value) => !value)) {
      setError("Por favor, completa todos los campos.");
      setTimeout(() => setError(null), 3000);
      return;
    }

    onAddGuide(guide);
    form.reset();
  };

  return (
    <section className="section" aria-labelledby={titleId}>
      <h2 className="section__title" id={titleId}>
        Registro de Guías
      </h2>

      <form className="form" onSubmit={handleSubmit} noValidate aria-describedby={error ? errorId : undefined}>
        <label htmlFor="numero-guia" className="form__label">
          Número de Guía
        </label>
        <input
          type="text"
          id="numero-guia"
          name="numero-guia"
          required
          minLength={3}
          placeholder="Ej. HE-2025-0001"
          className="form__input"
          autoComplete="off"
        />

        <label htmlFor="origen" className="form__label">
          Origen
        </label>
        <input
          type="text"
          id="origen"
          name="origen"
          required
          placeholder="Ej. CDMX"
          className="form__input"
          autoComplete="address-level2"
        />

        <label htmlFor="destino" className="form__label">
          Destino
        </label>
        <input
          type="text"
          id="destino"
          name="destino"
          required
          placeholder="Ej. Monterrey"
          className="form__input"
          autoComplete="address-level2"
        />

        <label htmlFor="destinatario" className="form__label">
          Destinatario
        </label>
        <input
          type="text"
          id="destinatario"
          name="destinatario"
          required
          placeholder="Nombre del destinatario"
          className="form__input"
          autoComplete="name"
        />

        <label htmlFor="telefono" className="form__label">
          Teléfono
        </label>
        <input
          type="tel"
          id="telefono"
          name="telefono"
          required
          placeholder="Ej. 5512345678"
          className="form__input"
          autoComplete="tel"
          inputMode="tel"
          pattern="[0-9+\s()-]{7,}"
        />

        <label htmlFor="fecha-creacion" className="form__label">
          Fecha de creación
        </label>
        <input
          type="date"
          id="fecha-creacion"
          name="fecha-creacion"
          required
          className="form__input"
        />

        <label htmlFor="estado" className="form__label">
          Estado
        </label>
        <select name="estado" id="estado" required className="form__select" defaultValue="pendiente">
          <option value="pendiente">Pendiente</option>
          <option value="en_transito">En tránsito</option>
          <option value="entregado">Entregado</option>
          <option value="cancelado">Cancelado</option>
        </select>

        {error && (
          <p className="form__error" role="alert" aria-live="polite" id={errorId}>
            {error}
          </p>
        )}

        <button type="submit" className="form__button">
          Registrar Guía
        </button>
      </form>
    </section>
  );
};

export default GuideForm;
