import React, { useState } from 'react';
import './TodoList.css';
import Navbar from './Navbar';

function TodoList() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Buy groceries", completed: false, date: "03.09.2023", day: "Sunday", description: "Buy milk, eggs, and bread" },
    { id: 2, title: "Finish project", completed: false, date: "03.09.2023", day: "Sunday", description: "Complete the project report" },
    { id: 3, title: "Go to the gym", completed: true, date: "03.09.2023", day: "Sunday", description: "Work out for an hour" },
  ]);

  const [newTask, setNewTask] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newDay, setNewDay] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [activeView, setActiveView] = useState("All");
  const [editingTask, setEditingTask] = useState(null); // Task being edited

  const addTask = () => {
    if (newTask.trim() === "") return;

    const newTaskItem = {
      id: tasks.length + 1,
      title: newTask,
      completed: false,
      date: newDate,
      day: newDay,
      description: newDescription,
    };

    setTasks([...tasks, newTaskItem]);
    setNewTask("");
    setNewDate("");
    setNewDay("");
    setNewDescription("");
  };

  const toggleTask = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const startEditing = (taskId) => {
    setEditingTask(taskId); // Set the ID of the task being edited
  };

  const saveEditedTask = () => {
    if (editingTask === null) return;

    const updatedTasks = tasks.map((task) =>
      task.id === editingTask
        ? {
            ...task,
            title: newTask,
            date: newDate,
            day: newDay,
            description: newDescription,
          }
        : task
    );

    setTasks(updatedTasks);
    setEditingTask(null); // Clear the editing state
    setNewTask("");
    setNewDate("");
    setNewDay("");
    setNewDescription("");
  };

  const cancelEdit = () => {
    setEditingTask(null); // Clear the editing state
  };

  const filteredTasks = tasks.filter((task) => {
    if (activeView === "Active") {
      return !task.completed;
    } else if (activeView === "Completed") {
      return task.completed;
    }
    return true;
  });

  return (
    <div>
      <h1>To-Do List</h1>
      <Navbar setActiveView={setActiveView} />
      <div>
        <input
          type="text"
          placeholder="Enter a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <input
          type="text"
          placeholder="Date (e.g., 03.09.2023)"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
        />
        <input
          type="text"
          placeholder="Day (e.g., Sunday)"
          value={newDay}
          onChange={(e) => setNewDay(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
        {editingTask === null ? (
          <button onClick={addTask}>Add</button>
        ) : null}
      </div>
      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            <div>
              <p><strong>Task:</strong> {task.completed ? <s>{task.title}</s> : task.title}</p>
              <p><strong>Date:</strong> {task.date}</p>
              <p><strong>Day:</strong> {task.day}</p>
              <p><strong>Description:</strong> {task.description}</p>
            </div>
            <div>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="task-checkbox"
              />
              <button className="delete-button" onClick={() => deleteTask(task.id)}>Delete</button>
              {editingTask === task.id ? (
                <>
                  <button className="edit-button" onClick={saveEditedTask}>Save</button>
                  <button className="cancel-button" onClick={cancelEdit}>Cancel</button>
                </>
              ) : (
                <button className="edit-button" onClick={() => startEditing(task.id)}>Edit</button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;