
import React, { useState, useRef, useEffect } from 'react';
import { Todo } from '../types';
import { EditIcon, DeleteIcon, CheckIcon } from './icons';

interface TodoItemProps {
  todo: Todo;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (id: string, text: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, toggleTodo, deleteTodo, updateTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleUpdate = () => {
    if (editText.trim()) {
      updateTodo(todo.id, editText.trim());
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleUpdate();
    } else if (e.key === 'Escape') {
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  return (
    <li className="flex items-center p-3 transition-colors duration-200 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 group">
      <div className="flex items-center flex-grow">
        <div 
            className={`relative flex items-center justify-center w-6 h-6 mr-4 rounded-full cursor-pointer transition-all duration-300 ${todo.completed ? 'bg-indigo-500 border-indigo-500' : 'bg-transparent border-2 border-gray-300 dark:border-gray-500'}`}
            onClick={() => toggleTodo(todo.id)}
        >
          {todo.completed && <CheckIcon />}
        </div>

        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleUpdate}
            onKeyDown={handleKeyDown}
            className="flex-grow bg-transparent focus:outline-none dark:text-white"
          />
        ) : (
          <span
            className={`flex-grow cursor-pointer ${todo.completed ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-800 dark:text-gray-200'}`}
            onDoubleClick={() => setIsEditing(true)}
          >
            {todo.text}
          </span>
        )}
      </div>
      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button
          onClick={() => setIsEditing(true)}
          className="text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400"
          aria-label="Edit task"
        >
          <EditIcon />
        </button>
        <button
          onClick={() => deleteTodo(todo.id)}
          className="text-gray-400 hover:text-red-500 dark:hover:text-red-400"
          aria-label="Delete task"
        >
          <DeleteIcon />
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
