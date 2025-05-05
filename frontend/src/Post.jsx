import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function App() {
  const [posts, setPosts] = useState([]);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostImage, setNewPostImage] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const navigate = useNavigate();

  const getPosts = async () => {
    try {
      const res = await fetch("http://localhost:3000/posts", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
          Authorization: `Bearer ${token}`,
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

  const deletePost = async (postId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;
  
    try {
      const res = await fetch(`http://localhost:3000/post/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to delete post");
      }
  
      // Filter out the deleted post from state
      setPosts((prev) => prev.filter((post) => post._id !== postId));
    } catch (error) {
      alert(error.message);
      console.error("Delete failed:", error);
    }
  };
  

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <header style={styles.header}>
          <div style={styles.headerTitle}>📅 E V E N T S</div>
          <button
            style={styles.backButton}
            onClick={() => navigate("/home")}
          >
            ← Back to Home
          </button>
        </header>

        <main>
          {token ? (
            <>
              <section style={styles.postScroll}>
                {posts.map((post) => (
                  <div key={post._id} style={styles.postItem}>
                    {post.imageUrl && (
                      <img
                        src={`http://localhost:3000/${post.imageUrl}`}
                        alt={post.title}
                        width={500}
                        style={{ borderRadius: "6px", marginBottom: "10px" }}
                      />
                    )}
                    <h2>{post.title}</h2>
                    <h4>{new Date(post.date).toLocaleDateString()}</h4>
                    <div style={styles.postFooter}>
                      <Link to={`/post/${post._id}`} style={styles.viewLink}>
                        View Details
                      </Link>
                      <button style={styles.deleteButton} onClick={() => deletePost(post._id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </section>

              <section style={styles.form}>
                <h2 style={{ marginBottom: "15px" }}>Add New Event</h2>
                <input
                  type="text"
                  placeholder="Title"
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                  style={styles.input}
                />
                <textarea
                  placeholder="Content"
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  style={styles.textarea}
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setNewPostImage(e.target.files[0])}
                  style={styles.input}
                />
                <button onClick={addPost} style={styles.addButton}>
                  Add Post
                </button>
              </section>
            </>
          ) : (
            <RequiresLogin />
          )}
        </main>
      </div>
    </div>
  );
}

const styles = {
  page: {
    backgroundImage: "url('https://example.com/background.jpg')", // placeholder
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    padding: "20px",
  },
  container: {
    fontFamily: "Arial, sans-serif",
    maxWidth: "1000px",
    margin: "0 auto",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    padding: "20px",
    borderRadius: "10px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    marginBottom: "20px",
  },
  headerTitle: {
    fontSize: "28px",
    fontWeight: "bold",
    letterSpacing: "3px",
  },
  backButton: {
    backgroundColor: "#1890ff",
    color: "#fff",
    border: "none",
    padding: "10px 16px",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  postScroll: {
    display: "flex",
    overflowX: "auto",
    gap: "16px",
    paddingBottom: "10px",
    marginBottom: "30px",
  },
  postItem: {
    minWidth: "320px",
    flexShrink: 0,
    backgroundColor: "#fefefe",
    padding: "20px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    color: "#333",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  postFooter: {
    marginTop: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "#e74c3c",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  viewLink: {
    textDecoration: "none",
    color: "#1890ff",
    fontWeight: "bold",
  },
  form: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
  input: {
    display: "block",
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  textarea: {
    display: "block",
    width: "100%",
    padding: "10px",
    height: "100px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  addButton: {
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

function RequiresLogin() {
  const navigate = useNavigate();
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>You need to log in to view this page.</h2>
      <button
        onClick={() => navigate("/")}
        style={{
          padding: "10px 20px",
          backgroundColor: "#1890ff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Go to Login
      </button>
    </div>
  );
}

export default App;
