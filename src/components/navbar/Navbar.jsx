import { useContext } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import { AuthContext } from '../../AuthContext/AuthContext';

const Navbar = () => {
  const { auth, logout } = useContext(AuthContext);
  const user = auth.user;

  return (
    <div className={styles.navbar}>
      <p className={styles.navbarLogo}>{user ? `Hello, ${user.username}`   : 'Chronicles'}</p>
      <nav>
        <ul>
          <li key="home">
            <Link to="createpost" className={styles.link}>Create Post</Link>
          </li>
          <li key="posts">
            <a  href="#main" className={styles.link}>Posts</a>
          </li>
          {!user && (
            <>
              <li key="register">
                <Link to="/register" className={styles.link}>Register</Link>
              </li>
              <li key="login">
                <Link to="/login" className={styles.link}>Login</Link>
              </li>
            </>
          )}
          {user && (
            <li key="logout">
              <button className={styles.link} onClick={logout}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
