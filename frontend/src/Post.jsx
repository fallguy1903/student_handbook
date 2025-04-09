import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostImage, setNewPostImage] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const getPosts = async () => {
    try {
      const res = await fetch("http://localhost:3000/posts", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const data = await res.json();
      setPosts(data.posts);
    } catch (error) {
      console.log(error);
    }
  };

  const addPost = async () => {
    if (!newPostTitle || !newPostContent) return;

    const formData = new FormData();
    formData.append("title", newPostTitle);
    formData.append("content", newPostContent);
    if (newPostImage) {
      formData.append("image", newPostImage);
    }

    try {
      const res = await fetch("http://localhost:3000/post", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to add post");

      const data = await res.json();
      const newPost = data.post;

      setPosts([newPost, ...posts]);
      setNewPostTitle("");
      setNewPostContent("");
      setNewPostImage(null);
      getPosts();
    } catch (error) {
      console.error("Error adding post:", error);
      alert("Failed to add post.");
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>E V E N T S</h1>
      </header>

      <main className="app-main">
        {token ? (
          <>
            <button
              className="button"
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/";
              }}
            >
              Logout
            </button>

            <section className="post-list">
              {posts.map((post) => (
                <Link to={`/post/${post._id}`} key={post._id} className="post-link">
                  <div className="post-item">
                    <h2>{post.title}</h2>
                  </div>
                </Link>
              ))}
            </section>

            <section className="new-post-form">
              <h2>Add New Post</h2>
              <input
                type="text"
                placeholder="Title"
                value={newPostTitle}
                onChange={(e) => setNewPostTitle(e.target.value)}
                className="input-field"
              />
              <textarea
                placeholder="Content"
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                className="textarea-field"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setNewPostImage(e.target.files[0])}
                className="input-field"
              />
              <button onClick={addPost} className="add-button">Add Post</button>
            </section>
          </>
        ) : (
          <RequiresLogin />
        )}
      </main>
    </div>
  );
}

function RequiresLogin() {
  const navigate = useNavigate();
  return (
    <div>
      <h2 className="title">You need to log in to view this page.</h2>
      <button onClick={() => navigate("/")}>Go to Login</button>
    </div>
  );
}

export default App;
