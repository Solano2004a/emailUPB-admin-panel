import {
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  CircleHelp,
  GraduationCap,
  CalendarDays,
  Plus,
  Check,
} from "lucide-react";
import { notify, closeModal } from "./utils";

//***************************************** */
//*"Crear/agregar" COMPONENTS **************
function nextWizard({
  students,
  step,
  setStep,
  setPrograms,
  programName,
  existingProgram,
  setCourses,
  courseName,
  existingCourse,
  setModal,
  setSection,
  setToast,
}) {
  if (step === 0) {
    if (!programName.trim() && !existingProgram) {
      notify(
        "Escribe un programa o selecciona uno existente",
        (setToast = { setToast }),
      );
      return;
    }
    if (programName.trim() && existingProgram) {
      notify(
        "Elige crear un programa nuevo o seleccionar uno existente",
        (setToast = { setToast }),
      );
      return;
    }
    setStep(1);
    return;
  }
  if (step === 1) {
    if (!courseName.trim() && !existingCourse) {
      notify(
        "Escribe un curso o selecciona uno existente",
        (setToast = { setToast }),
      );
      return;
    }
    if (courseName.trim() && existingCourse) {
      notify(
        "Elige crear un curso nuevo o seleccionar uno existente",
        (setToast = { setToast }),
      );
      return;
    }
    setStep(2);
    return;
  }
  if (step === 2) {
    if (!students.length) {
      notify(
        "Agrega al menos un estudiante antes de guardar",
        (setToast = { setToast }),
      );
      return;
    }
    const p = programName.trim() || existingProgram;
    const c = courseName.trim() || existingCourse;
    if (programName.trim()) setPrograms((ps) => [...ps, programName.trim()]);
    if (courseName.trim()) setCourses((cs) => [...cs, courseName.trim()]);
    notify(`Programa «${p}» creado correctamente`, (setToast = { setToast }));
    setModal("");
    setSection("students");
    return;
  }
}

