import React, { useState } from "react";

function TodoList() {
  const [todos, setTodos] = useState(["react", "man"]);

  const addTodo = (event, hello) => {
    event.preventDefault();
    let oldTodos = [...todos];
    oldTodos.push(event.target.firstData.value);
    setTodos(oldTodos);
  };

  const deleteTodo = (index) => {
    // let collection=[... todos]
    let updatedcollection = todos.filter((element, ind) => {
      return ind != index;
    });
    setTodos(updatedcollection);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-gray-200 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <form className="mb-4" onSubmit={addTodo}>
        <div className="flex">
          <input
            type="text"
            placeholder="Add new todo"
            className="w-full rounded-l-md border-gray-300 border-2 p-2 focus:outline-none focus:border-blue-500"
            name="firstData"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 rounded-r-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Add Todo
          </button>
        </div>
      </form>
      <ul>
        {todos.map((todo, index) => {
          return (
            <>
              <div key={index}>
                <li className="bg-white p-2 mb-2 rounded-md shadow">{todo}</li>
                <button
                  onClick={() => deleteTodo(index)}
                  className="bg-blue-500 text-white px-4 rounded-r-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                  Delete
                </button>
              </div>
            </>
          );
        })}
      </ul>
    </div>
  );
}

export default TodoList;
