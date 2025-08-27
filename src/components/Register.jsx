// src/pages/Register.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // <-- import axios
import styles from "../styles/Register.module.css";
import { FaUserPlus } from "react-icons/fa";


export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      // Axios POST request
      const { data } = await axios.post(
        `${BACKEND_URL}/auth/register`,
        formData, // automatically JSON.stringified
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      //If succesful we set Setsuccess Message to the date message
      setSuccess(data.message);
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      // Axios throws for non-2xx responses
      setError(err.response?.data?.message || "Something went wrong");
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
