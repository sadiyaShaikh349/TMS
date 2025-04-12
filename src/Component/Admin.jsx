// Admin.js
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Admin() {
  const [task, setTask] = useState({
    task_id: '',
    task_title: '',
    task_description: '',
    task_status: 'pending',
    task_due_date: '',
    task_priority: 'low',
    task_email: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({
      ...task,
      [name]: value,
    });
  };

  const handleSave = () => {
    if (task.task_id && task.task_title && task.task_email) {
      const taskData = { ...task };

      fetch('http://localhost:1000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      })
        .then(res => res.json())
        .then(data => {
          alert(data.message || 'Task added successfully!');
          setTask({
            task_id: '',
            task_title: '',
            task_description: '',
            task_status: 'pending',
            task_due_date: '',
            task_priority: 'low',
            task_email: '',
          });
          navigate('/AddTask');
        })
        .catch(err => {
          console.error('Error saving task:', err);
          alert('Error adding task.');
        });
    } else {
      alert('Please enter a valid task ID, Title, and Email.');
    }
  };

  return (
    <>
      <div
        style={{
          height: 'auto',
          width: '70%',
          border: '1px solid black',
          padding: '20px',
          margin: '50px auto',
          background: 'teal',
          color: 'white',
        }}
      >
        <center>
          <u>
            <h3>Add Task</h3>
          </u>
        </center>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="task_id" className="form-label">Task ID:</label>
            <input
              type="number"
              id="task_id"
              name="task_id"
              value={task.task_id}
              onChange={handleChange}
              placeholder="Enter Task ID"
              className="form-control"
            />
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="task_email" className="form-label">Email:</label>
            <input
              type="email"
              id="task_email"
              name="task_email"
              value={task.task_email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="form-control"
            />
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="task_title" className="form-label">Title:</label>
            <input
              type="text"
              id="task_title"
              name="task_title"
              value={task.task_title}
              onChange={handleChange}
              placeholder="Enter Task Title"
              className="form-control"
            />
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="task_description" className="form-label">Description:</label>
            <textarea
              id="task_description"
              name="task_description"
              value={task.task_description}
              onChange={handleChange}
              placeholder="Enter task description"
              className="form-control"
            ></textarea>
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="task_status" className="form-label">Status:</label>
            <select
              id="task_status"
              name="task_status"
              value={task.task_status}
              onChange={handleChange}
              className="form-select"
            >
              <option value="pending">Pending</option>
              <option value="progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="task_due_date" className="form-label">Due Date:</label>
            <input
              type="date"
              id="task_due_date"
              name="task_due_date"
              value={task.task_due_date}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="task_priority" className="form-label">Priority:</label>
            <select
              id="task_priority"
              name="task_priority"
              value={task.task_priority}
              onChange={handleChange}
              className="form-select"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <center>
          <button onClick={handleSave} className="btn btn-light">
            Save Task
          </button>
        </center>
      </div>
    </>
  );
}

export default Admin;
