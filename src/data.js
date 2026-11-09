export const USER = { code: "55555", name: "DIEGO SOLANO TERAN" };

export const STUDENTS = [
  { code: "55555", name: "Diego Solano" },
  { code: "44444", name: "Sophia Wilson" },
  { code: "33333", name: "Robert Safari" },
  { code: "22222", name: "Pedro Morales" },
];

const L = "Lorem ipsum dolor sit amet consectetur";
const P1 = "Diplomado en seguridad informática";
const P2 = "Maestría en ciencia de datos";
const mk = (id, student, code, desc, date, status, program, module) => ({
  id,
  student,
  code,
  type: "Tipo de solicitud",
  desc,
  date,
  status,
  program,
  module,
});

export const initialRequests = [
  mk(
    1,
    "Sophia Wilson",
    "44444",
    "Descripción",
    "17 ago",
    "pending",
    P1,
    "Criptografía",
  ),
  mk(2, "Sophia Wilson", "44444", L, "24 sep", "pending", P1, "Criptografía"),
  mk(3, "Sophia Wilson", "44444", L, "15 jun", "answered", P1, "Redes"),
  mk(4, "Sophia Wilson", "44444", L, "21 mar", "answered", P2, "Estadística"),
  mk(5, "Robert Safari", "33333", L, "28 mar", "answered", P2, "Estadística"),
  mk(6, "Pedro Morales", "22222", L, "12 feb", "pending", P2, "Estadística"),
  mk(7, "Diego Solano", "55555", L, "01 ene", "answered", P1, "Redes"),
  mk(8, "Pedro Morales", "22222", L, "05 may", "answered", P1, "Criptografía"),
  mk(9, "Robert Safari", "33333", L, "03 ene", "pending", P1, "Redes"),
];

export const initialPrograms = [
  {
    id: 1,
    name: P1,
    modules: [
      {
        id: 11,
        name: "Criptografía",
        start: "2025-01-10",
        end: "2025-03-10",
        students: [STUDENTS[0], STUDENTS[1]],
      },
      {
        id: 12,
        name: "Redes",
        start: "2025-03-15",
        end: "2025-05-15",
        students: [STUDENTS[0]],
      },
    ],
  },
  {
    id: 2,
    name: P2,
    modules: [
      {
        id: 21,
        name: "Estadística",
        start: "2025-02-01",
        end: "2025-04-01",
        students: [STUDENTS[2], STUDENTS[3]],
      },
    ],
  },
];
