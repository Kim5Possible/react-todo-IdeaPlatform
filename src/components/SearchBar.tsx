import React from "react";
import { useTodo } from "../context/TodoContext";
import searchIcon from "../../public/assets/icons/search.svg";

const SearchBar: React.FC = () => {
  const { filterTasks, searchTerm, setSearchTerm } = useTodo();
  const filteredTasks = filterTasks(searchTerm);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="mb-[58px] flex flex-wrap justify-between items-center">
      <h1 className="text-2xl font-bold text-text-bold mb-2">Your tasks</h1>
      <div className="relative">
        <img
          src={searchIcon}
          alt="search"
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6"
        />
        <input
          type="text"
          placeholder="поиск..."
          className="w-[430px] bg-bg-gray pl-10 pr-4 py-1.5 border rounded-full focus:outline-none focus:ring-2 focus:ring-color-blue"
          value={searchTerm}
          onChange={handleSearch}
        />
        {searchTerm && (
          <button
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-bold hover:text-color-red"
            onClick={() => setSearchTerm("")}
          >
            ×
          </button>
        )}
        {searchTerm && (
          <div className="absolute top-full right-5 mt-2 text-sm text-text-regular">
            Found {filteredTasks.length} tasks
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
