/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from './useFetch';

function CreateTask() {
  const { data: tasks, errors, pending } = useFetch('http://localhost:8000/tasks');
  const [title, setTitle] = useState('');
  const [project, setProject] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  const projectList = [];

  if (tasks) {
    Object.values(tasks).forEach((task) => {
      if (!projectList.find((proj) => proj === task.project)) {
        projectList.push(task.project);
      }
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      project, title, description, date,
    };

    setIsPending(true);

    fetch('https://my-json-server.typicode.com/benfin75/todolist-server/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask),
    }).then(() => {
      setIsPending(false);
      navigate('/todolist/');
      window.location.reload(false);
    });
  };

  return (
    <div className="create-task">
      <h1>Add a Task</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Task name:
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          Task details:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
          Project name:
          <input
            list="projects-datalist"
            required
            value={project}
            onChange={(e) => setProject(e.target.value)}
          />
          <datalist id="projects-datalist">
            {projectList.map((proj, index) => <option key={index} value={proj} />)}
          </datalist>
        </label>
        <label>
          Due date:
          <input
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        { !isPending && <button type="submit">Add Task</button>}
        { isPending && <button type="submit" disabled>Posting...</button>}
      </form>
    </div>
  );
}

export default CreateTask;
