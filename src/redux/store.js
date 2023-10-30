// store.js
import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./todoList/todoSlice";

const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
});

export default store;
