
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // For page navigation

function AdminDash() {
  const [tasks, setTasks] = useState([]);
  const [showTasks, setShowTasks] = useState(false);
  const navigate = useNavigate(); // For navigation to Add Task

  useEffect(() => {
    fetch('http://localhost:1000/api/tasks')
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error('Failed to fetch tasks:', err));
  }, []);

  let addtask=()=>{
    navigate('/Admin')
  }

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* <header
        style={{
          backgroundColor: 'black',
          color: 'white',
          padding: '20px',
          textAlign: 'center',
        }}
      >
        <h2>Admin Dashboard</h2>
        <h3>Welcome To Admin Dashboard</h3>
      </header> */}

<header className="bg-secondary text-white text-center py-4 mb-4">
        <h2>Secure Task Management System</h2>
        <h2>Admin Dashboard</h2>
        <h3>Welcome To Admin Dashboard</h3>
      </header>

      {/* Buttons Section */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          marginTop: '30px',
          flexWrap: 'wrap',
        }}
      >
        <button
          onClick={() => setShowTasks(true)}
          style={buttonStyle('#6a5acd')}
        >
          Show Users
        </button>
        <button
          onClick={() => navigate('/addtask')}
          style={buttonStyle('#20b2aa')}
        >
          All Tasks List
        </button>
        <button onClick={addtask}
          style={buttonStyle('#ff8c00')}
        >
          Add Task 
        </button>
      </div>

      {/* Task Table */}
      {showTasks && (
        <div style={{ width: '90%', margin: '40px auto', overflowX: 'auto' }}>
          {tasks.length === 0 ? (
            <p style={{ textAlign: 'center' }}>No tasks found.</p>
          ) : (
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                backgroundColor: '#f9f9f9',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              }}
            >
              <thead>
                <tr style={{ backgroundColor: '#87ceeb' }}>
                  <th style={tableHeader}>Task ID</th>
                  <th style={tableHeader}>Task Email</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.task_id}>
                    <td style={tableCell}>{task.task_id}</td>
                    <td style={tableCell}>{task.task_email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

// 🔹 Button Style Function
const buttonStyle = (bgColor) => ({
  backgroundColor: bgColor,
  color: 'white',
  padding: '12px 25px',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '16px',
  boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
  transition: '0.3s',
});

// 🔹 Table Styles
const tableHeader = {
  padding: '12px',
  border: '1px solid #ddd',
  fontWeight: 'bold',
};

const tableCell = {
  padding: '12px',
  border: '1px solid #ddd',
};

export default AdminDash;

