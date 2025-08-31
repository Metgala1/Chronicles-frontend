import { Link } from 'react-router-dom';
import styles from '../styles/Dashboard.module.css';
import LoadingDots from './loadings/LoadingDot';
import { FaBook, FaUser, FaClock } from "react-icons/fa";

const PostList = ({ posts, loading, error }) => {
  if (loading) return <LoadingDots />;
  if (error) return <p className={styles.loadingText}>{error}</p>;
  if (!posts.length) return <p className={styles.loadingText}>No posts available</p>;

  return (
    <div id="main" className={styles.mainDiv}>
      {posts.map((post) => (
        <Link key={post.id} className={styles.link1} to={`/posts/${post.id}`}>
          <div className={styles.postCard}>
            <h2 className={styles.postTitle}><FaBook /> {post.title}</h2>
            <p className={styles.postAuthor}>
              <FaUser className={styles.icon} /> {post.author?.username}
            </p>
            <p className={styles.postMeta}>
              <FaClock className={styles.icon} /> Created At: {new Date(post.createdAt).toLocaleDateString()} |{' '}
              {post.published ? 'Published' : 'Not Published'}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PostList;
