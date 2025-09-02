import Navbar from './navbar/Navbar';
import Header from './Header';
import { useContext } from 'react';
import { PostContext } from '../postContext/PostContext';
import styles from '../styles/Dashboard.module.css';
import PostList from './PostList';
import Footer from './Footer';

const Dashboard = () => {
  const { posts, loading, error, fetchPosts, hasMore, loadMore } = useContext(PostContext);

  return (
    <div className={styles.dashboard}>
      <Header />
      <div className={styles.headerDiv}>
        <Navbar />
      </div>

      <PostList fetchPosts={fetchPosts} hasMore={hasMore} loadMore={loadMore} posts={posts} loading={loading} error={error} />

      <Footer />
    </div>
  );
};

export default Dashboard;
