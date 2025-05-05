import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await fetch("http://localhost:3000/post/" + id, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        const data = await res.json();
        setPost(data.post);
      } catch (error) {
        console.log(error);
      }
    };

    getPost();
  }, [id, token]);

  const deletePost = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;

    try {
      const res = await fetch("http://localhost:3000/post/" + post._id, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (!res.ok) throw new Error("Failed to delete post");

      navigate("/post");
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete post.");
    }
  };

  if (!post) {
    return <h2 style={{ textAlign: "center", marginTop: "100px" }}>Post Not Found</h2>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{post.title}</h1>
      <p style={styles.meta}>
        By <strong>{post.author.username}</strong> on{" "}
        {new Date(post.date).toLocaleDateString()}
      </p>

      {post.imageUrl && (
        <img
          src={"http://localhost:3000/" + post.imageUrl}
          alt={post.title}
          style={styles.image}
        />
      )}

      <p style={styles.content}>{post.content}</p>

      {userId === post.author._id && (
        <button onClick={deletePost} style={styles.deleteButton}>
          Delete Post
        </button>
      )}

      <Link to="/post" style={styles.backLink}>← Back to Posts</Link>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "800px",
    margin: "40px auto",
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "#fdfdfd",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    fontFamily: "Arial, sans-serif"
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "10px"
  },
  meta: {
    fontSize: "0.9rem",
    color: "#555",
    marginBottom: "20px"
  },
  image: {
    maxWidth: "100%",
    height: "auto",
    marginBottom: "20px",
    borderRadius: "8px"
  },
  content: {
    fontSize: "1.2rem",
    lineHeight: "1.6",
    marginBottom: "30px"
  },
  deleteButton: {
    backgroundColor: "#e74c3c",
    color: "#fff",
    padding: "10px 16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    marginBottom: "20px"
  },
  backLink: {
    display: "inline-block",
    textDecoration: "none",
    color: "#1890ff",
    fontWeight: "bold",
    marginTop: "10px"
  }
};

export default PostPage;
