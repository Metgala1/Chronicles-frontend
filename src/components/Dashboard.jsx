import Navbar from "./navbar/Navbar";
import styles from "../styles/Dashboard.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
      <div className={styles.footerDiv}>
  <div className={styles.footerContent}>
    <div className={styles.footerAbout}>
      <h4>About Chronicles</h4>
      <p>
        Chronicles is a modern blogging platform where authors share insights,
        stories, and tutorials. Stay connected with us on social media!
      </p>
    </div>

    <div className={styles.footerLinks}>
      <h4>Quick Links</h4>
      <ul>
                     <Link className={styles.link}><li key={"home"}>Home</li></Link>
                    <Link className={styles.link}><li key={"posts"}>Posts</li></Link>
                    <Link to={"register"} className={styles.link}><li key={"register"}>Register</li></Link>
                    <Link to={"login"} className={styles.link}><li key={"login"}>Login</li></Link>
      </ul>
    </div>

    <div className={styles.footerSocial}>
      <h4>Follow Us</h4>
      <div className={styles.socialIcons}>
        <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
        <a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter</a>
        <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
      </div>
    </div>
  </div>

  <div className={styles.footerBottom}>
    <p>© {new Date().getFullYear()} Chronicles. All rights reserved. BY ATAGWE ROGER</p>
  </div>
</div>

      
    </div>
  );
};

export default Dashboard;
