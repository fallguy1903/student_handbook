import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const token = localStorage.getItem("token");

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
        console.log(data);
      } 
      catch (error) {
        console.log(error);
      }
    };

    getPost();
  }, [id, token]);

  if (!post) {
    return <h2>Post Not Found</h2>;
  }

  return (
    <div className="post-page">
      <h1 className="post-title">{post.title}</h1>
      <p className="post-meta">
        By <span className="post-author">{post.author.username}</span> on{" "}
        <span className="post-date">
          {new Date(post.date).toLocaleDateString()}
        </span>
      </p>
      <p className="post-content">{post.content}</p>
      <Link to="/post" className="back-link">← Back to Posts</Link>
    </div>
  );
};

export default PostPage;
