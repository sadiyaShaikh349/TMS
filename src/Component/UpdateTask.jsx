import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateTask() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState({
    task_email: '',
    task_status: '',
    task_due_date: ''
  });

  useEffect(() => {
    fetch('http://localhost:1000/api/tasks')
      .then(res => res.json())
      .then(data => {
        const found = data.find(t => t.task_id === parseInt(id));
        if (found) {
          setTask({
            task_email: found.task_email,
            task_status: found.task_status,
            task_due_date: found.task_due_date
          });
        }
      });
  }, [id]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:1000/api/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task)
    })
      .then(res => res.json())
      .then(data => {
        alert(data.message);
        navigate('/AddTask');
      });
  };

  return (
    <center>
      <div style={{ padding: '20px', background: 'grey', border: '1px solid black', width: '50%', marginTop: '100px' }}>
        <h3>Update Task</h3>
        <form onSubmit={handleSubmit}>
          Email:
          <input
            name="task_email"
            value={task.task_email}
            onChange={handleChange}
            placeholder="Email"
            style={{ width: '300px' }}
          /><br /><br />
          Status:
          <input
            name="task_status"
            value={task.task_status}
            onChange={handleChange}
            placeholder="Status"
            style={{ width: '300px' }}
          /><br /><br />
          DueDate:
          <input 
            name="task_due_date"
            value={task.task_due_date}
            onChange={handleChange}
            placeholder="Due Date"
            style={{ width: '300px' }}
          /><br /><br />
          <button type="submit">Update</button>
        </form>
      </div>
    </center>
  );
}

export default UpdateTask;
