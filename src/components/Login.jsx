import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Register.module.css';
import { FaSignInAlt } from 'react-icons/fa';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const { data } = await axios.post(`${BACKEND_URL}/auth/login`, formData, {
        headers: { 'Content-Type': 'application/json' },
      });
      setSuccess(data.message);
      setTimeout(() => {
        navigate('register');
      }, 1500);
    } catch (err) {
      setError(err?.response?.date?.message || 'Something went wrong');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formDiv}>
        <h1>Log Into Your Account</h1>
        <form action="" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Email</legend>
            <input
              type="email"
              name="email"
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
              onChange={handleChange}
              className={styles.input}
            />
          </fieldset>
          <button className={styles.button} type="submit">
            <FaSignInAlt /> Login
          </button>
        </form>
        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}
      </div>
    </div>
  );
};

export default Login;
