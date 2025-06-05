import React, {FormEvent, useState} from "react";
import { Guide } from "../types/index";

interface GuideFormProps {
    onAddGuide: (guide: Guide) => void;
  }
  
  const GuideForm: React.FC<GuideFormProps> = ({ onAddGuide }) => {
    const [error, setError] = useState<string | null>(null);
  
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.currentTarget;
      const formData = new FormData(form);
  
      const guide: Guide = {
        numeroGuia: formData.get('numero-guia') as string,
        origen: formData.get('origen') as string,
        destino: formData.get('destino') as string,
        destinatario: formData.get('destinatario') as string,
        telefono: formData.get('telefono') as string,
        fechaCreacion: formData.get('fecha-creacion') as string,
        estado: formData.get('estado') as Guide['estado'],
      };
  
      // Validar que no haya campos vacíos
      if (Object.values(guide).some((value) => !value)) {
        setError('Por favor, completa todos los campos.');
        setTimeout(() => setError(null), 3000);
        return;
      }
  
      onAddGuide(guide);
      form.reset();
    };

    return (
        <section className="section" id="registro">
            <h2 className="section__title">Registro de Guías</h2>
            <form className="form" onSubmit={handleSubmit}>
                <label htmlFor="numero-guia" className="form__label">Número de Guía</label>
                <input 
                type="text"
                id="numero-guia"
                name="numero-guia"
                required
                placeholder="Ingrese el número de guía"
                className="form__input"
                 />
                <label htmlFor="origen" className="form__label">Origen:</label>
                    <input 
                    type="text"
                    id="origen"
                    name="origen"
                    required
                    placeholder="Ingrese el orígen del paquete"
                    className="form__input"
                 />
                 <label htmlFor="destino" className="form__label">Destino:</label>
                    <input 
                    type="text"
                    id="destino"
                    name="destino"
                    required
                    placeholder="Ingrese el destino del paquete"
                    className="form__input"
                />
                <label htmlFor="destinatario" className="form__label">Destinatario:</label>
                    <input 
                    type="text"
                    id="destinatario"
                    name="destinatario"
                    required
                    placeholder="Ingrese el nombre del destinatario"
                    className="form__input"
                />
                <label htmlFor="telefono" className="form__label">Teléfono:</label>
                    <input 
                    type="tel"
                    id="telefono"
                    name="telefono"
                    required
                    placeholder="Ingrese el número de teléfono del destinatario"
                    className="form__input"
                />
                <label htmlFor="fecha-creacion" className="form__label">Fecha de creación:</label>
                    <input 
                    type="date"
                    id="fecha-creacion"
                    name="fecha-creacion"
                    required
                    className="form__input"
                />
                <label htmlFor="estado" className="form__label">Estado:</label>
                    <select name="estado" id="estado" required className="form__select">
                        <option value="en_transito">En tránsito</option>
                        <option value="entregado">Entregado</option>
                        <option value="pendiente">Pendiente</option>
                        <option value="cancelado">Cancelado</option>
                    </select>
                    {error && <p className="form__error" role="alert">{error}</p>}
                    <button type="submit" className="form__button">Registrar Guía</button>
            </form>
        </section>
    );
};

export default GuideForm;
// Este componente es un formulario para registrar guías. Contiene campos para ingresar el número de guía, origen, destino, destinatario, teléfono, fecha de creación y estado. Al enviar el formulario, se llama a la función onAddGuide con los datos del formulario. El diseño y estilo del formulario se manejan a través de clases CSS.
// El formulario incluye validaciones para asegurarse de que todos los campos requeridos estén completos antes de enviarlo. Los tipos de datos se definen utilizando TypeScript, lo que ayuda a garantizar la seguridad de los tipos y la detección temprana de errores en el código.   
