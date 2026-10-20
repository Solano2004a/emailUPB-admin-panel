import {
  Mail,
  Waves,
  ContactRound,
  KeyRound,
  LogOut,
  Book,
  LayoutGrid,
  RefreshCw,
  Pencil,
  BookOpen,
} from "lucide-react";
import { openWizard, notify } from "./utils";

function Navbar({
  setSection,
  section,
  setStep,
  setProgramName,
  setExistingProgram,
  setCourseName,
  setExistingCourse,
  setStudentCode,
  setStudentPreview,
  setModal,
  setToast,
}) {
  return (
    <>
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">
            <Waves size={23} />
          </span>
          <span>emailUPB</span>
        </div>
        {/* <button
          className={`nav-item ${section === "create" ? "active" : ""}`}
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
          <ContactRound size={17} />
          <span>Crear Programa/Añadir Estudiante</span>
        </button> */}
        <button
          className={`nav-item ${section === "requests" ? "active" : ""}`}
          onClick={() => setSection("requests")}
        >
          <Mail size={17} />
          <span>
            Registro de
            <br /> Solicitudes
          </span>
        </button>
        <button
          className={`nav-item ${section === "password" ? "active" : ""}`}
          onClick={() => {
            setSection("password");
            setModal("password");
          }}
        >
          <KeyRound size={17} />
          <span>
            Cambiar
            <br /> contraseña
          </span>
        </button>
        {/*TODO: implement "programas creados" funcionality and UI*/}
        <button
          className={`nav-item ${section === "programs" ? "active" : ""}`}
          onClick={() => {
            setSection("programs");
            setModal("programs");
          }}
        >
          <Book size={17} />
          <span>
            Programas
            <br /> creados
          </span>
        </button>
        <div className="sidebar-bottom">
          <button
            className="logout"
            onClick={() =>
              notify("Sesión cerrada (demostración)", (setToast = { setToast }))
            }
          >
            Cerrar Sesión <LogOut size={14} />
          </button>
          <span className="version">ADMIN · 1.0</span>
        </div>
      </aside>
    </>
  );
}

export { Navbar };
