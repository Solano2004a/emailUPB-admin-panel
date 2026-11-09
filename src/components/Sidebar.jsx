import { Icon } from "./ui.jsx";

const ITEMS = [
  ["received", "mail", "Bandeja de Entrada"],
  ["all", "file", "Registro de Solicitudes"],
  ["password", "key", "Cambiar contraseña"],
  ["programs", "book", "Programas creados"],
];

export default function Sidebar({ section, onChange, onLogout }) {
  return (
    <aside className="side">
      <div className="brand">
        <span className="logo">
          <Icon n="logo" size={26} />
        </span>
        emailUPB
      </div>
      <nav className="nav">
        {ITEMS.map(([id, icon, label]) => (
          <button
            key={id}
            className={section === id ? "on" : ""}
            onClick={() => onChange(id)}
          >
            <Icon n={icon} />
            <span>{label}</span>
          </button>
        ))}
      </nav>
      <button className="logout" onClick={onLogout}>
        Cerrar Sesión
        <Icon n="logout" size={18} />
      </button>
      <div className="ver">ADMIN · 1.0</div>
    </aside>
  );
}
