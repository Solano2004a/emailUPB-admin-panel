import React from "react";
import { ArrowLeft, Reply, FileText } from "lucide-react";
import "./SolicitudLicencia.css";

function RequestDetails() {
  const solicitud = {
    programa: "Nombre de programa - Nombre del modulo",
    correo: "correosestudiante@upb.edu",
    codigoEstudiantil: "55555",
    descripcion: "",
    fechaInicio: "09/09/25",
    fechaFin: "13/09/25",
    archivos: [
      { id: 1, nombre: "certificado.pdf" },
      { id: 2, nombre: "respaldo.pdf" },
    ],
  };

  const volver = () => {
    window.history.back();
  };

  const responder = () => {
    console.log("Responder a la solicitud de licencia");
  };

  const abrirArchivo = (archivo) => {
    console.log("Abrir archivo:", archivo.nombre);
  };

  return (
    <main className="licencia-page">
      <header className="licencia-header">
        <button
          className="licencia-back-button"
          onClick={volver}
          aria-label="Volver"
        >
          <ArrowLeft size={22} strokeWidth={1.8} />
        </button>

        <h1>Solicitud de licencia</h1>
      </header>

      <section className="licencia-content">
        <p className="licencia-programa">{solicitud.programa}</p>

        <div className="licencia-student-info">
          <strong>{solicitud.correo}</strong>

          <strong>código estudiantil: {solicitud.codigoEstudiantil}</strong>
        </div>

        <section className="licencia-section">
          <label className="licencia-label" htmlFor="motivo-licencia">
            Motivo de la licencia
          </label>

          <textarea
            id="motivo-licencia"
            className="licencia-description"
            value={solicitud.descripcion}
            placeholder="Descripción"
            readOnly
          />
        </section>

        <section className="licencia-period">
          <p className="licencia-label">Periodo de la licencia</p>

          <p className="licencia-dates">
            <strong>Inicio: {solicitud.fechaInicio}</strong>
            <span>-</span>
            <strong>fin: {solicitud.fechaFin}</strong>
          </p>
        </section>

        <section className="licencia-attachments">
          <p className="licencia-label">Archivos adjuntos</p>

          <div className="licencia-files">
            {solicitud.archivos.map((archivo) => (
              <button
                key={archivo.id}
                type="button"
                className="licencia-file"
                onClick={() => abrirArchivo(archivo)}
                aria-label={`Abrir ${archivo.nombre}`}
                title={archivo.nombre}
              >
                <FileText size={43} strokeWidth={1} aria-hidden="true" />
              </button>
            ))}
          </div>
        </section>

        <div className="licencia-actions">
          <button
            type="button"
            className="licencia-reply-button"
            onClick={responder}
          >
            <Reply size={27} strokeWidth={2.5} />
            <span>Responder</span>
          </button>
        </div>
      </section>
    </main>
  );
}

export default RequestDetails;
