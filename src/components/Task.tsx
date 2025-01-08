import React, { useState } from "react";
import { useDrag } from "react-dnd";
import { Task as TaskType, useTodo } from "../context/TodoContext";
import editIcon from "../../public/assets/icons/edit.svg";
import crossIcon from "../../public/assets/icons/cross.svg";
import checkIcon from "../../public/assets/icons/check.svg";

interface TaskProps {
  task: TaskType;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  // bolean to check if the task is overdue
  const isOverdue =
    task.type !== "done" && (task.endDay ? task.endDay < Date.now() : false);

  const { updateTask, editingTaskId, setEditingTaskId, formatDate } = useTodo();
  const [editedText, setEditedText] = useState(task.text);
  const [editedStartDate, setEditedStartDate] = useState<number | null>(
    task.startDay
  );
  const [editedEndDate, setEditedEndDate] = useState<number | null>(
    task.endDay
  );

  const isEditing = editingTaskId === task.id;

  // Function to handle task editing
  const handleEdit = () => {
    setEditingTaskId(task.id);
  };

  // Function to handle task saving
  const handleSave = () => {
    updateTask(task.id, {
      text: editedText,
      startDay: editedStartDate,
      endDay: editedEndDate,
    });
    setEditingTaskId(null);
  };

  // Function to undo task editing
  const handleCancel = () => {
    setEditedText(task.text);
    setEditedStartDate(task.startDay);
    setEditedEndDate(task.endDay);
    setEditingTaskId(null);
  };

  // react-dnd
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={
        !isEditing ? (drag as unknown as React.RefObject<HTMLDivElement>) : null
      }
      className={`p-4 mb-3 group pb-14 ${
        !isEditing ? "hover:pb-4" : "pb-4"
      } flex flex-col gap-2 text-sm bg-bg-gray rounded shadow-[0px_5px_5px_2px_rgba(0,0,0,0.1)] cursor-grab
      `}
    >
      <div className="flex items-center">
        Начало:{" "}
        {isEditing ? (
          <input
            type="date"
            value={
              editedStartDate
                ? new Date(editedStartDate).toISOString().split("T")[0]
                : ""
            }
            className="ml-1 bg-bg-gray border rounded-sm focus:outline-none focus:ring-2 focus:ring-color-blue"
            onChange={(e) =>
              setEditedStartDate(
                e.target.value ? new Date(e.target.value).getTime() : null
              )
            }
          />
        ) : (
          <span className="ml-2 font-bold text-text-bold">
            {task.startDay && formatDate(task.startDay)}
          </span>
        )}
      </div>
      <p>
        Окончание:{" "}
        {isEditing ? (
          <input
            type="date"
            value={
              editedEndDate
                ? new Date(editedEndDate).toISOString().split("T")[0]
                : ""
            }
            className="ml-1 bg-bg-gray border rounded-sm focus:outline-none focus:ring-2 focus:ring-color-blue"
            onChange={(e) =>
              setEditedEndDate(
                e.target.value ? new Date(e.target.value).getTime() : null
              )
            }
          />
        ) : (
          <span
            className={`ml-2 font-bold ${
              isOverdue ? "text-color-red" : "text-text-bold"
            }`}
          >
            {task.endDay && formatDate(task.endDay)}
          </span>
        )}
      </p>
      <p>
        Описание:{" "}
        {isEditing ? (
          <input
            type="text"
            value={editedText}
            className="ml-1 bg-bg-gray px-2 py-1 border rounded-sm focus:outline-none focus:ring-2 focus:ring-color-blue"
            onChange={(e) => setEditedText(e.target.value)}
          />
        ) : (
          <span className="ml-2 font-bold text-text-bold break-all">
            {task.text}
          </span>
        )}
      </p>
      {isEditing ? (
        <div className="self-end">
          <button onClick={handleSave}>
            <img
              src={checkIcon}
              className="w-8 p-2 bg-bg-light-gray rounded-full"
              alt=""
            />
          </button>
          <button onClick={handleCancel}>
            <img
              src={crossIcon}
              className="w-8 p-2 bg-bg-light-gray rounded-full"
              alt=""
            />
          </button>
        </div>
      ) : (
        <button
          onClick={handleEdit}
          className="self-end hidden group-hover:block "
        >
          <img
            src={editIcon}
            className="w-8 p-2 bg-bg-light-gray rounded-full"
            alt=""
          />
        </button>
      )}
    </div>
  );
};

export default Task;
