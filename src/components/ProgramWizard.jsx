import { useState } from "react";
import { Icon, Modal } from "./ui.jsx";
import { StudentLookup } from "./StudentsModal.jsx";

const TITLES = [
  "Crear un programa académico",
  "Crear un curso",
  "Agregar estudiante al curso",
];

export default function ProgramWizard({ programs, onClose, onSave }) {
  const [step, setStep] = useState(0);
  const [f, setF] = useState({
    program: "",
    existing: "",
    course: "",
    start: "",
    end: "",
    students: [],
  });
  const set = (k, clear) => (e) =>
    setF((v) => ({
      ...v,
      [k]: e.target.value,
      ...(clear ? { [clear]: "" } : {}),
    }));

  const valid = [
    Boolean(f.program.trim() || f.existing),
    Boolean(f.course.trim() && f.start && f.end && f.end >= f.start),
    true,
  ][step];

  return (
    <Modal
      title={TITLES[step]}
      onClose={onClose}
      width={760}
      footer={
        <>
          <button
            className="btn"
            disabled={step === 0}
            onClick={() => setStep(step - 1)}
          >
            Anterior
          </button>
          {step < 2 ? (
            <button
              className="btn dark"
              disabled={!valid}
              onClick={() => setStep(step + 1)}
            >
              Siguiente
            </button>
          ) : (
            <button className="btn dark" onClick={() => onSave(f)}>
              Guardar
            </button>
          )}
        </>
      }
    >
      <div className="wiz">
        <div className="steps">
          <button className={step === 0 ? "on" : ""} onClick={() => setStep(0)}>
            1. Programa
          </button>
          <button
            className={step === 1 ? "on" : ""}
            disabled={step < 1}
            onClick={() => setStep(1)}
          >
            2. Curso
          </button>
          <button
            className={step === 2 ? "on" : ""}
            disabled={step < 2}
            onClick={() => setStep(2)}
          >
            3. Inscribir estudiante <i>(opcional)</i>
          </button>
        </div>
        <div>
          {step === 0 && (
            <>
              <label className="lbl">Nombre del Programa</label>
              <input
                className="input sm"
                placeholder="ej. Diplomado en seguridad informática"
                value={f.program}
                onChange={set("program", "existing")}
              />
              <label className="lbl mt">o seleccione uno existente</label>
              <select
                className="input sm"
                value={f.existing}
                onChange={set("existing", "program")}
              >
                <option value="">seleccionar un programa</option>
                {programs.map((p) => (
                  <option key={p.id}>{p.name}</option>
                ))}
              </select>
            </>
          )}
          {step === 1 && (
            <>
              <label className="lbl">Nombre del Curso</label>
              <input
                className="input sm"
                placeholder="ej. Criptografía"
                value={f.course}
                onChange={set("course")}
              />
              <label className="lbl mt">Duración del curso</label>
              <div className="dates">
                <div>
                  <span className="muted small">Fecha de inicio</span>
                  <div className="date-wrap">
                    <input
                      type="date"
                      className="input sm"
                      value={f.start}
                      onChange={set("start")}
                    />
                    <Icon n="calendar" size={16} />
                  </div>
                </div>
                <div>
                  <span className="muted small">Fecha de finalizacion</span>
                  <div className="date-wrap">
                    <input
                      type="date"
                      className="input sm"
                      min={f.start}
                      value={f.end}
                      onChange={set("end")}
                    />
                    <Icon n="calendar" size={16} />
                  </div>
                </div>
              </div>
            </>
          )}
          {step === 2 && (
            <StudentLookup
              added={f.students}
              onAdd={(s) =>
                setF((v) => ({ ...v, students: [...v.students, s] }))
              }
            />
          )}
        </div>
      </div>
    </Modal>
  );
}
