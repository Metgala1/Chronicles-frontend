import { createContext, useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContext/AuthContext";

export const PostContext = createContext();

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const api = axios.create({
  baseURL: BASE_URL,
});

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { auth } = useContext(AuthContext);
  const token = auth?.token;

  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use((config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    return () => {
      api.interceptors.request.eject(requestInterceptor);
    };
  }, [token]);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get("/posts");
      setPosts(data);
    } catch (err) {
      console.error("Error fetching posts:", err.response?.data || err.message);
      setError("Failed to load posts.");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchPostById = useCallback(async (id) => {
    try {
      const { data } = await api.get(`/posts/${id}`);
      return { success: true, post: data };
    } catch (err) {
      console.error("Error fetching post:", err.response?.data || err.message);
      return { success: false, message: "Failed to fetch post." };
    }
  }, []);

  const createPost = async ({ title, content, published = false }, token) => {
    if (!token) return { success: false, message: "User not authenticated." };

    try {
      const { data } = await api.post("/posts", { title, content, published },{ headers: { Authorization: `Bearer ${token}` } });
      setPosts((prev) => [data, ...prev]);
      return { success: true, post: data };
    } catch (err) {
      console.error("Error creating post:", err.response?.data || err.message);
      return { success: false, message: err.response?.data?.message || "Failed to create post." };
    }
  };

  const updatePost = async (id, { title, content }) => {
    if (!token) return { success: false, message: "User not authenticated." };
    try {
      const { data } = await api.put(`/posts/${id}`, { title, content });
      setPosts((prev) =>
        prev.map((post) => (post.id === id ? { ...post, ...data } : post))
      );
      return { success: true, post: data };
    } catch (err) {
      console.error("Error updating post:", err.response?.data || err.message);
      return { success: false, message: err.response?.data?.message || "Failed to update post." };
    }
  };

  const deletePost = async (id) => {
    if (!token) return { success: false, message: "User not authenticated." };
    try {
      await api.delete(`/posts/${id}`);
      setPosts((prev) => prev.filter((post) => post.id !== id));
      return { success: true };
    } catch (err) {
      console.error("Error deleting post:", err.response?.data || err.message);
      return { success: false, message: err.response?.data?.message || "Failed to delete post." };
    }
  };

  const togglePublish = async (id) => {
    if (!token) return { success: false, message: "User not authenticated." };
    try {
      const { data } = await api.patch(`/posts/${id}/publish`);
      setPosts((prev) =>
        prev.map((post) => (post.id === id ? { ...post, published: data.post.published } : post))
      );
      return { success: true, post: data.post };
    } catch (err) {
      console.error("Error toggling publish:", err.response?.data || err.message);
      return { success: false, message: err.response?.data?.message || "Failed to toggle publish." };
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <PostContext.Provider
      value={{
        posts,
        loading,
        error,
        fetchPosts,
        fetchPostById,
        createPost,
        updatePost,
        deletePost,
        togglePublish,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};