function Wizard({
  setPrograms,
  programs,
  step,
  setStep,
  setProgramName,
  programName,
  setExistingProgram,
  existingProgram,
  setCourses,
  setCourseName,
  courseName,
  setExistingCourse,
  existingCourse,
  setCourseStart,
  courseStart,
  setCourseEnd,
  courseEnd,
  courses,
  setStudentCode,
  studentCode,
  setStudentPreview,
  studentPreview,
  setStudents,
  students,
  setModal,
  setSection,
  setToast,
}) {
  return (
    <div
      className="overlay"
      onMouseDown={(e) =>
        e.target === e.currentTarget && closeModal({ setModal })
      }
    >
      <div className="modal wizard-modal">
        <div className="modal-head">
          <div>
            <span className="modal-kicker">CREACIÓN ACADÉMICA</span>
            <h3>
              {
                [
                  "Crear un programa académico",
                  "Crear un curso",
                  "Inscribir estudiante",
                ][step]
              }
            </h3>
          </div>
          <button
            className="close-btn"
            onClick={() => closeModal({ setModal })}
          >
            <X size={19} />
          </button>
        </div>
        <div className="wizard-progress">
          <div className={`progress-step ${step >= 0 ? "current" : ""}`}>
            <span>1</span>
            <small>Programa</small>
          </div>
          <i className={step >= 1 ? "filled" : ""} />
          <div className={`progress-step ${step >= 1 ? "current" : ""}`}>
            <span>2</span>
            <small>Curso</small>
          </div>
          <i className={step >= 2 ? "filled" : ""} />
          <div className={`progress-step ${step >= 2 ? "current" : ""}`}>
            <span>3</span>
            <small>Estudiantes</small>
          </div>
        </div>
        <div className="wizard-body">
          <div className="step-rail">
            {["Programa", "Curso", "Inscribir estudiante"].map((s, i) => (
              <button
                key={s}
                onClick={() => {
                  if (i <= step) setStep(i);
                }}
                className={step === i ? "selected" : ""}
              >
                <span className="rail-num">
                  {i < step ? <Check size={13} /> : `0${i + 1}`}
                </span>
                {s}
              </button>
            ))}
          </div>
          <div className="step-content">
            {step === 0 && (
              <>
                <label className="field-label">Nombre del programa</label>
                <input
                  className="field"
                  placeholder="Ej. Diplomado en seguridad informática"
                  value={programName}
                  onChange={(e) => {
                    setProgramName(e.target.value);
                    if (e.target.value) setExistingProgram("");
                  }}
                />
                <div className="or-divider">
                  <span>o selecciona uno existente</span>
                </div>
                <div className="select-wrap full">
                  <select
                    value={existingProgram}
                    onChange={(e) => {
                      setExistingProgram(e.target.value);
                      if (e.target.value) setProgramName("");
                    }}
                  >
                    <option value="">Seleccionar un programa</option>
                    {programs.map((p) => (
                      <option key={p}>{p}</option>
                    ))}
                  </select>
                  <ChevronDown size={15} />
                </div>
                {existingProgram && (
                  <div className="info-note">
                    <AlertCircle size={15} /> Se usará el programa existente;
                    sus datos no se modificarán.
                  </div>
                )}
              </>
            )}
            {step === 1 && (
              <>
                <label className="field-label">Nombre del curso</label>
                <input
                  className="field"
                  placeholder="Ej. Criptografía"
                  value={courseName}
                  onChange={(e) => {
                    setCourseName(e.target.value);
                    if (e.target.value) setExistingCourse("");
                  }}
                />
                <div className="or-divider">
                  <span>o selecciona uno existente</span>
                </div>
                <div className="select-wrap full">
                  <select
                    value={existingCourse}
                    onChange={(e) => {
                      setExistingCourse(e.target.value);
                      if (e.target.value) setCourseName("");
                    }}
                  >
                    <option value="">Seleccionar un curso</option>
                    {courses.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                  <ChevronDown size={15} />
                </div>
                <div
                  className={`date-fields ${existingCourse || existingProgram ? "disabled-fields" : ""}`}
                >
                  <label>
                    <CalendarDays size={15} /> Duración del curso
                  </label>
                  <div className="date-row">
                    <div>
                      <span>Fecha de inicio</span>
                      <input
                        type="date"
                        value={courseStart}
                        disabled={!!existingCourse}
                        onChange={(e) => setCourseStart(e.target.value)}
                      />
                    </div>
                    <div>
                      <span>Fecha de finalización</span>
                      <input
                        type="date"
                        value={courseEnd}
                        min={courseStart}
                        disabled={!!existingCourse}
                        onChange={(e) => setCourseEnd(e.target.value)}
                      />
                    </div>
                  </div>
                  {existingCourse && (
                    <small>
                      La duración está bloqueada porque seleccionaste un curso
                      existente.
                    </small>
                  )}
                </div>
              </>
            )}
            {step === 2 && (
              <>
                <div className="course-summary">
                  <div className="summary-icon">
                    <GraduationCap size={20} />
                  </div>
                  <div>
                    <strong>{courseName || existingCourse}</strong>
                    <span>{programName || existingProgram}</span>
                  </div>
                  <span className="summary-count">
                    {students.length} inscritos
                  </span>
                </div>
                <label className="field-label">Código del estudiante</label>
                <div className="code-row">
                  <input
                    className="field"
                    inputMode="numeric"
                    placeholder="Ej. 55555"
                    value={studentCode}
                    onChange={(e) => {
                      setStudentCode(e.target.value);
                      setStudentPreview(null);
                    }}
                    onKeyDown={(e) =>
                      e.key === "Enter" &&
                      lookupStudent(
                        setStudentPreview,
                        students,
                        studentCode,
                        setToast,
                      )
                    }
                  />
                  <button
                    className="btn btn-outline"
                    onClick={() =>
                      lookupStudent({
                        setStudentPreview: setStudentPreview,
                        students: students,
                        studentCode: studentCode,
                      })
                    }
                  >
                    Verificar código
                  </button>
                </div>
                {studentPreview && (
                  <div className="student-preview">
                    <div className="mini-avatar">
                      {studentPreview.name
                        .split(" ")
                        .map((x) => x[0])
                        .slice(0, 2)
                        .join("")}
                    </div>
                    <div>
                      <strong>{studentPreview.name}</strong>
                      <span>Código válido · {studentPreview.code}</span>
                    </div>
                    <button
                      className="btn btn-dark btn-sm"
                      onClick={() =>
                        addStudent({
                          setStudents,
                          setStudentCode,
                          setStudentPreview,
                          studentPreview,
                          setToast,
                        })
                      }
                    >
                      <Plus size={14} /> Añadir estudiante
                    </button>
                  </div>
                )}
                <p className="helper-text">
                  <CircleHelp size={14} /> Escribe el código para verificar el
                  nombre del estudiante antes de agregarlo.
                </p>
                {students.length > 0 && (
                  <div className="enrolled-list">
                    <strong>Estudiantes añadidos</strong>
                    {students.map((s) => (
                      <div key={s.code}>
                        <span>{s.name}</span>
                        <button
                          onClick={() =>
                            setStudents((list) =>
                              list.filter((x) => x.code !== s.code),
                            )
                          }
                          title="Quitar estudiante"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        <div className="modal-foot">
          <span className="step-indicator">Paso {step + 1} de 3</span>
          <div>
            {step > 0 && (
              <button
                className="btn btn-outline"
                onClick={() => setStep((s) => s - 1)}
              >
                <ChevronLeft size={16} /> Anterior
              </button>
            )}
            <button
              className="btn btn-dark"
              onClick={() =>
                nextWizard({
                  students,
                  step,
                  setStep,
                  setPrograms,
                  programName,
                  existingProgram,
                  setCourses,
                  courseName,
                  existingCourse,
                  setModal,
                  setSection,
                  setToast,
                })
              }
            >
              {step === 2 ? "Guardar" : "Siguiente"}{" "}
              {step < 2 && <ChevronRight size={16} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

//******************************* */
//*"Agregar Estudiante" COMPONENTS
//********************************* */
function lookupStudent({ setStudentPreview, students, studentCode, setToast }) {
  if (!/^\d{5,10}$/.test(studentCode.trim())) {
    setStudentPreview(null);
    notify(
      "Introduce un código de estudiante válido (5 a 10 dígitos)",
      (setToast = { setToast }),
    );
    return;
  }
  const exists = students.some((s) => s.code === studentCode.trim());
  if (exists) {
    notify("Este estudiante ya está agregado", (setToast = { setToast }));
    return;
  }
  setStudentPreview({
    code: studentCode.trim(),
    name:
      {
        55555: "María Fernanda Rojas",
        12345: "Carlos Eduardo Pérez",
        67890: "Valeria Mendoza",
      }[studentCode.trim()] || "Estudiante " + studentCode.trim(),
  });
}
const addStudent = ({
  setStudents,
  setStudentCode,
  setStudentPreview,
  studentPreview,
  setToast,
}) => {
  if (!studentPreview) return;
  setStudents((s) => [...s, studentPreview]);
  setStudentCode("");
  setStudentPreview(null);
  notify("Estudiante agregado al curso", (setToast = { setToast }));
};

export { Wizard };
