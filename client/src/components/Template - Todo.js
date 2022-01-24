import React from "react";
import { useState } from "react";
import ATodoForm from "./ATodoForm";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";

function ATodo({ todos, updateTodo, completeTodo, removeTodo }) {
  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });

  const submitUpdate = (value) => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: "",
    });
  };

  if (edit.id) {
    return <ATodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  return todos.map((todo, index) => (
    // !!create function check if todo is completed/change a completed todo!!!
    <div
      className={todo.isComplete ? "todo-row complete" : "todo-row"}
      key={index}
    >
      <div key={todo.id} onClick={() => completeTodo(todo.id)}>
        {todo.text}
      </div>
      <button onClick={() => removeTodo(todo.id)}>Delete</button>
      <button onClick={() => setEdit({ id: todo.id, value: todo.text })}>
        Edit
      </button>
      {/* <div className="icons">
        <RiCloseCircleLine />
        <TiEdit />
      </div> */}
    </div>
  ));
}

export default ATodo;
