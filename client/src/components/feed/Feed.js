import { useState, useEffect } from "react";
import Post from "../post/Post";
import "./feed.css";

export default function Feed({ posts, user, likePostHandler, dislikePostHandler }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [posts]);

  return (
    <div className="feed">
      {loading && (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}
      <div className={`feedWrapper ${loading ? "blur" : ""}`}>
        {posts.map((post, index) => (
          <Post
            key={post._id}
            post={post}
            user={user}
            likePostHandler={likePostHandler}
            dislikePostHandler={dislikePostHandler}
            style={{
              animationDelay: `${(index + 1) * 0.7}s`,
            }}
          />
        ))}
        {posts.length === 0 && <p>No Posts</p>}
      </div>
    </div>
  );
}
