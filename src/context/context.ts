import { createContext, useContext } from "react";
import { TodoContextType } from "../types/todo";

export const TodoContext = createContext<TodoContextType | null>({
  todos: [
    {
      id: Date.now(),
      todo: "todo",
      completed: false,
    },
  ],
  addTodo: () => { },
  updateTodo: () => { },
  deleteTodo: () => { },
  toggleComplete:() => {}
});

export const TodoProvider = TodoContext.Provider;

export const useTodo = () => {
  const context = useContext(TodoContext);
  if(!context) {
    throw new Error("useTodo must be used within a TodoProvider");
  }
  
  return context; 
};
