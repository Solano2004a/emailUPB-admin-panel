import { useMemo } from "react";
import { ChangePassword } from "./changePassword";
import { CreatedPrograms } from "./admin-panel/createdPrograms";
import {
  ChevronDown,
  FileText,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  LayoutGrid,
  RefreshCw,
  Users,
  GraduationCap,
  CalendarDays,
  AlertCircle,
  Download,
  Pencil,
  BookOpen,
  Plus,
  Mail,
  Check,
  Search,
  Trash2,
  X,
} from "lucide-react";

import {
  closeModal,
  notify,
  toggleSelected,
  deleteRequest,
  deleteSelected,
  openWizard,
} from "./utils";

//*PANEL PRINCIPAL
function Main({
  setPasswords,
  showPassword,
  passwords,
  setStep,
  setProgramName,
  setExistingProgram,
  academicPrograms,
  setAcademicPrograms,
  expandedPrograms,
  setExpandedPrograms,
  expandedModules,
  setExpandedModules,
  enrollmentModal,
  setEnrollmentModal,
  setCourseName,
  setExistingCourse,
  setStudentCode,
  setStudentPreview,
  section,
  requests,
  setRequests,
  filter,
  students,
  setReportType,
  setModal,
  setSearch,
  search,
  setFilter,
  setSelected,
  selected,
  setToast,
}) {
  //* Filter components
  const filtered = useMemo(
    () =>
      requests.filter(
        (r) =>
          (filter === "todos" || r.status === filter) &&
          `${r.name} ${r.subject}`.toLowerCase().includes(search.toLowerCase()),
      ),
    [requests, filter, search],
  );
  return (
    <>
      <main className="main-panel">
        <header className="topbar">
          <div>
            <div className="eyebrow">PANEL DE ADMINISTRACIÓN</div>
            <h1>Bienvenido, Robert.</h1>
            <p>Gestiona las solicitudes y los programas académicos.</p>
          </div>
          <div className="profile">
            <div className="avatar">R</div>
            <div className="profile-meta">
              <strong>Robert</strong>
              <span>Administrador</span>
            </div>
            {/* <ChevronDown size={16} /> */}
          </div>
        </header>
        <section className="content-area">
          {section === "requests" && (
            <>
              <div className="section-heading">
                <div>
                  <h2>Registro de solicitudes</h2>
                  <p>
                    Consulta, filtra y administra las solicitudes recibidas.
                  </p>
                </div>
                <div className="heading-actions">
                  <button
                    className="btn btn-outline"
                    onClick={() => {
                      setReportType("");
                      setModal("report");
                    }}
                  >
                    <FileText size={16} /> Generar reporte
                  </button>
                  <button
                    className="btn btn-dark"
                    onClick={() =>
                      openWizard({
                        setStep,
                        setModal,
                        setProgramName,
                        setExistingProgram,
                        setCourseName,
                        setExistingCourse,
                        setStudentCode,
                        setStudentPreview,
                      })
                    }
                  >
                    <Plus size={17} /> Crear Programa / Añadir Estudiante
                  </button>
                </div>
              </div>
              <div className="stats">
                <div className="stat-card">
                  <span className="stat-icon lavender">
                    <Mail size={18} />
                  </span>
                  <div>
                    <span>Total de solicitudes</span>
                    <strong>{requests.length}</strong>
                  </div>
                </div>
                <div className="stat-card">
                  <span className="stat-icon green">
                    <Check size={18} />
                  </span>
                  <div>
                    <span>Respondidas</span>
                    <strong>
                      {requests.filter((r) => r.status === "respondido").length}
                    </strong>
                  </div>
                </div>
                <div className="stat-card">
                  <span className="stat-icon amber">
                    <AlertCircle size={18} />
                  </span>
                  <div>
                    <span>Pendientes</span>
                    <strong>
                      {
                        requests.filter((r) => r.status === "no respondido")
                          .length
                      }
                    </strong>
                  </div>
                </div>
              </div>
              <div className="table-card">
                <div className="table-toolbar">
                  <div className="searchbox">
                    <Search size={16} />
                    <input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Buscar solicitudes..."
                    />
                  </div>
                  <div className="toolbar-right">
                    <label className="filter-label">Filtrar por</label>
                    <div className="select-wrap">
                      <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                      >
                        <option value="todos">Todas las solicitudes</option>
                        <option value="respondido">Respondidos</option>
                        <option value="no respondido">No respondidos</option>
                      </select>
                      <ChevronDown size={15} />
                    </div>
                    {selected.length > 0 && (
                      <button
                        className="btn btn-danger"
                        onClick={() =>
                          deleteSelected({
                            selected,
                            setRequests,
                            setSelected,
                            setToast,
                          })
                        }
                      >
                        <Trash2 size={15} /> Eliminar ({selected.length})
                      </button>
                    )}
                  </div>
                </div>
                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th className="check-col">
                          <input
                            type="checkbox"
                            checked={
                              filtered.length > 0 &&
                              filtered.every((r) => selected.includes(r.id))
                            }
                            onChange={(e) =>
                              setSelected(
                                e.target.checked
                                  ? [
                                      ...new Set([
                                        ...selected,
                                        ...filtered.map((r) => r.id),
                                      ]),
                                    ]
                                  : selected.filter(
                                      (id) =>
                                        !filtered.some((r) => r.id === id),
                                    ),
                              )
                            }
                          />
                        </th>
                        <th>ESTUDIANTE</th>
                        <th>ASUNTO / DESCRIPCIÓN</th>
                        <th>FECHA</th>
                        <th>ESTADO</th>
                        <th className="actions-col">ACCIONES</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((r) => (
                        <tr key={r.id}>
                          <td>
                            <input
                              type="checkbox"
                              checked={selected.includes(r.id)}
                              onChange={() =>
                                toggleSelected(r.id, { setSelected })
                              }
                            />
                          </td>
                          <td>
                            <div className="student-cell">
                              <div className="mini-avatar">
                                {r.name
                                  .split(" ")
                                  .map((s) => s[0])
                                  .join("")
                                  .slice(0, 2)}
                              </div>
                              <span>{r.name}</span>
                            </div>
                          </td>
                          <td className="subject" title={r.subject}>
                            {r.subject}
                          </td>
                          <td className="date-cell">{r.date}</td>
                          <td>
                            <span
                              className={`status ${r.status === "respondido" ? "done" : "pending"}`}
                            >
                              <span />{" "}
                              {r.status === "respondido"
                                ? "Respondido"
                                : "No respondido"}
                            </span>
                          </td>
                          <td>
                            <button
                              className="icon-btn delete"
                              title="Eliminar solicitud"
                              onClick={() =>
                                deleteRequest({
                                  id: r.id,
                                  setRequests: setRequests,
                                  setSelected: setSelected,
                                  setToast: setToast,
                                })
                              }
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {filtered.length === 0 && (
                    <div className="empty">
                      <Search size={24} />
                      <strong>No hay solicitudes</strong>
                      <span>Prueba cambiando los filtros de búsqueda.</span>
                    </div>
                  )}
                </div>
                <div className="table-footer">
                  <span>
                    Mostrando <strong>{filtered.length}</strong> de{" "}
                    <strong>{requests.length}</strong> solicitudes
                  </span>
                  <div className="pagination">
                    <button disabled>
                      <ChevronLeft size={16} />
                    </button>
                    <button className="page-active">1</button>
                    <button disabled>2</button>
                    <button disabled>
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {section === "programs" && (
            <CreatedPrograms
              academicPrograms={academicPrograms}
              setAcademicPrograms={setAcademicPrograms}
              expandedPrograms={expandedPrograms}
              setExpandedPrograms={setExpandedPrograms}
              expandedModules={expandedModules}
              setExpandedModules={setExpandedModules}
              enrollmentModal={enrollmentModal}
              setEnrollmentModal={setEnrollmentModal}
              setToast={setToast}
            />
          )}

          {section === "students" && (
            <>
              <div className="section-heading">
                <div>
                  <h2>Estudiantes agregados</h2>
                  <p>Estudiantes vinculados al proceso de creación actual.</p>
                </div>
                <button
                  className="btn btn-dark"
                  onClick={() =>
                    openWizard({
                      setStep,
                      setModal,
                      setProgramName,
                      setExistingProgram,
                      setCourseName,
                      setExistingCourse,
                      setStudentCode,
                      setStudentPreview,
                    })
                  }
                >
                  <Plus size={17} /> Crear/Añadir
                </button>
              </div>
              <div className="table-card">
                <div className="student-list-head">
                  <Users size={19} /> Estudiantes{" "}
                  <span className="count-pill">{students.length}</span>
                </div>
                {students.length === 0 ? (
                  <div className="empty">
                    <Users size={28} />
                    <strong>Aún no hay estudiantes</strong>
                    <span>
                      Usa Crear/Añadir para vincular estudiantes a un curso.
                    </span>
                    <button
                      className="btn btn-dark"
                      onClick={() =>
                        openWizard({
                          setStep,
                          setModal,
                          setProgramName,
                          setExistingProgram,
                          setCourseName,
                          setExistingCourse,
                          setStudentCode,
                          setStudentPreview,
                        })
                      }
                    >
                      <Plus size={16} /> Añadir estudiante
                    </button>
                  </div>
                ) : (
                  students.map((s) => (
                    <div className="added-student" key={s.code}>
                      <div className="mini-avatar">
                        {s.name
                          .split(" ")
                          .map((x) => x[0])
                          .slice(0, 2)
                          .join("")}
                      </div>
                      <div>
                        <strong>{s.name}</strong>
                        <span>Código: {s.code}</span>
                      </div>
                      <span className="status done">
                        <span /> Agregado
                      </span>
                    </div>
                  ))
                )}
              </div>
            </>
          )}
          {section === "password" && (
            <div className="section-heading">
              <ChangePassword
                passwords={passwords}
                showPassword={showPassword}
                setPasswords={setPasswords}
                setToast={setToast}
              />
            </div>
          )}
        </section>
        <footer className="app-footer">
          <span>
            emailUPB <span className="footer-dot">•</span> Sistema de gestión
            académica
          </span>
          <span>Universidad Privada Boliviana</span>
        </footer>
      </main>
    </>
  );
}

export { Main };
