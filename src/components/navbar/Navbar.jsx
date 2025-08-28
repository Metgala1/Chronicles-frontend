import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';
const navbar = () => {
  return (
    <div className={styles.navbar}>
      <p className={styles.navbarLogo}>Chronicles</p>
      <nav>
        <ul>
          <Link className={styles.link}>
            <li key={'home'}>Home</li>
          </Link>
          <Link className={styles.link}>
            <li key={'posts'}>Posts</li>
          </Link>
          <Link to={'register'} className={styles.link}>
            <li key={'register'}>Register</li>
          </Link>
          <Link to={'login'} className={styles.link}>
            <li key={'login'}>Login</li>
          </Link>
        </ul>
      </nav>
    </div>
  );
};

export default navbar;
