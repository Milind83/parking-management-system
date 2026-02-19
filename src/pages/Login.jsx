import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';

const Login = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Dummy login logic (replace with real auth)
    setTimeout(() => {
      setLoading(false);
      if (
        form.username === 'admin' &&
        form.email === 'admin@example.com' &&
        form.password === 'admin123'
      ) {
        toast.success('Login successful!');
        navigate('/');
      } else {
        toast.error('Invalid username, email, or password');
      }
    }, 1000);
  };

  return (
    <>
      <Toaster position="top-center" />
      <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
        <div className="card shadow p-4" style={{ minWidth: 350, maxWidth: 400 }}>
          <h2 className="text-center mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={form.username}
                onChange={handleChange}
                required
                autoFocus
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
