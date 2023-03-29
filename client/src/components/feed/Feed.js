import Post from "../post/Post";
// import Share from "../share/Share";
import "./feed.css";

export default function Feed({ posts, user, likePostHandler }) {
  // Comments
  const getComments = () => {

  }




  return (
    <div className="feed">
      <div className="feedWrapper">
        {/* <Share /> */}
        {posts.map((post) => (
          <Post key={post._id} post={post} user={user} likePostHandler={likePostHandler} />
        ))}
        {posts.length === 0 && (<p>No Posts</p>)}
      </div>
    </div>
  );
}
