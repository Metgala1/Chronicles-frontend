// PostPage.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/PostPage.module.css";

function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BACKEND_URL}/posts/${id}`);
        setPost(res.data);
        setComments(res.data.comments || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load post. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, BACKEND_URL]);

  const handleComment = async () => {
    if (!newComment.trim()) return;
    try {
      const res = await axios.post(`${BACKEND_URL}/posts/${id}/comments`, {
        content: newComment,
      });
      setComments((prev) => [...prev, res.data]);
      setNewComment("");
    } catch (err) {
      console.error(err);
      alert("Failed to post comment. Please try again.");
    }
  };

  if (loading) return <p className={styles.status}>Loading...</p>;
  if (error) return <p className={`${styles.status} ${styles.error}`}>{error}</p>;
  if (!post) return <p className={styles.status}>No post found.</p>;

  return (
    <div className={styles.postPage}>
      <article className={styles.postCard}>
        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.content}>{post.content}</p>
        <p className={styles.author}>
          <b>Author:</b> {post.user?.name || "Unknown"}
        </p>
      </article>

      <section className={styles.commentsSection}>
        <h3 className={styles.commentHeader}>Comments</h3>
        <div className={styles.comments}>
          {comments.length > 0 ? (
            comments.map((c) => (
              <div key={c.id} className={styles.comment}>
                <p>{c.content}</p>
                <small>— {c.user?.name || "Anonymous"}</small>
              </div>
            ))
          ) : (
            <p className={styles.noComments}>No comments yet. Be the first to comment!</p>
          )}
        </div>

        <div className={styles.commentBox}>
          <textarea
            className={styles.textarea}
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button className={styles.button} onClick={handleComment}>
            Post Comment
          </button>
        </div>
      </section>
    </div>
  );
}

export default PostPage;
