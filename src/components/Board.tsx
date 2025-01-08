import React from "react";
import Column from "./Column";
import { useTodo } from "../context/TodoContext";
import todoIcon from "../../public/assets/icons/bxs_happy-alt.svg";
import inProgressIcon from "../../public/assets/icons/bxs_smile.svg";
import reviewIcon from "../../public/assets/icons/bxs_upside-down.svg";
import doneIcon from "../../public/assets/icons/bxs_ghost.svg";

const columns = [
  { type: "todo", img: todoIcon, title: "To Do" },
  {
    type: "in_progress",
    img: inProgressIcon,
    title: "In Progress",
  },
  { type: "review", img: reviewIcon, title: "Review" },
  { type: "done", img: doneIcon, title: "Done" },
] as const;

const Board: React.FC = () => {
  // Filter tasks based on the search term
  const { searchTerm, filterTasks } = useTodo();
  const filteredTasks = filterTasks(searchTerm);

  return (
    <div className="flex flex-col items-center sm:grid sm:grid-cols-2 sm:items-start lg:grid-cols-4 gap-4">
      {columns.map(({ type, title, img }) => (
        <Column
          key={type}
          type={type}
          title={title}
          img={img}
          tasks={filteredTasks
            .filter((task) => task.type === type)
            .sort((a, b) => {
              if (a.startDay && !b.startDay) {
                return -1;
              } else if (!a.startDay && b.startDay) {
                return 1;
              } else if (a.startDay && b.startDay) {
                return a.startDay - b.startDay;
              } else {
                return 0;
              }
            })}
        />
      ))}
    </div>
  );
};

export default Board;
