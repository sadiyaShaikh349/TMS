
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function UserTask() {
  const [tasks, setTasks] = useState([]);
  const [editTaskId, setEditTaskId] = useState(null); 
  const userEmail = localStorage.getItem('email');

  useEffect(() => {
    fetch('http://localhost:1000/api/tasks')
      .then((res) => res.json())
      .then((data) => {
        const userTasks = data.filter(task => task.task_email === userEmail);
        setTasks(userTasks);
      })
      .catch(err => console.error('Error fetching tasks:', err));
  }, [userEmail]);

  const handlePriorityChange = (taskId, newPriority) => {
    fetch(`http://localhost:1000/api/tasks/${taskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task_priority: newPriority }),
    })
      .then(res => res.json())
      .then(() => {
        setTasks(tasks.map(task =>
          task.task_id === taskId ? { ...task, task_priority: newPriority } : task
        ));
      });
  };

  const handleStatusChange = (taskId, newStatus) => {
    fetch(`http://localhost:1000/api/tasks/${taskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task_status: newStatus }),
    })
      .then(res => res.json())
      .then(() => {
        setTasks(tasks.map(task =>
          task.task_id === taskId ? { ...task, task_status: newStatus } : task
        ));
        if (newStatus === 'Completed') {
          setEditTaskId(null);
        }
      });
  };

  return (
    <div className="container mt-4">
      <div className=" bg-secondary text-center py-4 rounded" >
        <h2 style={{ color: 'white' }}>Secure Task Management System</h2>
        <h4 className="text-light">Tasks for {userEmail}</h4>
      </div>

      <div className="table-responsive mt-4">
        {tasks.length === 0 ? (
          <div className="alert alert-warning text-center">No tasks assigned to you.</div>
        ) : (
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Due Date</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map(task => (
                <tr key={task.task_id}>
                  <td>{task.task_title}</td>
                  <td>{task.task_description}</td>
                  <td>{new Date(task.task_due_date).toLocaleDateString()}</td>

                  {/* Priority Dropdown or Text */}
                  <td>
                    {editTaskId === task.task_id && task.task_status !== 'Completed' ? (
                      <select
                        className="form-select"
                        value={task.task_priority}
                        onChange={(e) => handlePriorityChange(task.task_id, e.target.value)}
                      >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                      </select>
                    ) : (
                      task.task_priority
                    )}
                  </td>

                  {/* Status Dropdown or Text */}
                  <td>
                    {editTaskId === task.task_id && task.task_status !== 'Completed' ? (
                      <select
                        className="form-select"
                        value={task.task_status}
                        onChange={(e) => handleStatusChange(task.task_id, e.target.value)}
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    ) : (
                      task.task_status
                    )}
                  </td>

                  {/* Edit Button */}
                  <td>
                    {task.task_status === 'Completed' ? (
                      <span className="text-muted">Locked</span>
                    ) : (
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() => setEditTaskId(task.task_id)}
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default UserTask;

