import React from "react";
import { useDrop } from "react-dnd";
import { useTodo } from "../context/TodoContext";
import trashIcon from "../../public/assets/icons/trash.svg";

const TrashDropZone: React.FC = () => {
  const { deleteTask, deleteDoneTasks } = useTodo();

  // react-dnd
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "TASK",
    drop: (item: { id: number }) => {
      deleteTask(item.id);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <button
      ref={drop as unknown as React.RefObject<HTMLButtonElement>}
      className={`p-2 rounded-full transition-colors ${
        isOver ? "bg-bg-light-gray" : "hover:bg-bg-light-gray"
      }`}
      onClick={deleteDoneTasks}
    >
      <img src={trashIcon} alt="Delete" className="w-6 h-6" />
    </button>
  );
};

export default TrashDropZone;
