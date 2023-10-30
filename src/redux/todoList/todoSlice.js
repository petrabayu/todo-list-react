// todosSlice.js
import { createSlice, createAction } from "@reduxjs/toolkit";

const setFilter = createAction("todos/setFilter");
const setTodos = createAction("todos/setTodos");

const initialState = {
  items: [],
  filter: "All",
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    //addTodo fungsi untuk menambahkan list baru todo-list
    addTodo: (state, action) => {
      state.items.push(action.payload);
    },
    //removeTodo fungsi untuk menghapus list todo-list
    removeTodo: (state, action) => {
      state.items = state.items.filter((todo) => todo.id !== action.payload);
    },
    //toggleComplete fungsi untuk memberi checkmark sudah dikerjakan atau belum todo-list
    toggleComplete: (state, action) => {
      const { id, completedStatus } = action.payload;
      const existingTodo = state.items.find((todo) => todo.id === id);
      if (existingTodo) {
        existingTodo.completedStatus = completedStatus;
      }
    },
    editTodo: (state, action) => {
      const { id, title } = action.payload;
      const existingTodo = state.items.find((todo) => todo.id === id);
      if (existingTodo) {
        existingTodo.title = title;
      }
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setTodos: (state, action) => {
      state.items = action.payload;
    },
  },
});

export { setFilter, setTodos };
export const { addTodo, removeTodo, toggleComplete, editTodo } =
  todosSlice.actions;
export default todosSlice.reducer;
