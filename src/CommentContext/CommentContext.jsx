import { createContext, useState, useContext, useCallback } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContext/AuthContext";

export const CommentContext = createContext();

export const CommentProvider = ({ children }) => {
  const { auth } = useContext(AuthContext);
  const token = auth?.token;

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


  const fetchComments = useCallback( async (postId) => {
    try {
      setLoading(true);
      const res = await axios.get(`${BACKEND_URL}/comments/post/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComments(res.data);
    } catch (err) {
      console.error("Failed to fetch comments:", err);
    } finally {
      setLoading(false);
    }
  },[BACKEND_URL]);

  const createComment = async (postId, content) => {
    if (!token) return { success: false, message: "User not authenticated" };
    try {
      const res = await axios.post(
        `${BACKEND_URL}/comments/post/${postId}`,
        { content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComments((prev) => [res.data, ...prev]);
      return { success: true, comment: res.data };
    } catch (err) {
      console.error("Failed to create comment:", err.response?.data || err.message);
      return { success: false, message: err.response?.data?.message || "Failed to create comment" };
    }
  };

  const deleteComment = async (commentId) => {
    if (!token) return { success: false, message: "User not authenticated" };
    try {
      await axios.delete(`${BACKEND_URL}/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComments((prev) => prev.filter((c) => c.id !== commentId));
      return { success: true };
    } catch (err) {
      console.error("Failed to delete comment:", err.response?.data || err.message);
      return { success: false, message: err.response?.data?.message || "Failed to delete comment" };
    }
  };

  return (
    <CommentContext.Provider
      value={{ comments, loading, fetchComments, createComment, deleteComment }}
    >
      {children}
    </CommentContext.Provider>
  );
};
