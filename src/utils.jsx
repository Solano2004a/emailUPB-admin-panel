//************************************************** */
//**GENERAL COMPONENTS */
function openWizard({
  setStep,
  setModal,
  setProgramName,
  setExistingProgram,
  setCourseName,
  setExistingCourse,
  setStudentCode,
  setStudentPreview,
}) {
  setStep(0);
  setModal("wizard");
  setProgramName("");
  setExistingProgram("");
  setCourseName("");
  setExistingCourse("");
  setStudentCode("");
  setStudentPreview(null);
}
const closeModal = ({ setModal }) => setModal("");

const notify = (message, { setToast }) => {
  setToast(message);
  setTimeout(() => setToast(""), 3000);
};

//*MAIN PANEL COMPONENTS**********
//* select and remove requests
const toggleSelected = (id, { setSelected }) =>
  setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
const deleteRequest = ({ id, setRequests, setSelected, setToast }) => {
  setRequests((rs) => rs.filter((r) => r.id !== id));
  setSelected((s) => s.filter((x) => x !== id));
  notify("Solicitud eliminada", (setToast = { setToast }));
};
const deleteSelected = ({ selected, setRequests, setSelected, setToast }) => {
  if (!selected.length) return;
  setRequests((rs) => rs.filter((r) => !selected.includes(r.id)));
  setSelected([]);
  notify("Solicitudes eliminadas", (setToast = { setToast }));
};

export {
  openWizard,
  closeModal,
  notify,
  toggleSelected,
  deleteRequest,
  deleteSelected,
};
