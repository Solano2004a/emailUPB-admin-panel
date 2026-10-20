import React, { useMemo, useState, useContext } from "react";

import { createRoot } from "react-dom/client";
import { X, Check } from "lucide-react";
import "./styles.css";

import { Navbar } from "./Navbar";
import { openWizard } from "./utils";

import { Wizard } from "./wizard";
import { Report } from "./report";
import { ChangePassword } from "./changePassword";
import { Main } from "./mainPanel";
const initialRequests = [
  {
    id: 1,
    name: "Sophia Wilson",
    subject: "Tipo de solicitud - Descripción",
    date: "17 ago",
    status: "respondido",
  },
  {
    id: 2,
    name: "Sophia Wilson",
    subject:
      "Tipo de solicitud - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incid...",
    date: "24 sep",
    status: "respondido",
  },
  {
    id: 3,
    name: "Sophia Wilson",
    subject:
      "Tipo de solicitud - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt...",
    date: "15 jun",
    status: "no respondido",
  },
  {
    id: 4,
    name: "Sophia Wilson",
    subject:
      "Tipo de solicitud - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt...",
    date: "21 mar",
    status: "respondido",
  },
  {
    id: 5,
    name: "Sophia Wilson",
    subject:
      "Tipo de solicitud - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt...",
    date: "20 mar",
    status: "no respondido",
  },
  {
    id: 6,
    name: "Sophia Wilson",
    subject:
      "Tipo de solicitud - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt...",
    date: "12 feb",
    status: "respondido",
  },
  {
    id: 7,
    name: "Sophia Wilson",
    subject:
      "Tipo de solicitud - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt...",
    date: "01 ene",
    status: "no respondido",
  },
  {
    id: 8,
    name: "Sophia Wilson",
    subject:
      "Tipo de solicitud - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt...",
    date: "04/05/24",
    status: "respondido",
  },
  {
    id: 9,
    name: "Sophia Wilson",
    subject:
      "Tipo de solicitud - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt...",
    date: "20/01/23",
    status: "no respondido",
  },
];
const initialPrograms = [
  "Diplomado en seguridad informática",
  "Diplomado en análisis de datos",
];
const initialCourses = [
  "Criptografía",
  "Seguridad de redes",
  "Introducción a la ciberseguridad",
];
const seedAcademicPrograms = [
  {
    id: 101,
    name: "Maestría en Ciencia de Datos e Inteligencia Artificial",
    area: "Tecnología",
    modules: [
      {
        id: 1011,
        name: "Estadística Aplicada",
        students: [{ name: "María Fernanda Rojas", code: "55555" }],
      },
      {
        id: 1012,
        name: "Aprendizaje Automático",
        students: [
          { name: "Carlos Eduardo Pérez", code: "12345" },
          { name: "Valeria Mendoza", code: "67890" },
        ],
      },
      {
        id: 1013,
        name: "Visualización de Datos",
        students: [{ name: "Andrés Villarroel", code: "24680" }],
      },
    ],
  },
  {
    id: 102,
    name: "Maestría en Administración de Empresas (MBA)",
    area: "Negocios",
    modules: [
      {
        id: 1021,
        name: "Estrategia Empresarial",
        students: [
          { name: "Lucía Fernández", code: "13579" },
          { name: "Diego Salvatierra", code: "98765" },
        ],
      },
      {
        id: 1022,
        name: "Finanzas Corporativas",
        students: [{ name: "Gabriela Suárez", code: "45678" }],
      },
      {
        id: 1023,
        name: "Liderazgo y Gestión de Equipos",
        students: [{ name: "Mateo Rivero", code: "11223" }],
      },
    ],
  },
  {
    id: 103,
    name: "Maestría en Gestión de Proyectos",
    area: "Gestión",
    modules: [
      {
        id: 1031,
        name: "Planificación y Alcance",
        students: [{ name: "Camila Ortiz", code: "33445" }],
      },
      {
        id: 1032,
        name: "Riesgos y Calidad",
        students: [{ name: "Nicolás Méndez", code: "77889" }],
      },
    ],
  },
];

