import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Register.module.css';
import { FaUserPlus } from 'react-icons/fa';
import { AuthContext } from '../AuthContext/AuthContext';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();
  const { register } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const result = await register(formData);

    if (result.success) {
      setSuccess('Account created successfully! Redirecting to login...');
      setTimeout(() => navigate('/login'), 1500);
    } else {
      setError(result.message || 'Registration failed.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formDiv}>
        <h2 className={styles.title}>Create Chronicles Account</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <fieldset>
            <legend>Username</legend>
            <input
              type="text"
              name="username"
              placeholder="T-pain"
              value={formData.username}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </fieldset>

          <fieldset>
            <legend>Email</legend>
            <input
              type="email"
              name="email"
              placeholder="t-pain@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </fieldset>

          <fieldset>
            <legend>Password</legend>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </fieldset>

          <button type="submit" className={styles.button}>
            <FaUserPlus /> Register
          </button>
        </form>

        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}
      </div>
    </div>
  );
}
