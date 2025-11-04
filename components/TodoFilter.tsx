
import React from 'react';
import { FilterType } from '../types';

interface TodoFilterProps {
  currentFilter: FilterType;
  setFilter: (filter: FilterType) => void;
}

const FILTERS = [
    { label: 'All', value: FilterType.ALL },
    { label: 'Active', value: FilterType.ACTIVE },
    { label: 'Completed', value: FilterType.COMPLETED }
];

const TodoFilter: React.FC<TodoFilterProps> = ({ currentFilter, setFilter }) => {
  return (
    <div className="flex justify-center gap-2 mb-4">
      {FILTERS.map(({ label, value }) => (
        <button
          key={value}
          onClick={() => setFilter(value)}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 focus:ring-indigo-500 ${
            currentFilter === value
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default TodoFilter;
