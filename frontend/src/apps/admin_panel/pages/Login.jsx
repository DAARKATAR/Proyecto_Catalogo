import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../../../shared/services/api';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await authApi.login(username, password);
      // If success, navigate to admin
      navigate('/admin');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container bg-dark">
      <div className="login-box glass">
        <div className="text-center mb-4">
          <h2 className="gradient-text">MOTOLOOK ADMIN</h2>
          <p className="text-dim">Acceso exclusivo para personal autorizado</p>
        </div>

        <form onSubmit={handleLogin}>
          {error && <div className="error-alert">{error}</div>}
          
          <div className="form-group">
            <label>Usuario</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              required 
            />
          </div>
          <div className="form-group mb-4">
            <label>Contraseña</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              placeholder="admin123"
              required 
            />
          </div>
          
          <button type="submit" className="btn btn-primary w-full" disabled={loading}>
            {loading ? 'Verificando...' : 'Ingresar al Dashboard'}
          </button>
        </form>
        
        <div className="text-center mt-4">
          <button onClick={() => navigate('/')} className="btn-link">Volver al sitio público</button>
        </div>
      </div>

      <style jsx>{`
        .login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #050505;
          background-image: radial-gradient(circle at center, #111 0%, #000 100%);
        }
        .login-box {
          width: 100%;
          max-width: 400px;
          padding: 3rem 2rem;
          border-radius: 20px;
        }
        .text-center { text-align: center; }
        .mb-4 { margin-bottom: 2rem; }
        .mt-4 { margin-top: 1.5rem; }
        .text-dim { color: var(--text-dim); font-size: 0.9rem; margin-top: 0.5rem; }
        
        .form-group {
          margin-bottom: 1.2rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .form-group label {
          font-size: 0.9rem;
          font-weight: 600;
          color: #ddd;
        }
        .form-group input {
          width: 100%;
          padding: 1rem;
          background: rgba(0,0,0,0.4);
          border: 1px solid var(--glass-border);
          border-radius: 8px;
          color: white;
          transition: var(--transition);
        }
        .form-group input:focus {
          border-color: var(--primary);
          outline: none;
        }
        .error-alert {
          background: rgba(255, 60, 60, 0.1);
          border: 1px solid rgba(255, 60, 60, 0.3);
          color: #ff6b6b;
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 1.5rem;
          text-align: center;
          font-size: 0.9rem;
        }
        .btn-link {
          background: none;
          border: none;
          color: var(--text-dim);
          cursor: pointer;
          font-size: 0.9rem;
          transition: var(--transition);
        }
        .btn-link:hover {
          color: var(--primary);
        }
        .w-full { width: 100%; }
      `}</style>
    </div>
  );
};

export default Login;
