import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function AddTask() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    fetch('http://localhost:1000/api/tasks')
      .then((res) => res.json())
      .then((data) => {
        setTasks(data); // Show all tasks (no filter)
        console.log("All tasks:", data);
      })
      .catch((err) => console.error('Failed to fetch tasks:', err));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:1000/api/tasks/${id}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(data => {
        alert(data.message);
        setTasks(tasks.filter(t => t.task_id !== id));
      })
      .catch(err => console.error('Delete failed:', err));
  };

  const handleUpdate = (id) => {
    navigate(`/UpdateTask/${id}`);
  };

  return (
    <div className="container mt-4">
      <div className=" bg-secondary text-center py-4 rounded" >
        <h2 style={{ color: 'white' }}>Secure Task Management System</h2>
        <h4 className="text-light">All Tasks</h4>
      </div>

      <div className="table-responsive mt-4">
        {tasks.length === 0 ? (
          <div className="alert alert-info text-center">No tasks available.</div>
        ) : (
          <table className="table table-bordered table-striped table-hover">
            <thead className="table-dark text-center">
              <tr>
                <th>Title</th>
                <th>Email</th>
                <th>Description</th>
                <th>Status</th>
                <th>Due Date</th>
                <th>Priority</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((t) => (
                <tr key={t.task_id} className="align-middle text-center">
                  <td>{t.task_title}</td>
                  <td>{t.task_email}</td>
                  <td>{t.task_description}</td>
                  <td>{t.task_status}</td>
                  <td>{new Date(t.task_due_date).toLocaleDateString()}</td>
                  <td>{t.task_priority}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(t.task_id)}
                      className="btn btn-danger btn-sm me-2"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleUpdate(t.task_id)}
                      className="btn btn-info btn-sm"
                    >
                      Update
                    </button>
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

export default AddTask;
