import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./Routes";
import { AuthProvider } from "./AuthContext/AuthContext";
import { PostProvider } from "./postContext/PostContext";
import { CommentProvider } from "./CommentContext/CommentContext";

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider> 
      <PostProvider>
        <CommentProvider>

      <RouterProvider router={router} />
      
        </CommentProvider>
      </PostProvider>
    </AuthProvider>
  </StrictMode>
);
