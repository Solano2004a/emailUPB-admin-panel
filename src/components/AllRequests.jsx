import { useMemo, useState } from "react";
import { Icon, Avatar } from "./ui.jsx";
import Report from "./Report.jsx";

function Row({ r, onOpen }) {
  return (
    <div className="tr r3" onClick={() => onOpen(r)}>
      <span className="who">
        <Avatar name={r.student} />
        {r.student}
      </span>
      <span className="ellipsis">
        {r.type} - {r.desc}
      </span>
      <span className="date">{r.date}</span>
    </div>
  );
}

export default function AllRequests({ requests, programs, onOpen }) {
  const [open, setOpen] = useState({});
  const [report, setReport] = useState(false);

  const pending = useMemo(
    () => requests.filter((r) => r.status === "pending"),
    [requests],
  );
  const grouped = useMemo(() => {
    const g = {};
    requests.forEach((r) => {
      ((g[r.program] ??= {})[r.module] ??= []).push(r);
    });
    return Object.entries(g).map(([program, mods]) => ({
      program,
      modules: Object.entries(mods),
    }));
  }, [requests]);

  const toggle = (k) => setOpen((o) => ({ ...o, [k]: !o[k] }));

  return (
    <>
      <div className="sec-head">
        <div>
          <h2>Historial de Solicitudes</h2>
        </div>
        <button className="btn" onClick={() => setReport(true)}>
          <Icon n="file" size={16} />
          Generar Reporte
        </button>
      </div>

      <h3 className="group-title">Pendientes</h3>
      <div className="card">
        {pending.map((r) => (
          <Row key={r.id} r={r} onOpen={onOpen} />
        ))}
        {!pending.length && (
          <div className="empty">No hay solicitudes pendientes.</div>
        )}
      </div>

      <h3 className="group-title">Todas las solicitudes</h3>
      <div className="card">
        {grouped.map((g) => (
          <div key={g.program}>
            <button className="prow acc" onClick={() => toggle(g.program)}>
              <b>{g.program}</b>
              <Icon n={open[g.program] ? "up" : "down"} size={16} />
            </button>
            {open[g.program] &&
              g.modules.map(([m, list]) => {
                const k = `${g.program}/${m}`;
                return (
                  <div key={k}>
                    <button className="prow acc sub" onClick={() => toggle(k)}>
                      {m}
                      <Icon n={open[k] ? "up" : "down"} size={16} />
                    </button>
                    {open[k] &&
                      list.map((r) => <Row key={r.id} r={r} onOpen={onOpen} />)}
                  </div>
                );
              })}
          </div>
        ))}
      </div>
      {report && (
        <Report
          requests={requests}
          programs={programs}
          onClose={() => setReport(false)}
        />
      )}
    </>
  );
}
