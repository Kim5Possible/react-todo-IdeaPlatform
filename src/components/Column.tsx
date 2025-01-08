import React from "react";
import { useDrop, DropTargetMonitor } from "react-dnd";
import { Task as TaskType } from "../context/TodoContext";
import { useTodo } from "../context/TodoContext";
import Task from "./Task";
import TrashDropZone from "./TrashDropZone";

interface ColumnProps {
  type: TaskType["type"];
  title: string;
  img: string;
  tasks: TaskType[];
}

const Column: React.FC<ColumnProps> = ({ type, title, img, tasks }) => {
  const { addEmptyTask, moveTask } = useTodo();
  const columnTasks = tasks.filter((task) => task.type === type);

  // react-dnd
  const [{ isOver }, drop] = useDrop<{ id: number }, void, { isOver: boolean }>(
    {
      accept: "TASK",
      drop: (item: { id: number }) => {
        moveTask(item.id, type);
      },
      collect: (monitor: DropTargetMonitor) => ({
        isOver: monitor.isOver(),
      }),
    }
  );

  return (
    <div
      ref={drop as unknown as React.RefObject<HTMLDivElement>}
      className={`flex-1 max-w-[430px] min-w-[300px] min-h-[200px] bg-bg-black rounded-sm px-4 py-8 ${
        isOver ? "border border-color-blue px-[15px] py-[31px]" : ""
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-text-bold flex gap-2">
          <img src={img} alt="" className="w-6 h-6" /> {title}
        </h2>
        <div className="text-xs">
          {type === "todo" && (
            <button onClick={() => addEmptyTask(type)}>+ Добавить</button>
          )}
          {type === "done" && <TrashDropZone />}
        </div>
      </div>

      <div className="space-y-2">
        {columnTasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default Column;
