import React, { useState, useMemo } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Todo, FilterType } from './types';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';
import TodoFilter from './components/TodoFilter';

const App: React.FC = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [filter, setFilter] = useState<FilterType>(FilterType.ALL);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
    };
    setTodos([newTodo, ...todos]);
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
  
  const updateTodo = (id: string, text: string) => {
    setTodos(
        todos.map(todo => 
            todo.id === id ? { ...todo, text } : todo
        )
    );
  };

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case FilterType.ACTIVE:
        return todos.filter(todo => !todo.completed);
      case FilterType.COMPLETED:
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  const activeTodoCount = useMemo(() => todos.filter(todo => !todo.completed).length, [todos]);

  return (
    <div className="min-h-screen font-sans text-gray-800 dark:text-gray-200 transition-colors duration-300">
      <div className="container mx-auto p-4 sm:p-6 md:p-8 max-w-2xl">
        <header className="text-center my-8">
          <h1 className="text-5xl font-extrabold text-gray-800 dark:text-white tracking-tight">
            My Daily Task
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 mt-2">
            A simple yet powerful way to organize your tasks.
          </p>
        </header>

        <main className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-6">
          <TodoForm addTodo={addTodo} />
          
          <div className="border-t border-gray-200 dark:border-gray-700 my-4"></div>
          
          <div className="flex justify-between items-center mb-4 px-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">
                {activeTodoCount} {activeTodoCount === 1 ? 'item' : 'items'} left
            </span>
            <TodoFilter currentFilter={filter} setFilter={setFilter} />
          </div>

          <ul className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
            {filteredTodos.length > 0 ? (
                filteredTodos.map(todo => (
                    <TodoItem
                    key={todo.id}
                    todo={todo}
                    toggleTodo={toggleTodo}
                    deleteTodo={deleteTodo}
                    updateTodo={updateTodo}
                    />
                ))
            ) : (
              <li className="p-4 text-center text-gray-500 dark:text-gray-400">
                {filter === FilterType.COMPLETED ? "No completed tasks." : "You're all caught up!"}
              </li>
            )}
          </ul>
        </main>

        <footer className="text-center mt-8 text-gray-400 dark:text-gray-500 text-sm">
          <p>Double-click a to-do to edit it.</p>
          <p>Built with React, TypeScript, and Tailwind CSS.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;