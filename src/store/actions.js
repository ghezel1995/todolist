export const fetchTasksSuccess = (tasks) => ({
  type: 'FETCH_TASKS_SUCCESS',
  payload: tasks,
});

export const fetchTasks = () => {
  return (dispatch) => {
    return fetch('http://localhost:8000/todos')
      .then((response) => response.json())
      .then((data) => dispatch(fetchTasksSuccess(data)));
  };
};

export const addTask = (task) => {  return (dispatch) => {
    return fetch('http://localhost:8000/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    })
      .then((response) => response.json())
      .then(() => dispatch(fetchTasks()));
  };
};

export const deleteTask = (taskId) => {
  return (dispatch) => {
    return fetch(`http://localhost:8000/todos/${taskId}`, {
      method: 'DELETE',
    }).then(() => dispatch(fetchTasks()));
  };
};

export const updateTask = (task) => {
  return (dispatch) => {
    return fetch(`http://localhost:8000/todos/${task.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    }).then(() => dispatch(fetchTasks()));
  };
};

export const toggleTask = (task) => {
  const updatedTask = { ...task, completed: !task.completed };
  return updateTask(updatedTask);
};
