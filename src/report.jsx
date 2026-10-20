import { X, ChevronDown, FileText, Download } from "lucide-react";
import { jsPDF } from "jspdf";

import { notify, closeModal } from "./utils";

//************************************** */
//* REPORT COMPONENTS
//*"Generar reporte" COMPONENTS
function generateReport({
  requests,
  setReportProgram,
  reportProgram,
  setReportStudent,
  reportStudent,
  setReportType,
  reportType,
  setModal,
  setToast,
}) {
  if (!reportType) {
    notify("Selecciona cómo generar el reporte", (setToast = { setToast }));
    return;
  }
  if (reportType === "Estudiante" && !reportStudent.trim()) {
    notify("Introduce el código del estudiante", (setToast = { setToast }));
    return;
  }
  if (reportType === "Programa" && !reportProgram) {
    notify("Selecciona un programa", (setToast = { setToast }));
    return;
  }
  const details =
    reportType === "Estudiante"
      ? `Estudiante: ${reportStudent}`
      : `Programa: ${reportProgram}`;
  const pdf = new jsPDF({ unit: "mm", format: "a4" });
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(18);
  pdf.text("Reporte de solicitudes", 18, 22);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  pdf.text(details, 18, 31);
  pdf.text(
    `Fecha de generación: ${new Date().toLocaleDateString("es-BO")}`,
    18,
    38,
  );
  pdf.setDrawColor(220, 218, 229);
  pdf.line(18, 44, 192, 44);
  let y = 53;
  pdf.setFont("helvetica", "bold");
  pdf.text("Fecha", 18, y);
  pdf.text("Estudiante", 43, y);
  pdf.text("Estado", 83, y);
  pdf.text("Asunto / descripción", 112, y);
  y += 7;
  pdf.setFont("helvetica", "normal");
  const rows = requests.filter((r) =>
    reportType === "Estudiante" ? true : true,
  );
  rows.forEach((r) => {
    if (y > 275) {
      pdf.addPage();
      y = 20;
    }
    pdf.text(String(r.date).slice(0, 15), 18, y);
    pdf.text(r.name.slice(0, 18), 43, y);
    pdf.text(r.status === "respondido" ? "Respondido" : "Pendiente", 83, y);
    const lines = pdf.splitTextToSize(r.subject, 76);
    pdf.text(lines[0] || "", 112, y);
    y += Math.max(7, lines.length * 4);
  });
  pdf.save("reporte-solicitudes.pdf");
  notify("Reporte PDF generado y descargado", (setToast = { setToast }));
  setModal("");
  setReportType("");
  setReportStudent("");
  setReportProgram("");
}

function Report({
  programs,
  requests,
  setReportType,
  reportType,
  setReportStudent,
  reportStudent,
  setReportProgram,
  reportProgram,
  setModal,
  setToast,
}) {
  return (
    <div
      className="overlay"
      onMouseDown={(e) =>
        e.target === e.currentTarget && closeModal({ setModal })
      }
    >
      <div className="modal report-modal">
        <div className="modal-head">
          <div>
            <span className="modal-kicker">EXPORTACIÓN</span>
            <h3>Reporte de solicitudes</h3>
            <p>Genera un archivo con las solicitudes registradas.</p>
          </div>
          <button
            className="close-btn"
            onClick={() => closeModal({ setModal })}
          >
            <X size={19} />
          </button>
        </div>
        <div className="report-body">
          <label className="field-label">Generar reporte por</label>
          <div className="select-wrap full">
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
            >
              <option value="">Elige una opción</option>
              <option>Estudiante</option>
              <option>Programa</option>
            </select>
            <ChevronDown size={15} />
          </div>
          {reportType === "Estudiante" && (
            <div className="conditional-field">
              <label className="field-label">Código del estudiante</label>
              <input
                className="field"
                placeholder="Ej. 55555"
                value={reportStudent}
                onChange={(e) => setReportStudent(e.target.value)}
              />
              <span className="field-hint">
                Introduce el código del estudiante que quieres consultar.
              </span>
            </div>
          )}
          {reportType === "Programa" && (
            <div className="conditional-field">
              <label className="field-label">Nombre del programa</label>
              <div className="select-wrap full">
                <select
                  value={reportProgram}
                  onChange={(e) => setReportProgram(e.target.value)}
                >
                  <option value="">Selecciona una opción</option>
                  {programs.map((p) => (
                    <option key={p}>{p}</option>
                  ))}
                </select>
                <ChevronDown size={15} />
              </div>
            </div>
          )}
          <div className="report-info">
            <FileText size={18} />
            <span>
              El reporte se descargará automáticamente en tu dispositivo al
              generarlo.
            </span>
          </div>
        </div>
        <div className="modal-foot">
          <button
            className="btn btn-outline"
            onClick={() => closeModal({ setModal })}
          >
            Cancelar
          </button>
          <button
            className="btn btn-dark"
            onClick={() =>
              generateReport({
                requests,
                setReportProgram,
                reportProgram,
                setReportStudent,
                reportStudent,
                setReportType,
                reportType,
                setModal,
                setToast,
              })
            }
            disabled={
              !reportType ||
              (reportType === "Estudiante" && !reportStudent.trim()) ||
              (reportType === "Programa" && !reportProgram)
            }
          >
            <Download size={16} /> Generar reporte
          </button>
        </div>
      </div>
    </div>
  );
}

export { Report };
