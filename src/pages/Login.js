import React, { useState } from 'react';
import { Container, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    console.log('Login submitted:', formData);
    navigate('/dashboard'); // Redirect after login
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <div className="glass-card" style={{
        width: '100%',
        maxWidth: '500px',
        padding: '2rem',
        borderRadius: '15px',
        background: 'rgba(255, 255, 255, 0.25)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.25)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2)'
      }}>
        <h2 className="text-center mb-4 text-white">Welcome Back</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className="text-white">Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
              style={{ 
                background: 'rgba(255, 255, 255, 0.1)', 
                border: 'none', 
                color: 'white' 
              }}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="text-white">Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
              style={{ 
                background: 'rgba(255, 255, 255, 0.1)', 
                border: 'none', 
                color: 'white' 
              }}
            />
          </Form.Group>

          <button
            type="submit"
            className="w-100 mb-3"
            style={{
              background: 'linear-gradient(90deg, #4b6cb7 0%, #182848 100%)',
              border: 'none',
              padding: '12px',
              borderRadius: '8px',
              fontWeight: '600',
              color: 'white'
            }}
          >
            Log In
          </button>

          <div className="text-center text-white">
            Don't have an account?{' '}
            <a href="/register" style={{ color: '#00d2ff', textDecoration: 'none' }}>
              Register
            </a>
          </div>
        </Form>
      </div>
    </Container>
  );
}