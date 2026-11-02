import React, { useState } from "react";
import "../styles.css";

// Ícono de logo (espiral)
function LogoIcon() {
  return (
    <svg
      className="logo-icon"
      viewBox="0 0 24 24"
      width="26"
      height="26"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="spiral" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#888888" />
        </radialGradient>
      </defs>
      <path
        fill="url(#spiral)"
        d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm0 3a7 7 0 0 1 6.7 9c-1 2.4-3.6 3.5-5.8 2.6-1.7-.7-2.5-2.6-1.8-4.2.5-1.2 1.9-1.8 3-1.3.8.3 1.2 1.2.9 2-.2.5-.7.7-1.1.5-.3-.1-.4-.4-.3-.7"
      />
    </svg>
  );
}

// Ícono ojo abierto / cerrado
function EyeIcon({ open }) {
  return open ? (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path
        fill="none"
        stroke="#333"
        strokeWidth="1.8"
        d="M1.5 12S5 5.5 12 5.5 22.5 12 22.5 12 19 18.5 12 18.5 1.5 12 1.5 12Z"
      />
      <circle
        cx="12"
        cy="12"
        r="3"
        fill="none"
        stroke="#333"
        strokeWidth="1.8"
      />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path
        fill="none"
        stroke="#333"
        strokeWidth="1.8"
        strokeLinecap="round"
        d="M1.5 12S5 5.5 12 5.5c1.7 0 3.2.4 4.5 1M22.5 12S19 18.5 12 18.5c-1.7 0-3.2-.4-4.5-1"
      />
      <path
        fill="none"
        stroke="#333"
        strokeWidth="1.8"
        strokeLinecap="round"
        d="M3 3l18 18"
      />
    </svg>
  );
}

function LoginView({ onForgot, onLogin }) {
  const [codigo, setCodigo] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de autenticación aquí
    console.log({ codigo, password });
  };

  return (
    <div className="card">
      <div className="card-header">
        <LogoIcon />
        <span className="card-title">EmailUPB</span>
      </div>

      <form className="card-body" onSubmit={handleSubmit}>
        <input
          type="text"
          className="field"
          placeholder="Código de acceso"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
        />

        <div className="password-row">
          <input
            type={showPassword ? "text" : "password"}
            className="field field-password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="toggle-eye"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={
              showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
            }
          >
            <EyeIcon open={!showPassword} />
          </button>
        </div>

        <button type="submit" className="btn-primary" onClick={onLogin}>
          Acceder
        </button>

        <button type="button" className="link" onClick={onForgot}>
          ¿Olvidó su contraseña?
        </button>
      </form>
    </div>
  );
}

function RecoverView({ onBack }) {
  const [codigo, setCodigo] = useState("");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de recuperación aquí
    setSent(true);
    console.log({ codigo, email });
  };

  return (
    <div className="card">
      <div className="card-header recover-header">
        <span className="card-title recover-title">Recuperar Contraseña</span>
      </div>

      <form className="card-body" onSubmit={handleSubmit}>
        <input
          type="text"
          className="field"
          placeholder="Código de acceso"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
        />

        <span className="separator-o">ó</span>

        <input
          type="email"
          className="field"
          placeholder="Email registrado en la UPB"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit" className="btn-primary">
          Recuperar
        </button>

        <button type="button" className="link" onClick={onBack}>
          ¿Regresar a la pantalla de acceso?
        </button>

        {sent && (
          <div className="notice">
            <p className="notice-strong">
              Usted recibirá un correo electrónico con la información necesaria
              para recuperar su contraseña
            </p>
            <p className="notice-muted">
              Si no encuentra el mensaje, le aconsejamos revisar su carpeta de
              correos no deseados
            </p>
          </div>
        )}
      </form>
    </div>
  );
}

export { RecoverView, LoginView };
