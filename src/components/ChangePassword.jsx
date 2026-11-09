import { useState } from "react";
import { USER } from "../data.js";

export default function ChangePassword() {
  const [f, setF] = useState({ current: "", next: "", repeat: "" });
  const [msg, setMsg] = useState(null);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    if (!f.current)
      return setMsg({ ok: false, t: "Ingresa tu contraseña actual." });
    if (f.next.length < 6)
      return setMsg({
        ok: false,
        t: "La nueva contraseña debe tener al menos 6 caracteres.",
      });
    if (f.next !== f.repeat)
      return setMsg({ ok: false, t: "Las contraseñas nuevas no coinciden." });
    setMsg({ ok: true, t: "Contraseña actualizada." });
    setF({ current: "", next: "", repeat: "" });
  };

  return (
    <>
      <div className="sec-head">
        <div>
          <h2>Contraseña</h2>
        </div>
      </div>
      <form className="card pad pw" onSubmit={submit}>
        <h3>Cambio de contraseña</h3>
        <label className="lbl">Código</label>
        <input className="input ro" value={USER.code} readOnly />
        <label className="lbl">Nombre Completo</label>
        <input className="input ro" value={USER.name} readOnly />
        <label className="lbl">Contraseña actual</label>
        <input
          className="input"
          type="password"
          value={f.current}
          onChange={set("current")}
        />
        <label className="lbl">Contraseña nueva</label>
        <input
          className="input"
          type="password"
          value={f.next}
          onChange={set("next")}
        />
        <label className="lbl">Repetir contraseña nueva</label>
        <input
          className="input"
          type="password"
          value={f.repeat}
          onChange={set("repeat")}
        />
        {msg && <p className={`hint ${msg.ok ? "ok" : "err"}`}>{msg.t}</p>}
        <button className="btn dark" type="submit">
          Guardar cambios
        </button>
      </form>
    </>
  );
}
