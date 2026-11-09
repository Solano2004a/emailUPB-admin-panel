import { useState } from "react";
import Sidebar from "./Sidebar.jsx";
import Received from "./Received.jsx";
import AllRequests from "./AllRequests.jsx";
import ChangePassword from "./ChangePassword.jsx";
import CreatedPrograms from "./CreatedPrograms.jsx";
import RequestDetails from "./RequestDetails.jsx";
import { initialRequests, initialPrograms } from "../data.js";

export default function AdminPanel() {
  const [section, setSection] = useState("received");
  const [requests, setRequests] = useState(initialRequests);
  const [programs, setPrograms] = useState(initialPrograms);
  const [detail, setDetail] = useState(null);

  const markAnswered = (id) => {
    setRequests((rs) =>
      rs.map((r) => (r.id === id ? { ...r, status: "answered" } : r)),
    );
    setDetail(null);
  };

  return (
    <div className="app">
      <Sidebar
        section={section}
        onChange={setSection}
        onLogout={() => alert("Sesión cerrada")}
      />
      <main className="main">
        <header className="top">
          <div>
            <div className="eyebrow">Panel de administración</div>
            <h1>Bienvenido, Robert.</h1>
            <p className="muted">
              Gestiona las solicitudes y los programas académicos.
            </p>
          </div>
          <div className="chip">
            <span className="av-lg">R</span>
            <div>
              <b>Robert</b>
              <div className="muted small">Administrador</div>
            </div>
          </div>
        </header>
        <div className="content">
          {section === "received" && (
            <Received
              requests={requests}
              setRequests={setRequests}
              onOpen={setDetail}
            />
          )}
          {section === "all" && (
            <AllRequests
              requests={requests}
              programs={programs}
              onOpen={setDetail}
            />
          )}
          {section === "password" && <ChangePassword />}
          {section === "programs" && (
            <CreatedPrograms programs={programs} setPrograms={setPrograms} />
          )}
        </div>
      </main>
      {detail && (
        <RequestDetails
          request={detail}
          onClose={() => setDetail(null)}
          onReply={markAnswered}
        />
      )}
    </div>
  );
}
