import { useState } from "react";
import { Icon, Modal } from "./ui.jsx";
import { STUDENTS } from "../data.js";

function StudentLookup({ added, onAdd }) {
  const [code, setCode] = useState("");
  const [found, setFound] = useState(null);
  const [err, setErr] = useState("");

  const verify = () => {
    const s = STUDENTS.find((x) => x.code === code.trim());
    setFound(s ?? null);
    setErr(s ? "" : "Código no encontrado.");
  };
  const add = () => {
    if (!added.some((a) => a.code === found.code)) onAdd(found);
    setFound(null);
    setCode("");
  };

  return (
    <>
      <div className="lookup">
        <div>
          <label className="lbl">Código del estudiante</label>
          <input
            className="input sm"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>
        <button className="btn" onClick={verify} disabled={!code.trim()}>
          Verificar código
        </button>
        {found ? (
          <>
            <div>
              <b>{found.name}</b>
              <div className="muted small">código: {found.code}</div>
            </div>
            <button className="btn" onClick={add}>
              + añadir estudiante
            </button>
          </>
        ) : (
          err && <p className="hint err span2">{err}</p>
        )}
      </div>
      {added.length > 0 && (
        <ul className="added">
          {added.map((s) => (
            <li key={s.code}>
              <b>{s.name}</b>
              <span className="muted small">código: {s.code}</span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

function AddStudentModal({ existing = [], onClose, onSave }) {
  const [list, setList] = useState([]);
  return (
    <Modal
      title="Agregar estudiante al curso"
      onClose={onClose}
      width={620}
      footer={
        <>
          <span />
          <button
            className="btn dark"
            onClick={() =>
              onSave(
                list.filter((s) => !existing.some((e) => e.code === s.code)),
              )
            }
          >
            Guardar
          </button>
        </>
      }
    >
      <StudentLookup added={list} onAdd={(s) => setList((l) => [...l, s])} />
    </Modal>
  );
}

export default function StudentsModal({ program, module, onClose, onChange }) {
  const [adding, setAdding] = useState(false);

  if (adding) {
    return (
      <AddStudentModal
        existing={module.students}
        onClose={() => setAdding(false)}
        onSave={(list) => {
          onChange([...module.students, ...list]);
          setAdding(false);
        }}
      />
    );
  }
  return (
    <Modal
      title="Estudiantes inscritos"
      subtitle={`${module.name} - ${program.name}`}
      width={670}
      flush
      onClose={onClose}
      action={
        <button className="btn" onClick={() => setAdding(true)}>
          <Icon n="plus" size={16} />
          Agregar estudiante
        </button>
      }
      footer={
        <>
          <span />
          <button className="btn" onClick={onClose}>
            Cerrar
          </button>
        </>
      }
    >
      {module.students.map((s) => (
        <div key={s.code} className="srow">
          <b>{s.name}</b>
          <span className="muted small grow">Codigo: {s.code}</span>
          <button
            className="icon-btn"
            aria-label="Quitar estudiante"
            onClick={() =>
              onChange(module.students.filter((x) => x.code !== s.code))
            }
          >
            <Icon n="trash" size={18} />
          </button>
        </div>
      ))}
      {!module.students.length && (
        <div className="empty">Este módulo no tiene estudiantes inscritos.</div>
      )}
    </Modal>
  );
}
