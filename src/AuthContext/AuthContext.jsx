import { useState, useEffect, createContext } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: null,
    user: null,
    isLoggedIn: false,
    loading: true,
  });

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  // Load auth from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user) {
      try {
        const parsedUser = JSON.parse(user);
        setAuth({
          token,
          user: parsedUser,
          isLoggedIn: true,
          loading: false,
        });
      } catch (e) {
        console.error('Failed to parse user data from localStorage:', e);
        logout();
      }
    } else {
      setAuth(prev => ({ ...prev, loading: false }));
    }
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/auth/login`,
        { email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      setAuth({
        token: data.token,
        user: data.user,
        isLoggedIn: true,
        loading: false,
      });

      return { success: true };
    } catch (error) {
      console.error('Login failed:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Something went wrong',
      };
    }
  };

  // Register function
 const register = async ({ email, password, username }) => {
  try {
    const { data } = await axios.post(
      `${BASE_URL}/auth/register`,
      { email, password, username },
      { headers: { 'Content-Type': 'application/json' } }
    );

    return { success: true, message: data.message || 'Registration successful' };
  } catch (error) {
    console.error('Registration failed:', error);
    return {
      success: false,
      message: error.response?.data?.message || 'Something went wrong',
    };
  }
};



  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuth({ token: null, user: null, isLoggedIn: false, loading: false });
  };

  const value = { auth, login, register, logout, BASE_URL };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
