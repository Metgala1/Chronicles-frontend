import { useContext } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import { AuthContext } from '../../AuthContext/AuthContext';
import { FaPen, FaEye, FaSignInAlt, FaSignOutAlt, FaUserPlus } from "react-icons/fa";

const Navbar = () => {
  const { auth, logout } = useContext(AuthContext);
  const user = auth?.user;

  return (
    <div className={styles.navbar}>
      <p className={styles.navbarLogo}>{user ? `Hello, ${user.username}`   : 'Chronicles'}</p>
      <nav>
        <ul>
          <li key="home">
            <Link to="createpost" className={styles.link}><FaPen /> Create Post</Link>
          </li>
          <li key="posts">
            <a  href="#main" className={styles.link}><FaEye /> View Posts</a>
          </li>
          {!user && (
            <>
              <li key="register">
                <Link to="/register" className={styles.link}><FaUserPlus /> Register</Link>
              </li>
              <li key="login">
                <Link to="/login" className={styles.link}><FaSignInAlt /> Login</Link>
              </li>
            </>
          )}
          {user && (
            <li key="logout">
              <button className={styles.link} onClick={logout}><FaSignOutAlt /> Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
