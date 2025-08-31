import Navbar from './navbar/Navbar';
import styles from '../styles/Dashboard.module.css';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import LoadingDots from './loadings/LoadingDot';
import { PostContext } from '../postContext/PostContext';

const Dashboard = () => {
  const { posts, loading, error } = useContext(PostContext);

  return (
    <div className={styles.dashboard}>
      <Header />
      <div className={styles.headerDiv}>
        <Navbar />
      </div>

      <div id="main" className={styles.mainDiv}>
        {loading ? (
          <LoadingDots />
        ) : error ? (
          <p className={styles.loadingText}>{error}</p>
        ) : posts.length === 0 ? (
          <p className={styles.loadingText}>No posts available</p>
        ) : (
          posts.map((post) => (
            <Link key={post.id} className={styles.link1} to={`/posts/${post.id}`}>
              <div className={styles.postCard}>
                <h2 className={styles.postTitle}>{post.title}</h2>
                <p className={styles.postContent}>{post.content}</p>
                <p className={styles.postAuthor}>
                  <strong>By:</strong> {post.author?.username}
                </p>

                <p className={styles.postMeta}>
                  Created At: {new Date(post.createdAt).toLocaleDateString()} |{' '}
                  {post.published ? 'Published' : 'Not Published'}
                </p>
              </div>
            </Link>
          ))
        )}
      </div>

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
          </div>

          <div className={styles.footerSocial}>
            <h4>Follow Us</h4>
            <div className={styles.socialIcons}>
              <a href="https://facebook.com" target="_blank" rel="noreferrer">
                Facebook
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer">
                Twitter
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                Instagram
              </a>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>
            © {new Date().getFullYear()} Chronicles. All rights reserved. BY
            ATAGWE ROGER
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
