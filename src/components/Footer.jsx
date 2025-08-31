import styles from '../styles/Dashboard.module.css';
import { Link } from 'react-router-dom';
import { FaEye, FaUserPlus, FaSignInAlt, FaFacebook, FaInstagram, FaTwitter, FaLightbulb } from "react-icons/fa";

const Footer = () => {
  return (
    <div className={styles.footerDiv}>
      <div className={styles.footerContent}>
        <div className={styles.footerAbout}>
          <h4>About Chronicles</h4>
          <p>
            Chronicles is a modern blogging platform where authors share
            insights, stories, and tutorials. Stay connected with us on social
            media!
          </p>
        </div>

        <div className={styles.footerLinks}>
          <h4>Quick Links</h4>
          <ul>
            <li><Link className={styles.link} to="/">Home</Link></li>
            <li><Link className={styles.link} to="/posts"><FaEye /> Posts</Link></li>
            <li><Link className={styles.link} to="/register"><FaUserPlus /> Register</Link></li>
            <li><Link className={styles.link} to="/login"><FaSignInAlt /> Login</Link></li>
          </ul>
        </div>

        <div className={styles.footerSocial}>
          <h4>Follow Us</h4>
          <div className={styles.socialIcons}>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
              <FaFacebook /> Facebook
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
              <FaTwitter /> Twitter
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
              <FaInstagram /> Instagram
            </a>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>
          © {new Date().getFullYear()} Chronicles. All rights reserved. <FaLightbulb /> BY ATAGWE ROGER
        </p>
      </div>
    </div>
  );
};

export default Footer;
