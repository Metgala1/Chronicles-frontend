import Navbar from "./navbar/Navbar";
import styles from "../styles/Dashboard.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
   const [posts, setPosts] = useState([])
   const [loading, setLoadng] = useState(true)
   const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
   
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get(`${BACKEND_URL}/posts/`);
                setPosts(res.data)
                console.log(res)
            } catch(err){
                console.error("Error fetching posts:", err)
            
            } finally {
                setLoadng(false)
            }
        };
        fetchPosts()

    },[])

  return (
    <div className={styles.dashboard}>
      <div className={styles.headerDiv}>
        <Navbar />
      </div>

      <div className={styles.mainDiv}>
        {loading ? (
          <p className={styles.loadingText}>Loading posts...</p>
        ) : posts.length === 0 ? (
          <p className={styles.loadingText}>No posts available</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className={styles.postCard}>
              <h2 className={styles.postTitle}>{post.title}</h2>
              <p className={styles.postContent}>{post.content}</p>
              <p className={styles.postAuthor}>
                <strong>By:</strong> {post.author?.username}
              </p>

              <div className={styles.commentSection}>
                <h4 className={styles.commentTitle}>Comments</h4>
                {post.comments && post.comments.length > 0 ? (
                  post.comments.map((comment) => (
                    <div key={comment.id} className={styles.commentCard}>
                      <p>{comment.content}</p>
                      <small>- {comment.user?.username || "Anonymous"}</small>
                    </div>
                  ))
                ) : (
                  <p>No comments yet</p>
                )}
              </div>

              <p className={styles.postMeta}>
                Created At: {new Date(post.createdAt).toLocaleDateString()} |{" "}
                {post.published ? "Published" : "Not Published"}
              </p>
            </div>
          ))
        )}
      </div>

      <div className={styles.footerDiv}></div>
    </div>
  );
};

export default Dashboard;
