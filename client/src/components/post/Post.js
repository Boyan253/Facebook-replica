import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

export default function Post({ post, likePostHandler }) {
  const { isAuthenticated, auth } = useContext(AuthContext)
  const [likes] = useState(post ? post.likes.length : 0)
  let isLiked = false
  const isOwner = post?.owner === auth?._id
  if (!isOwner) {

    isLiked = post?.likes.includes(auth?._id)
  }
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${post.owner}`}><img
              className="postProfileImg"
              src={post ? post.ownerProfilePicture : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8SiTWYOrsL_Ea5ILRPJlK9bLlBUFgxvyu1TFL4F2JBQ&s'}
              alt="public"

            /></Link>
            <span className="postUsername">
              {post.ownerName}
            </span>
            <span className="postDate">{post.createdAt}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.description}</span>
          <Link to={`/posts/${post._id}`}>  <img className="postImg" src={post.imageUrl} alt="" /></Link>
        </div>
        <div className="postBottom">

          <div className="postBottomLeft">
            {isAuthenticated && !isOwner && !isLiked && <> <img className="likeIcon" src="assets/like.png" onClick={(e) => likePostHandler(post?._id, auth._id)} alt="" />
              <img className="likeIcon" src="assets/heart.png" onClick={(e) => likePostHandler(post?._id, auth._id)} alt="" />
            </>
            }
            <span className="postLikeCounter">{likes} people liked it</span>

          </div>
          <div className="postBottomRight">
            <Link to={`/posts/${post._id}`}><span className="postCommentText">{post.comment} Comments</span></Link>
          </div>
        </div>
      </div>
    </div >
  );
}
