import { Modal } from "./ui.jsx";

export default function RequestDetails({ request: r, onClose, onReply }) {
  return (
    <Modal
      eyebrow="SOLICITUD"
      title={r.type}
      subtitle={r.student}
      onClose={onClose}
      footer={
        <>
          <button className="btn" onClick={onClose}>
            Cerrar
          </button>
          {r.status === "pending" && (
            <button className="btn dark" onClick={() => onReply(r.id)}>
              Marcar como respondida
            </button>
          )}
        </>
      }
    >
      <dl className="dl">
        <dt>Código</dt>
        <dd>{r.code}</dd>
        <dt>Programa</dt>
        <dd>{r.program}</dd>
        <dt>Módulo</dt>
        <dd>{r.module}</dd>
        <dt>Fecha</dt>
        <dd>{r.date}</dd>
        <dt>Estado</dt>
        <dd>{r.status === "pending" ? "Pendiente" : "Respondida"}</dd>
        <dt>Descripción</dt>
        <dd>{r.desc}</dd>
      </dl>
    </Modal>
  );
}
