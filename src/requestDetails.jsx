import React from "react";
import { ArrowLeft, Reply, FileText } from "lucide-react";
import "./styles.css";

import { useState } from "react";
import "./styles.css";

function ReplyRequest({
  setOpen,
  open,
  readOnly,
  setReadOnly,
  onEnviar = () => {},
}) {
  const [stateRequest, setStateRequest] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleCancelar = () => {
    setStateRequest("");
    setDescription("");
    setError("");
    setOpen(false);
  };

  const handleEnviar = async (e) => {
    e.preventDefault();

    if (!stateRequest) {
      setError("Selecciona el estado de la solicitud.");
      return;
    }

    setError("");

    try {
      await onEnviar({
        stateRequest,
        description,
      });

      // Cerrar el formulario después de enviar correctamente.
      setOpen(false);
      setReadOnly(true);
    } catch (err) {
      setError(err?.message || "No se pudo enviar la respuesta.");
    }
  };

  return (
    <div className="respuesta-solicitud">
      {/* {!soloLectura && !open && (
        <button
          type="button"
          className="btn-responder"
          onClick={() => setOpen(true)}
        >
          <span className="icono-responder">↶</span>
          Responder
        </button>
      )} */}

      {(open || readOnly) && (
        <form
          className={`respuesta-formulario ${readOnly ? "modo-lectura" : ""}`}
          onSubmit={handleEnviar}
        >
          <div className="campo-respuesta">
            <label htmlFor="estado-solicitud">Estado de solicitud</label>

            <select
              id="estado-solicitud"
              value={stateRequest}
              onChange={(e) => setStateRequest(e.target.value)}
              disabled={readOnly}
              required={!readOnly}
            >
              <option value="">Seleccione estado</option>
              <option value="Pendiente">Pendiente</option>
              <option value="Aprobada">Aprobada</option>
              <option value="Rechazada">Rechazada</option>
            </select>
          </div>

          <div className="campo-respuesta campo-descripcion">
            <label htmlFor="descripcion-respuesta">Descripción</label>

            <textarea
              id="descripcion-respuesta"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={
                readOnly
                  ? ""
                  : "Descripción opcional sobre algún detalle que el administrador quiera transmitir al estudiante"
              }
              readOnly={readOnly}
              rows={4}
            />
          </div>

          {error && (
            <p className="mensaje-error" role="alert">
              {error}
            </p>
          )}

          {!readOnly && (
            <div className="acciones-respuesta">
              <button
                type="button"
                className="btn-cancelar"
                onClick={handleCancelar}
              >
                Cancelar
              </button>

              <button type="submit" className="btn-enviar">
                Enviar
              </button>
            </div>
          )}
        </form>
      )}
    </div>
  );
}

function RequestDetails({ onBack }) {
  const [open, setOpen] = useState(false);
  const [readOnly, setReadOnly] = useState(false);

  const solicitud = {
    programa: "Nombre de programa - Nombre del modulo",
    correo: "correosestudiante@upb.edu",
    codigoEstudiantil: "55555",
    description: "",
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
          onClick={onBack}
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
            value={solicitud.description}
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
            onClick={() => setOpen(true)}
          >
            <Reply size={27} strokeWidth={2.5} />
            <span>Responder</span>
          </button>
        </div>

        {(open || readOnly) && (
          <ReplyRequest
            setOpen={setOpen}
            open={open}
            readOnly={readOnly}
            setReadOnly={setReadOnly}
          />
        )}
      </section>
    </main>
  );
}

export default RequestDetails;