//*APP
function App() {
  const [section, setSection] = useState("requests");
  const [requests, setRequests] = useState(initialRequests);
  const [filter, setFilter] = useState("todos");
  const [selected, setSelected] = useState([]);
  const [modal, setModal] = useState("");
  const [step, setStep] = useState(0);
  const [programs, setPrograms] = useState(initialPrograms);
  const [academicPrograms, setAcademicPrograms] =
    useState(seedAcademicPrograms);
  const [expandedPrograms, setExpandedPrograms] = useState([]);
  const [expandedModules, setExpandedModules] = useState([]);
  const [enrollmentModal, setEnrollmentModal] = useState(null);
  const [courses, setCourses] = useState(initialCourses);
  const [programName, setProgramName] = useState("");
  const [existingProgram, setExistingProgram] = useState("");
  const [courseName, setCourseName] = useState("");
  const [existingCourse, setExistingCourse] = useState("");
  const [courseStart, setCourseStart] = useState("2026-10-01");
  const [courseEnd, setCourseEnd] = useState("2026-12-15");
  const [studentCode, setStudentCode] = useState("");
  const [students, setStudents] = useState([]);
  const [studentPreview, setStudentPreview] = useState(null);
  const [reportType, setReportType] = useState("");
  const [reportStudent, setReportStudent] = useState("");
  const [reportProgram, setReportProgram] = useState("");
  const [toast, setToast] = useState("");
  const [search, setSearch] = useState("");
  const [passwords, setPasswords] = useState({
    old: "",
    next: "",
    confirm: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="app-shell">
      <Navbar
        setExistingProgram={setExistingProgram}
        setCourseName={setCourseName}
        setExistingCourse={setExistingCourse}
        setStudentCode={setStudentCode}
        setStudentPreview={setStudentPreview}
        setSection={setSection}
        section={section}
        openWizard={openWizard}
        setModal={setModal}
        setStep={setStep}
        setProgramName={setProgramName}
        setToast={setToast}
      />
      <Main
        setPasswords={setPasswords}
        showPassword={showPassword}
        passwords={passwords}
        setStep={setStep}
        setProgramName={setProgramName}
        setExistingProgram={setExistingProgram}
        academicPrograms={academicPrograms}
        setAcademicPrograms={setAcademicPrograms}
        expandedPrograms={expandedPrograms}
        setExpandedPrograms={setExpandedPrograms}
        expandedModules={expandedModules}
        setExpandedModules={setExpandedModules}
        enrollmentModal={enrollmentModal}
        setEnrollmentModal={setEnrollmentModal}
        setCourseName={setCourseName}
        setExistingCourse={setExistingCourse}
        setStudentCode={setStudentCode}
        setStudentPreview={setStudentPreview}
        section={section}
        requests={requests}
        setRequests={setRequests}
        filter={filter}
        students={students}
        setReportType={setReportType}
        setModal={setModal}
        setSearch={setSearch}
        search={search}
        setFilter={setFilter}
        setSelected={setSelected}
        selected={selected}
        setToast={setToast}
      />
      {modal === "wizard" && (
        <Wizard
          setPrograms={setPrograms}
          programs={programs}
          step={step}
          setStep={setStep}
          setProgramName={setProgramName}
          programName={programName}
          setExistingProgram={setExistingProgram}
          existingProgram={existingProgram}
          setCourses={setCourses}
          setCourseName={setCourseName}
          courseName={courseName}
          setExistingCourse={setExistingCourse}
          existingCourse={existingCourse}
          setCourseStart={setCourseStart}
          courseStart={courseStart}
          setCourseEnd={setCourseEnd}
          courseEnd={courseEnd}
          courses={courses}
          setStudentCode={setStudentCode}
          studentCode={studentCode}
          setStudentPreview={setStudentPreview}
          studentPreview={studentPreview}
          setStudents={setStudents}
          students={students}
          setModal={setModal}
          setSection={setSection}
          setToast={setToast}
        />
      )}
      {modal === "report" && (
        <Report
          requests={requests}
          programs={programs}
          setReportType={setReportType}
          reportType={reportType}
          setReportStudent={setReportStudent}
          reportStudent={reportStudent}
          setReportProgram={setReportProgram}
          reportProgram={reportProgram}
          setModal={setModal}
          setToast={setToast}
        />
      )}
      {/* {modal === "password" && (
        <ChangePassword
          showPassword={showPassword}
          passwords={passwords}
          setPasswords={setPasswords}
          setShowPassword={setShowPassword}
          setModal={setModal}
          setToast={setToast}
        />
      )} */}
      {toast && (
        <div className="toast">
          <span className="toast-check">
            <Check size={15} />
          </span>
          {toast}
          <button onClick={() => setToast("")}>
            <X size={14} />
          </button>
        </div>
      )}
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
