import React, { useState } from "react";
import Image from "next/image";

const Todo = () => {
  const [tasks, Tasks] = useState([]);
  const [newTask, NewTask] = useState('');
  const [editedTask, EditedTask] = useState({ index: null, value: '' });
  const [deleteModalIndex, Delete] = useState(null);

  const AddTask = () => {
    if (newTask.trim() !== '') {
      Tasks([...tasks, { task: newTask, completed: false }]);
      NewTask('');
    }
  };

  const Edit = (index) => {
    EditedTask({ index, value: tasks[index].task });
  };

  const closeEdit = () => {
    EditedTask({ index: null, value: '' });
  };

  const handleEdit = () => {
    const updatedTasks = [...tasks];
    updatedTasks[editedTask.index].task = editedTask.value;
    Tasks(updatedTasks);
    closeEdit();
  };

  const openDelete = (index) => {
    Delete(index);
  };

  const closeDelete = () => {
    Delete(null);
  };

  const handleDeleteTask = (index) => {
    closeDelete();
    const updatedTasks = tasks.filter((_, i) => i !== index);
    Tasks(updatedTasks);
  };

  return (
    <div className="todo-container"> 
      <div className="todo-heading-container">
        <h1 className="todo-heading">To-do Lists</h1>
      </div>
 
      <div className="add-task">
        <input
          type="text"
          value={newTask}
          onChange={(e) => NewTask(e.target.value)}
          placeholder="New Task"
        />
        <button onClick={AddTask}>Add Task</button>
      </div> 
 
      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index} className="task-item">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleTask(index)}
            />
            <span className={`task-text ${task.completed ? 'completed' : ''}`}>
              {task.task}
            </span>
            <div className="task-buttons"> 
              <button onClick={() => Edit(index)}>
                <Image src="https://i.imgur.com/VRqKYY5.png" alt="Edit" width={25} height={25} />
              </button> 
              <button onClick={() => openDelete(index)}>
                <Image src="https://i.imgur.com/tJZopvP.png" alt="Delete" width={30} height={30} />
              </button>
            </div>
          </li>
        ))}
      </ul>
       {editedTask.index !== null && (
        <div className="edit-modal">
          <input
            type="text"
            value={editedTask.value}
            onChange={(e) => EditedTask({ ...editedTask, value: e.target.value })}
          />
          <button onClick={handleEdit}>Save</button>
          <button onClick={closeEdit}>Cancel</button>
        </div>
      )}
 
      {deleteModalIndex !== null && (
        <div className="delete-modal">
          <p>Are you sure you want to delete this task?</p>
          <button onClick={() => handleDeleteTask(deleteModalIndex)}>Yes</button>
          <button onClick={closeDelete}>No</button>
        </div>
      )}
    </div>
  );
};
 
export default function Home() {
  return (
    <div>
      <Todo />
    </div>
  );
}
