import Button from "@/components/Button";
import UncompletedTasks from "@/components/UncompletedTasks";
import CompletedTasks from "@/components/CompletedTasks";
import TaskContainer from "@/components/TaskContainer";
import { useAtom } from "jotai";
import { taskAtom } from "@/store";
import { useState, useEffect } from "react";

export default function Home() {
  const [tasks, setTasks] = useAtom(taskAtom);
  const [taskInput, setTaskInput] = useState("");
  const [editingTask, setEditingTask] = useState();
  const [completedTasks, setCompletedTasks] = useState([]);
  const [uncompletedTasks, setUncompletedTasks] = useState([]);

  useEffect(() => {
    setEditingTask(tasks?.find((task) => task.edit));
    setCompletedTasks(tasks?.filter((task) => task.status === "completed"));
    setUncompletedTasks(tasks?.filter((task) => task.status === "uncompleted"));

    if (editingTask) {
      setTaskInput(editingTask.name);
    }
  }, [tasks, editingTask]);

  async function handleTask(event) {
    event.preventDefault();

    if (!taskInput) {
      return;
    }

    if (editingTask) {
      const updatedTasks = tasks.map((task) =>
        task.id === editingTask.id
          ? { ...task, name: taskInput.trim(), edit: false }
          : task
      );
      await setTasks(updatedTasks);
    } else {
      await setTasks([
        ...tasks,
        {
          id: tasks.length + 1,
          status: "uncompleted",
          name: taskInput.trim(),
          edit: false,
        },
      ]);
    }
    setTaskInput("");
    console.log(tasks);
  }

  return (
    <div className="mx-auto xl:max-w-[1200px] max-w-[600px] bg-[#DADDD8] text-3xl my-10 rounded-2xl">
      <div className="p-15">
        <h1 className="text-center font-bold">To-Do List App</h1>

        <form onSubmit={handleTask}>
          <fieldset className="fieldset mt-5 rounded-[20px] w-full border-2 p-4 text-2xl">
            <legend className="fieldset-legend">Add to task list</legend>
            <div className="flex gap-4 xl:flex-nowrap flex-wrap justify-center">
              <input
                type="text"
                className="input border-3 rounded-[10px] grow lg:w-full max-w-[700px] h-12 text-xl"
                placeholder="Add a task"
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
              />

              {editingTask ? (
                <>
                  <Button
                    type="submit"
                    name="Add Task"
                    className="w-full shrink"
                    disabled={true}
                  />
                  <Button
                    type="submit"
                    name="Update Task"
                    className="w-full shrink"
                    disabled={false}
                  />
                  <Button
                    type="button"
                    name="Cancel"
                    className="w-fit shrink"
                    disabled={false}
                    onClick={() => {
                      const resetTasks = tasks.map((task) =>
                        task.id === editingTask.id
                          ? { ...task, edit: false }
                          : task
                      );
                      setTasks(resetTasks);
                    }}
                  />
                </>
              ) : (
                <>
                  <Button
                    type="submit"
                    name="Add Task"
                    className="w-full shrink"
                    disabled={false}
                  />
                  <Button
                    type="submit"
                    name="Update Task"
                    className="w-full shrink"
                    disabled={true}
                  />
                </>
              )}
            </div>
          </fieldset>
        </form>

        {uncompletedTasks?.length > 0 && (
          <TaskContainer name="In Progress Tasks">
            {uncompletedTasks.map((task) => (
              <UncompletedTasks name={task.name} key={task.id} id={task.id} />
            ))}
          </TaskContainer>
        )}

        {completedTasks?.length > 0 && (
          <TaskContainer name="Completed Tasks">
            {completedTasks.map((task) => (
              <CompletedTasks name={task.name} key={task.id} id={task.id} />
            ))}
          </TaskContainer>
        )}
      </div>
    </div>
  );
}
