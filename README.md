# emailUPB · Panel de administración

Interfaz de administración académica hecha con React + Vite, basada en las referencias visuales adjuntas.

## Requisitos
- Node.js 18 o superior
- npm

## Ejecutar en local
```bash
npm install
npm run dev
```
Vite mostrará una dirección local (normalmente `http://localhost:5173`).

## Compilar para producción
```bash
npm run build
npm run preview
```

## Funcionalidades de demostración
- Panel de solicitudes con búsqueda, filtros por estado, selección múltiple y eliminación.
- Flujo de tres pasos para crear/seleccionar programa, crear/seleccionar curso e inscribir estudiantes.
- Verificación de código de estudiante y confirmación antes de agregar. Los datos de estudiantes son de demostración; los códigos `55555`, `12345` y `67890` muestran nombres de ejemplo.
- Generación y descarga de un reporte PDF.
- Modal para cambiar contraseña (simulado, sin conexión a un backend).

Los datos se mantienen en el estado de React durante la sesión. Para producción, conecta los formularios y acciones a la API y base de datos de tu institución.
