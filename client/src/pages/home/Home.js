import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import "./home.css"
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export default function Home({ posts }) {
  const { auth } = useContext(AuthContext)
  const [like, setLike] = useState(0)
  const likePostHandler = (postId, userId) => {
    const result = fetch(`http://localhost:3005/like/${postId}`, {
      method: 'POST',
      headers: {
        'authorization': auth.payload,
        "content-type": "application/json",

      },
      body: JSON.stringify({ userId })
    }).then(response => response.json())
      .then(data =>
        setLike(data.like)

      )
    window.location.reload()
  }
  if (like === {}) {
    return
  }

  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <Feed posts={posts} likePostHandler={likePostHandler} like={like} />
        <Rightbar />
      </div>
    </>
  );
}
