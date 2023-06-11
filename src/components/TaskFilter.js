import React from 'react';

const TaskFilter = ({ onFilterChange }) => {
  const handleFilterChange = (e) => {
    const filterValue = e.target.value;
    onFilterChange(filterValue);
  };

  return (
    <div>
      <label htmlFor='filter'>Filter Tasks: </label>
      <select id='filter' onChange={handleFilterChange}>
        <option value='all'>All</option>
        <option value='completed'>Completed</option>
        <option value='incomplete'>Incomplete</option>
      </select>
    </div>
  );
};

export default TaskFilter;
