import { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../styles/CreatePost.module.css";
import LoadingDots from "./loadings/LoadingDot";
import { PostContext } from "../postContext/PostContext";
import { AuthContext } from "../AuthContext/AuthContext";
import { FaPen } from "react-icons/fa";

function CreatePost() {
  const location = useLocation(); // stores the state from navigate
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const token = auth?.token;

  const { createPost, updatePost } = useContext(PostContext);

  const editingPost = location.state?.post || null; // get post from navigation
  const isEditing = !!editingPost;

  const [title, setTitle] = useState(editingPost?.title || "");
  const [content, setContent] = useState(editingPost?.content || "");
  const [published, setPublished] = useState(editingPost?.published || false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionStatus(null);
    setErrorMessage("");

    if (!title.trim() || !content.trim()) {
      setSubmissionStatus("error");
      setErrorMessage("Please fill out both the title and content fields.");
      return;
    }

    setIsSubmitting(true);
    const postData = { title, content, published };

    try {
      let result;
      if (isEditing) {
        result = await updatePost(editingPost.id, postData, token);
      } else {
        result = await createPost(postData, token);
      }

      if (result.success) {
        setSubmissionStatus("success");
        setTimeout(() => navigate("/"), 2000);
      } else {
        setSubmissionStatus("error");
        setErrorMessage(result.message);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      setSubmissionStatus("error");
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Automatically hide the status message after 3 seconds
  useEffect(() => {
    if (submissionStatus) {
      const timer = setTimeout(() => {
        setSubmissionStatus(null);
        setErrorMessage("");
      }, 3000);

      return () => clearTimeout(timer); // cleanup if component unmounts
    }
  }, [submissionStatus]);

  return (
    <div className={styles.createPostContainer}>
      <h2 className={styles.heading}>
        {isEditing ? "Update Post" : "Create a New Post"}
      </h2>
      <hr />
      <form onSubmit={handleSubmit} className={styles.postForm}>
        <div className={styles.formGroup}>
          <label htmlFor="title" className={styles.label}>
            Post Title
          </label>
          <input
            type="text"
            id="title"
            className={styles.input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isSubmitting}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="content" className={styles.label}>
            Post Content
          </label>
          <textarea
            id="content"
            className={styles.textarea}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={isSubmitting}
            required
          />
        </div>

        <div className={styles.checkboxGroup}>
          <input
            type="checkbox"
            id="published"
            className={styles.checkbox}
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            disabled={isSubmitting}
          />
          <label htmlFor="published" className={styles.checkboxLabel}>
            Publish immediately
          </label>
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          <FaPen />{" "}
          {isSubmitting
            ? <LoadingDots />
            : isEditing
            ? "Update Post"
            : "Create Post"}
        </button>
      </form>

      {submissionStatus && (
        <p className={`${styles.statusMessage} ${styles[submissionStatus]}`}>
          {submissionStatus === "error"
            ? errorMessage
            : isEditing
            ? "Post updated successfully!"
            : "Post created successfully!"}
        </p>
      )}
    </div>
  );
}

export default CreatePost;
