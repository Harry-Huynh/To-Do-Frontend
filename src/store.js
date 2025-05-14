import { atom } from "jotai";

export const taskAtom = atom([
  { id: 1, status: "completed", name: "Task 1", edit: false },
  { id: 2, status: "uncompleted", name: "Task 2", edit: false },
  { id: 3, status: "completed", name: "Task 3", edit: false },
  { id: 4, status: "uncompleted", name: "Task 4", edit: false },
]);
