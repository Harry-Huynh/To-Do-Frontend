import Image from "next/image";
import { useAtom } from "jotai";
import { taskAtom } from "../store";

export default function UncompletedTasks({ name, id }) {
  const [tasks, setTasks] = useAtom(taskAtom);

  function handleComplete(id) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, status: "completed" };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function handleUpdate(id) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, edit: true };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function handleDelete(id) {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  }

  return (
    <li
      className="list-item text-2xl relative mb-2 before:absolute before:top-2.5 before:left-1 before:h-10 before:w-7 before:bg-[url('/unchecked.svg')] before:bg-contain before:bg-no-repeat before:content-[''] border-3 pl-8 pt-2 pr-2 pb-0 rounded-lg cursor-pointer"
      onClick={() => handleComplete(id)}
    >
      <span className="inline-block overflow-hidden text-ellipsis max-w-[150px] sm:max-w-[250px] md:max-w-[350px] lg:max-w-[400px] xl:max-w-[900px]">
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
