import Button from "@/components/Button";
import UncompletedTasks from "@/components/UncompletedTasks";
import CompletedTasks from "@/components/CompletedTasks";
import TaskContainer from "@/components/TaskContainer";
import { useAtom } from "jotai";
import { taskAtom } from "@/store";
import { useState, useEffect } from "react";
import { updateTask, addTask } from "@/lib/userData";

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
      const updatedTask = {
        ...editingTask,
        name: taskInput.trim(),
        edit: false,
      };

      setTasks(
        await updateTask(
          updatedTask._id,
          updatedTask.name,
          updatedTask.status,
          updatedTask.edit
        )
      );

      setEditingTask(null);
    } else {
      setTasks(await addTask(taskInput.trim(), "uncompleted", false));
    }
    setTaskInput("");
  }

  return (
    <div className="mx-auto xl:max-w-[1200px] max-w-[600px] bg-[#DADDD8] text-3xl my-10 rounded-2xl transition-all duration-300">
      <div className="p-15">
        <h1 className="text-center font-bold">To-Do List App</h1>

        <form onSubmit={handleTask}>
          <fieldset className="fieldset mt-5 rounded-[20px] w-full border-2 p-4 text-2xl">
            <legend className="fieldset-legend">Add to task list</legend>
            <div className="flex gap-4 xl:flex-nowrap flex-wrap justify-center">
              <input
                type="text"
                className="input border-3 rounded-[10px] grow lg:w-full max-w-[600px] h-12 text-xl"
                placeholder="Add a task"
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
              />

              {editingTask ? (
                <>
                  <Button type="submit" name="Add Task" disabled={true} />
                  <Button type="submit" name="Update Task" disabled={false} />
                  <Button
                    type="button"
                    name="Cancel"
                    disabled={false}
                    onClick={async () => {
                      let updatedTask = tasks.find(
                        (task) => task._id === editingTask._id
                      );

                      updatedTask.edit = false;

                      setTasks(
                        await updateTask(
                          updatedTask._id,
                          updatedTask.name,
                          updatedTask.status,
                          updatedTask.edit
                        )
                      );

                      setEditingTask(null);
                      setTaskInput("");
                    }}
                  />
                </>
              ) : (
                <>
                  <Button type="submit" name="Add Task" disabled={false} />
                  <Button type="submit" name="Update Task" disabled={true} />
                </>
              )}
            </div>
          </fieldset>
        </form>

        {uncompletedTasks?.length > 0 && (
          <TaskContainer name="In Progress Tasks">
            {uncompletedTasks.map((task) => (
              <UncompletedTasks name={task.name} key={task._id} id={task._id} />
            ))}
          </TaskContainer>
        )}

        {completedTasks?.length > 0 && (
          <TaskContainer name="Completed Tasks">
            {completedTasks.map((task) => (
              <CompletedTasks name={task.name} key={task._id} id={task._id} />
            ))}
          </TaskContainer>
        )}
      </div>
    </div>
  );
}
