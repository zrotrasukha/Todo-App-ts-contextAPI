export type TodoType = {
  id: number;
  todo: string;
  completed: boolean;
};
export type TodoContextType = {
  todos: TodoType[];
  addTodo: (todo: TodoType) => void;
  updateTodo: (id: number, todo: TodoType) => void;
  deleteTodo: (id: number) => void;
  toggleComplete: (id: number) => void;
};
