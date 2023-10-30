// TodoList.jsx
import "./TodoList.css";
import { BsFillTrashFill, BsPencilFill } from "react-icons/bs";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  removeTodo,
  toggleComplete,
  editTodo,
  setFilter,
} from "./redux/todoList/todoSlice";

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.items);
  const filter = useSelector((state) => state.todos.filter);
  const [inputValue, setInputValue] = useState("");
  const [editableItemId, setEditableItemId] = useState(null);
  const [editableItemTitle, setEditableItemTitle] = useState("");

  const filteredTodos =
    filter === "All"
      ? todos
      : filter === "Complete"
      ? todos.filter((todo) => todo.completedStatus)
      : todos.filter((todo) => !todo.completedStatus);

  const generateRandomColor = () => {
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    return randomColor;
  };

  const handleAddTodo = () => {
    if (inputValue) {
      const randomColor = generateRandomColor();
      const newTodo = {
        id: Date.now(),
        title: inputValue,
        completedStatus: false,
        backgroundColor: randomColor, // Menambahkan properti backgroundColor ke objek todo
      };
      dispatch(addTodo(newTodo));
      setInputValue("");
    }
  };

  const handleRemoveTodo = (id) => {
    dispatch(removeTodo(id));
  };

  const handleToggleComplete = (id, completedStatus) => {
    dispatch(toggleComplete({ id, completedStatus: !completedStatus }));
  };

  const handleEditClick = (id, title) => {
    setEditableItemId(id);
    setEditableItemTitle(title); // Set the editableItemTitle to the current title
  };

  const handleEditTodo = (id, newTitle) => {
    dispatch(editTodo({ id, title: newTitle }));
    setEditableItemId(null);
    setEditableItemTitle(""); // Clear the editableItemTitle after saving
  };

  const handleFilter = (filterType) => {
    dispatch(setFilter(filterType));
  };

  return (
    <>
      <div className="d-flex">
        <input
          className="form-control me-4"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button className="btn btn-primary fw-bold" onClick={handleAddTodo}>
          ADD TODO
        </button>
      </div>
      <div className="">
        <button
          className="me-3 mt-3 btn btn-secondary rounded-pill"
          onClick={() => handleFilter("All")}
        >
          All
        </button>
        <button
          className="me-3 mt-3 btn btn-secondary rounded-pill"
          onClick={() => handleFilter("Complete")}
        >
          Complete
        </button>
        <button
          className="me-3 mt-3 btn btn-secondary rounded-pill"
          onClick={() => handleFilter("Incomplete")}
        >
          Incomplete
        </button>
      </div>
      <div>
        {filteredTodos.map((todo) => (
          <div
            key={todo.id}
            className="card p-3 my-4"
            style={{ backgroundColor: todo.backgroundColor }}
          >
            {todo.id === editableItemId ? (
              <div>
                <div className="col d-flex justify-content-between">
                  <input
                    className="custom-input"
                    type="text"
                    value={editableItemTitle}
                    onChange={(e) => setEditableItemTitle(e.target.value)}
                  />
                  <div>
                    <button
                      className="btn btn-primary me-2"
                      onClick={() => handleEditTodo(todo.id, editableItemTitle)}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => setEditableItemId(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="col d-flex justify-content-between">
                <div className="col-md d-flex align-items-center">
                  <input
                    className="checkbox-size"
                    type="checkbox"
                    checked={todo.completedStatus}
                    onChange={() =>
                      handleToggleComplete(todo.id, todo.completedStatus)
                    }
                  />
                  <span
                    className="text fs-5 ms-2"
                    style={{
                      textDecoration: todo.completedStatus
                        ? "line-through"
                        : "none",
                    }}
                  >
                    {todo.title}
                  </span>
                </div>
                <div className="todo-button">
                  <BsPencilFill
                    className="mx-2 icon-btn-custom icon-edit"
                    onClick={() => handleEditClick(todo.id, todo.title)}
                  >
                    Edit
                  </BsPencilFill>
                  <BsFillTrashFill
                    className="mx-2 icon-btn-custom icon-delete"
                    onClick={() => handleRemoveTodo(todo.id)}
                  >
                    Delete
                  </BsFillTrashFill>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default TodoList;
