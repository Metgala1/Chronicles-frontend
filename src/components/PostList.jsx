import { Link } from "react-router-dom";
import styles from "../styles/Dashboard.module.css";
import LoadingDots from "./loadings/LoadingDot";
import { FaBook, FaUser, FaClock } from "react-icons/fa";
import { useEffect, useRef } from "react";

const PostList = ({ posts, loading, hasMore, error, loadingMore, fetchPosts }) => {
  const loaderRef = useRef(null);

  useEffect(() => {
    if (!loaderRef.current || !hasMore || loadingMore) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchPosts();
      }
    });

    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasMore, loadingMore, fetchPosts]);

  if (loading && posts.length === 0) return <LoadingDots />;

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "20px", color: "#e53e3e" }}>
        <p style={{ fontSize: "1.2em", fontWeight: "bold", marginBottom: "10px" }}>
          {error}
        </p>
        <button
          onClick={fetchPosts}
          style={{
            padding: "10px 20px",
            backgroundColor: "#4299e1",
            color: "white",
            border: "none",
            borderRadius: "0.375rem",
            cursor: "pointer",
            fontSize: "1em",
          }}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!posts.length) return <p className={styles.loadingText}>No posts available</p>;

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  return (
    <div id="main" className={styles.mainDiv}>
      {posts.map((post) => (
        <Link key={post.id} className={styles.link1} to={`/posts/${post.id}`}>
          <div className={styles.postCard}>
            {post.imageUrl && (
              <img
                src={`${BACKEND_URL}${post.imageUrl}`}
                alt={post.title}
                className={styles.postImage}
              />
            )}
            <h2 className={styles.postTitle}>
              <FaBook /> {post.title}
            </h2>
            <p className={styles.postAuthor}>
              <FaUser className={styles.userIcon} /> {post.author?.username}
            </p>
            <p className={styles.postMeta}>
              <FaClock className={styles.clockIcon} /> Created At:{" "}
              {new Date(post.createdAt).toLocaleDateString()} |{" "}
              {post.published ? "Published" : "Not Published"}
            </p>
          </div>
        </Link>
      ))}

      {loadingMore && <LoadingDots />}

      {!hasMore && !loading && posts.length > 0 && (
        <p style={{ textAlign: "center", color: "#888", fontSize: "1em", padding: "20px" }}>
          You've reached the end of all posts
        </p>
      )}

      {/* Infinite scroll trigger */}
      <div ref={loaderRef} style={{ height: "20px" }}></div>
    </div>
  );
};

export default PostList;
