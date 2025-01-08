import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Board from "./components/Board";
import SearchBar from "./components/SearchBar";
import { TodoProvider } from "./context/TodoContext";

export default function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <TodoProvider>
        <div className="p-1 lg:p-4 text-text-regular">
          <SearchBar />
          <Board />
        </div>
      </TodoProvider>
    </DndProvider>
  );
}
