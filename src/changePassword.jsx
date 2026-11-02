import {
  X,
  Mail,
  ClipboardList,
  KeyRound,
  LogOut,
  CircleUserRound,
} from "lucide-react";
import { closeModal, notify } from "./utils";
import "./styles.css";

//************************************ */
//*CHANGE PASSWORD COMPONENTS
function ChangePassword({
  passwords,
  showPassword,
  setPasswords,
  setShowPassword,
  setModal,
  setToast,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !passwords.old ||
      !passwords.next ||
      !passwords.confirm ||
      passwords.next !== passwords.confirm
    ) {
      notify("Revisa los campos y confirma la nueva contraseña", {
        setToast,
      });
      return;
    }

    notify("Contraseña actualizada (demostración)", { setToast });
    setPasswords({ old: "", next: "", confirm: "" });
  };
  return (
    // <div
    //   className="overlay"
    //   onMouseDown={(e) =>
    //     e.target === e.currentTarget && closeModal({ setModal })
    //   }
    // >
    // <main className="cp-main">
    //   <header className="cp-header">
    //     <h1>Contraseña</h1>

    //     <button
    //       type="button"
    //       className="cp-avatar"
    //       aria-label="Perfil de usuario"
    //     >
    //       <CircleUserRound size={34} />
    //     </button>
    //   </header>
    <section className="cp-content">
      <h2 className="cp-section-title">Cambio de contraseña</h2>
      <form className="cp-form" onSubmit={handleSubmit}>
        <div className="cp-field">
          <label htmlFor="cp-code">Código</label>
          <input
            id="cp-code"
            className="cp-input"
            type="text"
            value="55555"
            readOnly
          />
        </div>

        <div className="cp-field">
          <label htmlFor="cp-name">Nombre Completo</label>
          <input
            id="cp-name"
            className="cp-input"
            type="text"
            value="DIEGO SOLANO TERAN"
            readOnly
          />
        </div>
        {[
          ["old", "Contraseña actual"],
          ["next", "Nueva contraseña"],
          ["confirm", "Confirmar nueva contraseña"],
        ].map(([k, l]) => (
          <div className="cp-field" key={k}>
            <label>{l}</label>
            <input
              className="cp-input"
              type={showPassword ? "text" : "password"}
              value={passwords[k]}
              onChange={(e) =>
                setPasswords((p) => ({ ...p, [k]: e.target.value }))
              }
              placeholder="••••••••"
            />
          </div>
        ))}

        <button type="submit" className="cp-submit">
          Guardar cambios
        </button>
      </form>
    </section>
    // </main>
  );
}

export { ChangePassword };
