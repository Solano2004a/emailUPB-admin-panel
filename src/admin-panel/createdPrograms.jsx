import {
  Trash2,
  ChevronDown,
  Users,
  GraduationCap,
  BookOpen,
  X,
} from "lucide-react";

import { notify } from "../utils";
function EnrollmentModal({
  academicPrograms,
  setAcademicPrograms,
  enrollmentModal,
  setEnrollmentModal,
  setToast,
}) {
  return (
    <div
      className="overlay enrollment-overlay"
      onMouseDown={(e) =>
        e.target === e.currentTarget && setEnrollmentModal(null)
      }
    >
      <div className="modal enrollment-modal">
        <div className="modal-head">
          <div>
            <span className="modal-kicker">GESTIÓN ACADÉMICA</span>
            <h3>Estudiantes inscritos</h3>
            <p>{enrollmentModal.moduleName}</p>
          </div>
          <button
            className="close-btn"
            onClick={() => setEnrollmentModal(null)}
            aria-label="Cerrar"
          >
            <X size={19} />
          </button>
        </div>
        <div className="enrollment-context">
          <GraduationCap size={16} />
          <span>{enrollmentModal.programName}</span>
        </div>
        <div className="enrollment-list">
          {(() => {
            const p = academicPrograms.find(
              (x) => x.id === enrollmentModal.programId,
            );
            const m = p?.modules.find((x) => x.id === enrollmentModal.moduleId);
            return !m || m.students.length === 0 ? (
              <div className="empty compact-empty">
                <Users size={26} />
                <strong>No hay estudiantes inscritos</strong>
                <span>Este módulo no tiene estudiantes registrados.</span>
              </div>
            ) : (
              m.students.map((student) => (
                <div className="enrollment-student" key={student.code}>
                  <div className="mini-avatar">
                    {student.name
                      .split(" ")
                      .map((x) => x[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                  <div className="enrollment-student-info">
                    <strong>{student.name}</strong>
                    <span>Código: {student.code}</span>
                  </div>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => {
                      if (
                        window.confirm(
                          `¿Desinscribir a ${student.name} del módulo?`,
                        )
                      ) {
                        setAcademicPrograms((ps) =>
                          ps.map((program) =>
                            program.id === p.id
                              ? {
                                  ...program,
                                  modules: program.modules.map((mod) =>
                                    mod.id === m.id
                                      ? {
                                          ...mod,
                                          students: mod.students.filter(
                                            (st) => st.code !== student.code,
                                          ),
                                        }
                                      : mod,
                                  ),
                                }
                              : program,
                          ),
                        );
                        notify(
                          "Estudiante desinscrito correctamente",
                          (setToast = { setToast }),
                        );
                        setEnrollmentModal((current) => ({ ...current }));
                      }
                    }}
                  >
                    Desinscribir estudiante
                  </button>
                </div>
              ))
            );
          })()}
        </div>
        <div className="modal-foot">
          <button
            className="btn btn-dark"
            onClick={() => setEnrollmentModal(null)}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
function CreatedPrograms({
  academicPrograms,
  setAcademicPrograms,
  expandedPrograms,
  setExpandedPrograms,
  expandedModules,
  setExpandedModules,
  enrollmentModal,
  setEnrollmentModal,
  setToast,
}) {
  return (
    <>
      <div className="section-heading">
        <div>
          <h2>Programas creados</h2>
          <p>
            Administra las maestrías, sus módulos y los estudiantes inscritos.
          </p>
        </div>
        <div className="heading-actions">
          <span className="count-pill">
            {academicPrograms.length} programas
          </span>
        </div>
      </div>
      <div className="program-list">
        {academicPrograms.length === 0 ? (
          <div className="empty">
            <GraduationCap size={30} />
            <strong>No hay programas registrados</strong>
            <span>Los programas de maestría aparecerán aquí.</span>
          </div>
        ) : (
          academicPrograms.map((program) => (
            <article className="academic-card" key={program.id}>
              <div className="academic-row">
                <div className="academic-icon">
                  <GraduationCap size={22} />
                </div>
                <div className="academic-info">
                  <span className="academic-kicker">
                    MAESTRÍA · {program.area}
                  </span>
                  <strong>{program.name}</strong>
                  <small>
                    {program.modules.length} módulos ·{" "}
                    {program.modules.reduce((n, m) => n + m.students.length, 0)}{" "}
                    estudiantes inscritos
                  </small>
                </div>
                <button
                  className="icon-action danger"
                  title="Eliminar programa"
                  aria-label={`Eliminar ${program.name}`}
                  onClick={() => {
                    if (
                      window.confirm(
                        `¿Eliminar el programa «${program.name}» y todos sus módulos?`,
                      )
                    ) {
                      setAcademicPrograms((ps) =>
                        ps.filter((p) => p.id !== program.id),
                      );
                      setExpandedPrograms((xs) =>
                        xs.filter((id) => id !== program.id),
                      );
                      notify("Programa eliminado", (setToast = { setToast }));
                    }
                  }}
                >
                  <Trash2 size={17} />
                </button>
                <button
                  className="btn btn-outline modules-toggle"
                  onClick={() =>
                    setExpandedPrograms((xs) =>
                      xs.includes(program.id)
                        ? xs.filter((id) => id !== program.id)
                        : [...xs, program.id],
                    )
                  }
                >
                  {expandedPrograms.includes(program.id)
                    ? "Ocultar módulos"
                    : "Ver módulos"}{" "}
                  <ChevronDown
                    className={
                      expandedPrograms.includes(program.id) ? "rotated" : ""
                    }
                    size={15}
                  />
                </button>
              </div>
              {expandedPrograms.includes(program.id) && (
                <div className="modules-panel">
                  {program.modules.length === 0 ? (
                    <div className="module-empty">
                      Este programa todavía no tiene módulos.
                    </div>
                  ) : (
                    program.modules.map((module) => (
                      <div className="module-block" key={module.id}>
                        <div className="module-row">
                          <div className="module-symbol">
                            <BookOpen size={17} />
                          </div>
                          <div className="module-info">
                            <strong>{module.name}</strong>
                            <span>
                              {module.students.length}{" "}
                              {module.students.length === 1
                                ? "estudiante inscrito"
                                : "estudiantes inscritos"}
                            </span>
                          </div>
                          <button
                            className="icon-action danger"
                            title="Eliminar módulo"
                            aria-label={`Eliminar módulo ${module.name}`}
                            onClick={() => {
                              if (
                                window.confirm(
                                  `¿Eliminar el módulo «${module.name}»?`,
                                )
                              ) {
                                setAcademicPrograms((ps) =>
                                  ps.map((p) =>
                                    p.id === program.id
                                      ? {
                                          ...p,
                                          modules: p.modules.filter(
                                            (m) => m.id !== module.id,
                                          ),
                                        }
                                      : p,
                                  ),
                                );
                                setExpandedModules((xs) =>
                                  xs.filter((id) => id !== module.id),
                                );
                                notify(
                                  "Módulo eliminado",
                                  (setToast = { setToast }),
                                );
                              }
                            }}
                          >
                            <Trash2 size={16} />
                          </button>
                          <button
                            className="btn btn-outline btn-sm"
                            onClick={() =>
                              setExpandedModules((xs) =>
                                xs.includes(module.id)
                                  ? xs.filter((id) => id !== module.id)
                                  : [...xs, module.id],
                              )
                            }
                          >
                            {expandedModules.includes(module.id)
                              ? "Ocultar estudiantes"
                              : "Ver estudiantes"}{" "}
                            <ChevronDown
                              className={
                                expandedModules.includes(module.id)
                                  ? "rotated"
                                  : ""
                              }
                              size={14}
                            />
                          </button>
                        </div>
                        {expandedModules.includes(module.id) && (
                          <div className="module-students-inline">
                            <Users size={15} />
                            <span>
                              {module.students.length} estudiantes inscritos
                            </span>
                            <button
                              className="btn btn-dark btn-sm"
                              onClick={() =>
                                setEnrollmentModal({
                                  programId: program.id,
                                  moduleId: module.id,
                                  programName: program.name,
                                  moduleName: module.name,
                                })
                              }
                            >
                              Gestionar estudiantes
                            </button>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}
            </article>
          ))
        )}
        {enrollmentModal && (
          <EnrollmentModal
            academicPrograms={academicPrograms}
            setAcademicPrograms={setAcademicPrograms}
            enrollmentModal={enrollmentModal}
            setEnrollmentModal={setEnrollmentModal}
            setToast={setToast}
          />
        )}
      </div>
    </>
  );
}
export { CreatedPrograms, EnrollmentModal };
