import Image from "next/image";
import { useAtom } from "jotai";
import { taskAtom } from "../store";

export default function CompletedTasks({ name, id }) {
  const [tasks, setTasks] = useAtom(taskAtom);

  function handleUncheck(id) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, status: "uncompleted" };
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
      className="list-item text-2xl relative mb-2 line-through opacity-70 before:absolute before:top-2.5 before:left-1 before:h-10 before:w-7 before:bg-[url('/checked.svg')] before:bg-contain before:bg-no-repeat before:content-[''] border-3 pl-8 pt-2 pr-2 pb-0 rounded-lg cursor-pointer"
      onClick={() => handleUncheck(id)}
    >
      <span className="inline-block overflow-hidden text-ellipsis max-w-[150px] sm:max-w-[250px] md:max-w-[350px] lg:max-w-[400px] xl:max-w-[950px]">
        {name}
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
