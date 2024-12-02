import { useEffect, useState } from "react";
import { TodoProvider } from "./context/context";
import { TodoType } from "./types/todo";
import TodoForm from "./components/todoForm";
import TodoItem from "./components/todoItem";

function App() {
  const [todos, setTodos] = useState<TodoType[]>([]);

  const addTodo = (todo: TodoType) => {
    setTodos((prevTodo) => [todo, ...prevTodo]);
  };

  const updateTodo = (id: number, todo: TodoType) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)),
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((prevTodo) => prevTodo.id !== id));
  };

  const toggleComplete = (id: number) => {
    setTodos((prevTodo) =>
      prevTodo.map((todoMeta) =>
        todoMeta.id === id
          ? { ...todoMeta, completed: !todoMeta.completed }
          : todoMeta,
      ),
    );
  };

  useEffect(() => {
    const todoString = localStorage.getItem("todos"); 
    const todos = todoString ? JSON.parse(todoString) : []; 
    if(todos && todos.length > 0){
      setTodos(todos); 
    }
  }, []);

  useEffect(()=>{
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [ todos ]);

  return (
    <>
      <TodoProvider
        value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
      >
        <div className="bg-[#172842] min-h-screen py-8">
          <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
            <h1 className="text-2xl font-bold text-center mb-8 mt-2">
              Manage Your Todos
            </h1>
            <div className="mb-4">
              {/* Todo form goes here */}
              <TodoForm />
            </div>
            <div className="flex flex-wrap gap-y-3">
              {todos.map((todo) => (
                <div key={todo.id}>
                  <TodoItem todo={todo} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </TodoProvider>
    </>
  );
}

export default App;
