import React from "react";
import { useState } from "react";
import ATodo from "./ATodo";
import ATodoForm from "./ATodoForm";

function ATodoList() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    const newTodos = [todo, ...todos];
    setTodos(newTodos);
    console.log(todo, ...todos);
  };

  const updateTodo = (todoId, newValue) => {
    setTodos((previous) =>
      previous.map((item) => (item.id === todoId ? newValue : item))
    );
  };

  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const removeTodo = (id) => {
    const removeArr = [...todos].filter((todo) => todo.id !== id);
    setTodos(removeArr);
  };

  return (
    <div>
      <h1>Placeholder</h1>
      <ATodoForm onSubmit={addTodo} />
      <ATodo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </div>
  );
}

export default ATodoList;
