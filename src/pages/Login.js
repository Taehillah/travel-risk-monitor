import React, { useState } from 'react';
import { Container, Form, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      // Firebase authentication
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      
      // Successful login
      const user = userCredential.user;
      console.log('Logged in user:', user);
      
      // Store auth token in localStorage
      const token = await user.getIdToken();
      localStorage.setItem('authToken', token);
      
      // Redirect to dashboard
      navigate('/dashboard');
      
    } catch (error) {
      console.error('Login error:', error);
      switch (error.code) {
        case 'auth/invalid-email':
          setError('Invalid email address');
          break;
        case 'auth/user-disabled':
          setError('Account disabled');
          break;
        case 'auth/user-not-found':
          setError('No account found with this email');
          break;
        case 'auth/wrong-password':
          setError('Incorrect password');
          break;
        default:
          setError('Failed to login. Please try again.');
      }
    } finally {
      setLoading(false);
    }
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
        {error && <Alert variant="danger" className="py-2">{error}</Alert>}
        
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
            className="w-100 mb-3 d-flex justify-content-center align-items-center"
            style={{
              background: 'linear-gradient(90deg, #4b6cb7 0%, #182848 100%)',
              border: 'none',
              padding: '12px',
              borderRadius: '8px',
              fontWeight: '600',
              color: 'white',
              height: '45px'
            }}
            disabled={loading}
          >
            {loading ? (
              <Spinner animation="border" size="sm" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              'Log In'
            )}
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