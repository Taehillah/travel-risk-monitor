import { useState } from 'react';
import { Container, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    try {
      await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };


  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <div className="glass-card" style={{
  width: '100%',
  maxWidth: '500px',
  padding: '2rem',
  borderRadius: '15px',
  background: 'rgba(255, 255, 255, 0.25)', /* More transparent white */
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.25)', /* Lighter border */
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2)' /* Softer shadow */
        }}>
        <h2 className="text-center mb-4 text-white">Create Account</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className="text-white">Full Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
              style={{ background: 'rgba(255, 255, 255, 0.1)', border: 'none', color: 'white' }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="text-white">Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
              style={{ background: 'rgba(255, 255, 255, 0.1)', border: 'none', color: 'white' }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="text-white">Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
              minLength="6"
              style={{ background: 'rgba(255, 255, 255, 0.1)', border: 'none', color: 'white' }}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="text-white">Confirm Password</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              required
              style={{ background: 'rgba(255, 255, 255, 0.1)', border: 'none', color: 'white' }}
            />
          </Form.Group>

          <button
  type="submit"
  className="btn-gradient w-100 mb-3"
  style={{
    background: 'linear-gradient(90deg, #4b6cb7 0%, #182848 100%)',
    border: 'none',
    padding: '12px',
    borderRadius: '8px',
    fontWeight: '600',
    color: 'white'
  }}
>
  Register
</button>

          <div className="text-center text-white">
            Already have an account?{' '}
            <a href="/login" style={{ color: '#00d2ff', textDecoration: 'none' }}>
              Log In
            </a>
          </div>
        </Form>
      </div>
    </Container>
  );
}