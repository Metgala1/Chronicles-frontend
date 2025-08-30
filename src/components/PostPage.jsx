import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback, useContext } from "react";
import axios from "axios";
import styles from "../styles/PostPage.module.css";
import LoadingDots from "./loadings/LoadingDot";
import { FaPaperPlane, FaTrash, FaEdit } from "react-icons/fa"; 
import { AuthContext } from "../AuthContext/AuthContext";
import { PostContext } from "../postContext/PostContext";

function PostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { auth } = useContext(AuthContext);
  const user = auth?.user?.id;

  const { deletePost } = useContext(PostContext);

  const [isPostLoading, setIsPostLoading] = useState(true);
  const [isCommentPosting, setIsCommentPosting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [error, setError] = useState(null);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const fetchPostAndComments = useCallback(async () => {
    try {
      setIsPostLoading(true);
      const res = await axios.get(`${BACKEND_URL}/posts/${id}`);
      setPost(res.data);
      setComments(res.data.comments || []);
    } catch (err) {
      console.error("Failed to fetch post:", err);
      setError("Failed to load post. Please check your connection and try again later.");
    } finally {
      setIsPostLoading(false);
    }
  }, [id, BACKEND_URL]);

  useEffect(() => {
    fetchPostAndComments();
  }, [fetchPostAndComments]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) {
      alert("Comment cannot be empty.");
      return;
    }

    try {
      setIsCommentPosting(true);
      const res = await axios.post(`${BACKEND_URL}/posts/${id}/comments`, {
        content: newComment,
      });
      setComments((prev) => [res.data, ...prev]); 
      setNewComment("");
    } catch (err) {
      console.error("Failed to post comment:", err);
      alert("Failed to post comment. You may need to be logged in."); 
    } finally {
      setIsCommentPosting(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      setIsDeleting(true);
      const result = await deletePost(post.id);
      if (result.success) {
        navigate("/");
      } else {
        alert(result.message || "Failed to delete post.");
      }
    } catch (err) {
      console.error("Error deleting post:", err);
      alert("Unexpected error while deleting.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUpdate = () => {
    navigate("/createpost", { state: { post } });
  };

  if (isPostLoading) return <LoadingDots />;
  if (error) return <p className={`${styles.status} ${styles.error}`}>{error}</p>;
  if (!post) return <p className={styles.status}>No post found with this ID. It may have been deleted.</p>;

  return (
    <div className={styles.postPage}>
      <article className={styles.postCard}>
        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.content}>{post.content}</p>
        <p className={styles.author}>
          <b>Author:</b> {post?.author?.username || "Unknown"}
        </p>

        {user === post?.author?.id && (
          <div className={styles.postActions}>
            <button 
              onClick={handleUpdate} 
              className={styles.updateBtn}
            >
              <FaEdit /> Update Post
            </button>
            <button 
              onClick={handleDelete} 
              className={styles.deleteBtn} 
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : <><FaTrash /> Delete Post</>}
            </button>
          </div>
        )}
      </article>

      <section className={styles.commentsSection}>
        <h3 className={styles.commentHeader}>Comments ({comments.length})</h3>
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

        <form onSubmit={handleCommentSubmit} className={styles.commentBox}>
          <textarea
            className={styles.textarea}
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            disabled={isCommentPosting}
          />
          <button 
            type="submit" 
            className={styles.button} 
            disabled={isCommentPosting}
          >
            <FaPaperPlane /> {isCommentPosting ? <LoadingDots /> : "Post Comment"}
          </button>
        </form>
      </section>
    </div>
  );
}

export default PostPage;
