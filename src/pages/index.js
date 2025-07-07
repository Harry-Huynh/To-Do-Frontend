import Button from "@/components/Button";
import { useAtom } from "jotai";
import { taskAtom } from "@/store";
import { useState, useEffect } from "react";
import { updateTask, addTask, deleteTask } from "@/lib/userData";
import {
  ColumnDirective,
  ColumnsDirective,
  KanbanComponent,
} from "@syncfusion/ej2-react-kanban";
import Image from "next/image";

export default function Home() {
  const [tasks, setTasks] = useAtom(taskAtom);
  const [taskInput, setTaskInput] = useState("");
  const [editingTask, setEditingTask] = useState();

  useEffect(() => {
    setEditingTask(tasks?.find((task) => task.edit));

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

  const onDrag = async (args) => {
    const task = args.data[0];
    await updateTask(task._id, task.name, task.status, task.edit);
  };

  const dialogClose = async (args) => {
    const task = args.data;
    await updateTask(task._id, task.name, task.status, task.edit);
  };

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

  const cardTemplate = ({ name, _id }) => {
    return (
      <div className="flex flex-row flex-wrap justify-between items-center gap-2">
        <div className="grow font-semibold lg:text-lg text-base pl-2 pr-2 text-ellipsis overflow-hidden">
          {name}
        </div>

        <div className="flex items-center justify-center gap-2 ml-2 mr-2">
          <button
            className="cursor-pointer border-2 border-black rounded-full p-1"
            onClick={() => handleUpdate(_id)}
          >
            <Image src="/edit.svg" alt="edit icon" width={20} height={20} />
          </button>

          <button
            className="cursor-pointer border-2 border-black rounded-full p-1"
            onClick={() => handleDelete(_id)}
          >
            <Image src="/cross.svg" alt="edit icon" width={20} height={20} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="mx-auto xl:max-w-[1200px] max-w-[600px] text-3xl my-10 rounded-2xl transition-all duration-300">
      <h1 className="text-center font-bold mb-5">To-Do List App</h1>

      <div className="shadow-400 border-2 border-white bg-white px-10 py-5 rounded-xl">
        <form id="task-form" onSubmit={handleTask}>
          <fieldset className="fieldset mt-5 rounded-[20px] w-full border-2 p-4 text-2xl">
            <legend className="fieldset-legend">Add to task list</legend>
            <div className="flex gap-4 xl:flex-row flex-col xl:flex-nowrap flex-wrap justify-between">
              <input
                name="task-form"
                type="text"
                className="input border-3 rounded-[10px] grow w-full h-12 text-xl"
                placeholder="Add a task"
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
              />

              {editingTask ? (
                <div className="flex flex-col xl:flex-row xl:flex-nowrap gap-2 w-full xl:w-auto max-w-full">
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
                </div>
              ) : (
                <div className="flex flex-col xl:flex-row xl:flex-nowrap gap-2 w-full xl:w-auto max-w-full">
                  <Button type="submit" name="Add Task" disabled={false} />
                  <Button type="submit" name="Update Task" disabled={true} />
                </div>
              )}
            </div>
          </fieldset>
        </form>

        <KanbanComponent
          id="kanban"
          keyField="status"
          dataSource={tasks}
          allowDragAndDrop={true}
          cardSettings={{
            headerField: "_id",
            showHeader: false,
            template: cardTemplate.bind(this),
          }}
          cssClass="!mt-4"
          dragStop={onDrag}
          dialogClose={dialogClose}
        >
          <ColumnsDirective>
            <ColumnDirective headerText="To Do" keyField="uncompleted" />
            <ColumnDirective headerText="In Progress" keyField="inprogress" />
            <ColumnDirective headerText="Done" keyField="completed" />
          </ColumnsDirective>
        </KanbanComponent>
      </div>
    </div>
  );
}
