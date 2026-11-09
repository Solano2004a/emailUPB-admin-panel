import { useMemo, useState } from "react";
import { Icon, Modal } from "./ui.jsx";

const esc = (v) => `"${String(v).replace(/"/g, '""')}"`;

export default function Report({ requests, programs, onClose }) {
  const [by, setBy] = useState("student");
  const [code, setCode] = useState("");
  const [program, setProgram] = useState(programs[0]?.name ?? "");

  const rows = useMemo(
    () =>
      by === "student"
        ? requests.filter((r) => r.code === code.trim())
        : requests.filter((r) => r.program === program),
    [requests, by, code, program],
  );

  const canGenerate =
    by === "student" ? code.trim().length > 0 : Boolean(program);

  const generate = () => {
    const head = [
      "Estudiante",
      "Código",
      "Programa",
      "Módulo",
      "Tipo",
      "Descripción",
      "Fecha",
      "Estado",
    ];
    const body = rows.map((r) => [
      r.student,
      r.code,
      r.program,
      r.module,
      r.type,
      r.desc,
      r.date,
      r.status === "pending" ? "Pendiente" : "Respondida",
    ]);
    const csv =
      "\uFEFF" + [head, ...body].map((l) => l.map(esc).join(",")).join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(
      new Blob([csv], { type: "text/csv;charset=utf-8" }),
    );
    a.download = `reporte-solicitudes-${by === "student" ? code.trim() : "programa"}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
    onClose();
  };

  return (
    <Modal
      eyebrow="EXPORTACIÓN"
      title="Reporte de solicitudes"
      subtitle="Genera un archivo con las solicitudes registradas."
      onClose={onClose}
      footer={
        <>
          <button className="btn" onClick={onClose}>
            Cancelar
          </button>
          <button
            className="btn dark"
            disabled={!canGenerate}
            onClick={generate}
          >
            <Icon n="download" size={18} />
            Generar reporte
          </button>
        </>
      }
    >
      <label className="lbl">Generar reporte por</label>
      <select
        className="input"
        value={by}
        onChange={(e) => setBy(e.target.value)}
      >
        <option value="student">Estudiante</option>
        <option value="program">Programa</option>
      </select>

      {by === "student" ? (
        <>
          <label className="lbl mt">Código del estudiante</label>
          <input
            className="input"
            placeholder="Ej. 55555"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <p className="hint">
            Introduce el código del estudiante que quieres consultar.
          </p>
        </>
      ) : (
        <>
          <label className="lbl mt">Nombre del programa</label>
          <select
            className="input"
            value={program}
            onChange={(e) => setProgram(e.target.value)}
          >
            {programs.map((p) => (
              <option key={p.id}>{p.name}</option>
            ))}
          </select>
        </>
      )}
      <div className="note">
        <Icon n="file" size={22} />
        El reporte se descargará automáticamente en tu dispositivo al generarlo.
      </div>
    </Modal>
  );
}
