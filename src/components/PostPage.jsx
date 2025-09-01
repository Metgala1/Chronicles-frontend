import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback, useContext } from "react";
import styles from "../styles/PostPage.module.css";
import LoadingDots from "./loadings/LoadingDot";
import { FaPaperPlane, FaTrash, FaEdit, FaUser } from "react-icons/fa"; 
import { AuthContext } from "../AuthContext/AuthContext";
import { PostContext } from "../postContext/PostContext";
import { CommentContext } from "../CommentContext/CommentContext";
import { Link } from "react-router-dom";

function PostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const { auth } = useContext(AuthContext);
  const user = auth?.user?.id;

  const { deletePost } = useContext(PostContext);
  const { comments, isLoading, isPosting, fetchComments, createComment, deleteComment } = useContext(CommentContext);

  const [newComment, setNewComment] = useState("");
  const [isPostLoading, setIsPostLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

 
  const fetchPost = useCallback(async () => {
    try {
      setIsPostLoading(true);
      const res = await fetch(`${BACKEND_URL}/posts/${id}`);
      const data = await res.json();
      setPost(data);
      await fetchComments(id);
    } catch (err) {
      console.error("Failed to fetch post:", err);
      setError("Failed to load post. Please check your connection and try again later.");
    } finally {
      setIsPostLoading(false);
    }
  }, [id, BACKEND_URL]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    const result = await createComment(id, newComment);
    if (result.success) setNewComment("");
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Delete this comment?")) return;
    await deleteComment(commentId);
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this post?")) return;
    setIsDeleting(true);
    const result = await deletePost(post.id);
    if (result.success) navigate("/");
    setIsDeleting(false);
  };

  const handleUpdate = () => navigate("/createpost", { state: { post } });

  if (isPostLoading) return <div className={styles.loadingDiv}><LoadingDots /></div> ;
  if (error) return <p className={`${styles.status} ${styles.error}`}>{error}</p>;
  if (!post) return <p className={styles.status}>No post found.</p>;

  return (
    <div className={styles.postPage}>
      <article className={styles.postCard}>
        <h1 className={styles.title}>{post.title}</h1>
         <img
            src={`${BACKEND_URL}${post.imageUrl}`}
            alt={post.title}
            className={styles.postImage}
              />
        <p className={styles.content}>{post.content}</p>
        <p className={styles.author}><FaUser /> <b>Author:</b> {post?.author?.username || "Unknown"}</p>

        {user === post?.author?.id && (
          <div className={styles.postActions}>
            <button onClick={handleUpdate} className={styles.updateBtn}><FaEdit /> Update Post</button>
            <button onClick={handleDelete} className={styles.deleteBtn} disabled={isDeleting}>
              {isDeleting ? "Deleting..." : <><FaTrash /> Delete Post</>}
            </button>
          </div>
        )}
      </article>

      <section className={styles.commentsSection}>
        <h3 className={styles.commentHeader}>Comments ({comments.length})</h3>
        <div className={styles.comments}>
          {isLoading ? <LoadingDots /> : comments.length > 0 ? (
            comments.map(c => (
              <div key={c.id} className={styles.comment}>
                <p>{c.content}</p>
                <small>— <FaUser /> {c.user?.username || "Anonymous"} </small>
                <small>{new Date(c.createdAt).toDateString()}</small>
                {user === c.user?.id && (
                  <button className={styles.deleteCommentBtn} onClick={() => handleDeleteComment(c.id)}>Delete</button>
                )}
                {console.log(c)}
              </div>
            ))
          ) : (
            <p className={styles.noComments}>No comments yet.</p>
          )}
        </div>
         {user &&  <form onSubmit={handleCommentSubmit} className={styles.commentBox}>
          <textarea
            className={styles.textarea}
            placeholder="Write a comment..."
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
            disabled={isPosting}
          />
          <button type="submit" className={styles.button} disabled={isPosting}>
            <FaPaperPlane /> {isPosting ? <LoadingDots /> : "Post Comment"}
          </button>
        </form>}
        {!user && <p style={{ textAlign: "center", margin: "auto", fontSize: "larger" }}><Link to={'/login'}>Sign in</Link> to write a comment</p>}

       
      </section>
    </div>
  );
}

export default PostPage;
