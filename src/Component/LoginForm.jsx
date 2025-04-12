
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    txt_email: '',
    txt_pass: '',
  });

  const handleInput = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:1000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          txt_email: form.txt_email,
          txt_pass: form.txt_pass,
        }),
      });

      const data = await response.json();

      if (data.message === 'Login successful') {
        alert('Login successful');
        localStorage.setItem('token', data.token);
        localStorage.setItem('email', form.txt_email.trim().toLowerCase());

        setForm({ txt_email: '', txt_pass: '' });

        navigate('/UserTask');
      } else {
        alert(data.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Login Error:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <>
      
      <header className="bg-secondary text-white text-center py-4 mb-4">
        <h2>Secure Task Management System</h2>
      </header>

      <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
        <div className="p-4 rounded" style={{ backgroundColor: '#ffe4e1', minWidth: '350px', boxShadow: '0 0 10px rgba(0,0,0,0.2)' }}>
          <h4 className="mb-4 text-center">Login Page</h4>

          <form onSubmit={submitForm}>
            <div className="mb-3">
              <label>Email:</label>
              <input
                type="email"
                className="form-control"
                name="txt_email"
                value={form.txt_email}
                onChange={handleInput}
                required
              />
            </div>

            <div className="mb-3">
              <label>Password:</label>
              <input
                type="password"
                className="form-control"
                name="txt_pass"
                value={form.txt_pass}
                onChange={handleInput}
                required
              />
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-primary w-100">Login</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
