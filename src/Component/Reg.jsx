import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Reg() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    user_id: "",
    txt_email: "",
    txt_pass: "",
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
      const response = await fetch('http://localhost:1000/create', {
        method: 'POST',
        body: JSON.stringify(form),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      alert('User registered successfully!');
    } catch (error) {
      alert('Error during registration!');
      console.error(error);
    }

    setForm({
      user_id: "",
      txt_email: "",
      txt_pass: "",
    });
  };

  const navigateToLogin = () => {
    navigate("/LoginForm");
  };

  return (
    <>
      <header className="bg-secondary text-white text-center py-4 mb-4">
        <h2>Secure Task Management System</h2>
      </header>

      <div className="container bg-light py-5 min-vh-100">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6">
            <div className="p-4 border rounded-4 shadow-sm bg-white">
              <h3 className="text-center text-primary mb-4">Register</h3>
              <form onSubmit={submitForm}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">User ID</label>
                  <input
                    type="number"
                    className="form-control"
                    name="user_id"
                    value={form.user_id}
                    placeholder="Enter your ID"
                    onChange={handleInput}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="txt_email"
                    value={form.txt_email}
                    placeholder="Enter email"
                    onChange={handleInput}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="txt_pass"
                    value={form.txt_pass}
                    placeholder="Enter password"
                    onChange={handleInput}
                    required
                  />
                </div>

                <div className="d-flex justify-content-between">
                  <button type="submit" className="btn btn-primary px-4">
                    Register
                  </button>
                  <button
                    type="button"
                    onClick={navigateToLogin}
                    className="btn btn-outline-secondary px-4"
                  >
                    Go to Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Reg;
