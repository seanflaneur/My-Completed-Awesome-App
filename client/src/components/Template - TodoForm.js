import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

function ATodoForm(data) {
  const [input, setInput] = useState(data.edit ? data.edit.value : "");

  const inputFocus = useRef(null);
  useEffect(() => {
    inputFocus.current.focus();
  });

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    data.onSubmit({
      id: Math.floor(Math.random() * 100000),
      text: input,
    });

    setInput("");
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      {data.edit ? (
        <>
          <input
            type="text"
            placeholder="Update Item"
            value={input}
            name="text"
            className="todo-input edit"
            onChange={handleChange}
            ref={inputFocus}
          />
          <button className="todo-button edit">Add todo</button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Add Item"
            value={input}
            name="text"
            className="todo-input"
            onChange={handleChange}
            ref={inputFocus}
          />
          <button className="todo-button">Add todo</button>
        </>
      )}
    </form>
  );
}

export default ATodoForm;
