import { Routes, Route, Navigate } from "react-router-dom";
import AdminPanel from "./components/AdminPanel.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/main-panel" element={<AdminPanel />} />
      <Route path="*" element={<Navigate to="/main-panel" replace />} />
    </Routes>
  );
}
