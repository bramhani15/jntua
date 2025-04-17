import React from "react";

const TodoList = ({ todolist, deleteHandler }) => {
  return (
    <ul>
      {todolist.length === 0 ? (
        <p>No tasks added</p>) : (
        todolist.map((todo, index) => (
          <li key={index} className="flex justify-between items-center p-2 border-b">
            <span>{todo.text}</span>
            <button onClick={() => deleteHandler(index)} className="bg-red-500 text-white px-2 py-1 ml-2 rounded">
              Delete
            </button>
          </li>
        ))
      )}
    </ul>
  );
};

export default TodoList;
