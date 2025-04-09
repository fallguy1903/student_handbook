import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const token = localStorage.getItem("token");
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

  const deletePost = async () => {
    console.log('DELETERRFDS', "http://localhost:3000/post/" + post._id);
    
    const res = await fetch("http://localhost:3000/post/" + post._id, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    const data = await res.json();
    console.log(data.msg);
    navigate("/post");
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
      {post.imageUrl && (
        <img src={"http://localhost:3000/" + post.imageUrl} alt={post.title} className="post-image" width={500}/>
      )}
      <p className="post-content">{post.content}</p>
      <button onClick={() => {deletePost()}}>Delete</button>
      <br/>
      <Link to="/post" className="back-link">← Back to Posts</Link>
    </div>
  );
};

export default PostPage;
