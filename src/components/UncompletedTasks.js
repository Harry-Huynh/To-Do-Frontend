import Image from "next/image";
import { useAtom } from "jotai";
import { taskAtom } from "../store";
import { updateTask, deleteTask } from "@/lib/userData";

export default function UncompletedTasks({ name, id }) {
  const [tasks, setTasks] = useAtom(taskAtom);

  async function handleComplete(id) {
    let updatedTask = tasks.find((task) => task._id === id);

    updatedTask.status = "completed";

    setTasks(
      await updateTask(
        updatedTask._id,
        updatedTask.name,
        updatedTask.status,
        updatedTask.edit
      )
    );
  }

  async function handleUpdate(id) {
    let updatedTask = tasks.find((task) => task._id === id);

    updatedTask.edit = true;

    setTasks(
      await updateTask(
        updatedTask._id,
        updatedTask.name,
        updatedTask.status,
        updatedTask.edit
      )
    );
  }

  async function handleDelete(id) {
    setTasks(await deleteTask(id));
  }

  return (
    <li
      className="list-item text-2xl relative mb-2 before:absolute before:top-2.5 before:left-1 before:h-10 before:w-7 before:bg-[url('/unchecked.svg')] before:bg-contain before:bg-no-repeat before:content-[''] border-3 pl-8 pt-2 pr-2 pb-0 rounded-lg cursor-pointer"
      onClick={() => handleComplete(id)}
    >
      <span className="inline-block overflow-hidden text-ellipsis ml-1 max-w-[150px] sm:max-w-[250px] md:max-w-[350px] lg:max-w-[400px] xl:max-w-[900px]">
        {name}
      </span>

      <span
        className="flex items-center justify-center absolute top-2 right-11 h-8 w-10 hover:bg-white transition-all duration-300 cursor-pointer border-3 rounded-lg"
        id="edit"
        onClick={(e) => {
          e.stopPropagation();
          handleUpdate(id);
        }}
      >
        <Image src="/edit.svg" alt="edit" width={25} height={25} />
      </span>

      <span
        className="flex items-center justify-center absolute top-2 right-1 h-8 w-9 hover:bg-white transition-all duration-300 cursor-pointer border-3 rounded-lg"
        id="cross"
        onClick={(e) => {
          e.stopPropagation();
          handleDelete(id);
        }}
      >
        <Image src="/cross.svg" alt="cross" width={20} height={20} />
      </span>
    </li>
  );
}
