import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Register.module.css';
import { FaSignInAlt } from 'react-icons/fa';
import { AuthContext } from '../AuthContext/AuthContext';
import LoadingDots from './loadings/LoadingDot';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // use login from context

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const { email, password } = formData;

    // Call the login function from AuthContext
    const result = await login(email, password);

    if (result.success) {
      setSuccess('Login successful! Redirecting...');
      setTimeout(() => navigate('/'), 2500);
    } else {
      setError(result.message || 'Login failed.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formDiv}>
        <h1>Log Into Your Account</h1>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Email</legend>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="me@example.com"
              className={styles.input}
            />
          </fieldset>
          <fieldset>
            <legend>Password</legend>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={styles.input}
            />
          </fieldset>
          <button className={styles.button} type="submit">
            <FaSignInAlt /> Login
          </button>
        </form>
        {error && <p className={styles.error}>{error}</p>}
        {success && <LoadingDots />}
      </div>
    </div>
  );
};

export default Login;
