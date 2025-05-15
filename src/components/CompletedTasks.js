import Image from "next/image";
import { useAtom } from "jotai";
import { taskAtom } from "../store";
import { updateTask, deleteTask } from "@/lib/userData";

export default function CompletedTasks({ name, id }) {
  const [tasks, setTasks] = useAtom(taskAtom);

  async function handleUncheck(id) {
    let updatedTask = tasks.find((task) => task._id === id);

    updatedTask.status = "uncompleted";

    setTasks(
      await updateTask(
        updatedTask._id,
        updatedTask.name,
        updatedTask.status,
        updatedTask.edit
      )
    );
    console.log(tasks);
  }

  async function handleDelete(id) {
    setTasks(await deleteTask(id));
  }

  return (
    <li
      className="list-item text-sm sm:text-base md:text-2xl relative mb-2 before:absolute before:top-2.5 before:left-1 before:h-10 before:w-5 before:sm:w-6 before:md:w-7 before:bg-[url('/checked.svg')] before:bg-contain before:bg-no-repeat before:content-[''] border-3 pl-8 pt-2 pr-2 pb-0 rounded-lg cursor-pointer"
      onClick={() => handleUncheck(id)}
    >
      <span className="inline-block overflow-hidden mt-0.5 -ml-1 md:mt-0 text-ellipsis md:ml-1 max-w-[150px] sm:max-w-[310px] md:max-w-[310px] lg:max-w-[320px] xl:max-w-[900px]">
        {name}
      </span>
      <span
        className="flex items-center justify-center absolute top-2 right-1 h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-10 hover:bg-white transition-all duration-300 cursor-pointer border-3 rounded-lg"
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
