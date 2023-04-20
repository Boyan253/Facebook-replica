import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import "./home.css"
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Home({ posts, like, likePostHandler, dislikePostHandler, openModal, loading , openFriendsModal}) {
  const { auth } = useContext(AuthContext)
  const [user, setUser] = useState({ reworkedUser: {} });
   // Add loading state

  const navigate = useNavigate()

  useEffect(() => {
    let isMounted = true;
    const fetchUser = async () => {
      if (auth.payload) {
        const response = await fetch(`https://future-server.onrender.com/users/${auth._id}`, {
          headers: { 'authorization': auth.payload }
        }).catch((err) => {
          console.log(err);
          navigate('/posts')
          return
        })
        if (response.status !== 200) {
          console.log('error');
          navigate('/posts')
        }
        const result = await response.json()
        if (isMounted) {
          setUser(result);
        }
      }
    }
    fetchUser()
    return () => {
      isMounted = false;
    };
  }, [navigate, auth])

  return (
    <>
      <Topbar openModal={openModal} user={user.reworkedUser} openFriendsModal={openFriendsModal} />
      <div className={`homeContainer ${loading ? "loading" : "loaded"}`}> 
        {loading && <div className="spinner" />}
        <Sidebar user={user.reworkedUser} />
        <Feed posts={posts} likePostHandler={likePostHandler} dislikePostHandler={dislikePostHandler} like={like} />
        <Rightbar user={user.reworkedUser} />
      </div>
    </>
  );
}
