import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export default function Profile({ posts, openModal, likePostHandler }) {
  const navigate = useNavigate()
  const { userId } = useParams()
  const [post, setPost] = useState([])
  const [user, setUser] = useState({ reworkedUser: {} });
  const { auth } = useContext(AuthContext)
  useEffect(() => {
    let isMounted = true;
    const fetchPost = async () => {
      if (userId === 'undefined') {
        console.log('is it undefined?');
        return navigate('/login')
      } else {
        const response = await fetch(`http://localhost:3005/profile/${userId}`, {
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
        if (isMounted) { // check if component is still mounted
          setPost(result)
        }

      }
    }


    const fetchUser = async () => {
      if (userId === 'undefined') {
        return navigate('/login')
      }

      const response = await fetch(`http://localhost:3005/users/${userId}`, {
        headers: { 'authorization': auth.payload }
      }).catch((err) => {
        console.log(err);
        navigate('/login')
        return
      })
      if (response.status !== 200) {
        console.log('error');
        navigate('/posts')

      }
      const result = await response.json()
      if (isMounted) {
        setUser(result)
      }
    }
    fetchUser()
    fetchPost()
    return () => {
      isMounted = false;
    };
  }, [userId, navigate, auth])


  if (!auth.payload) {
    return <Navigate to={'/login'}></Navigate>
  }
  console.log(user);
  return (
    <>
      <Topbar user={user} openModal={openModal} />
      <div className="profile">
        <Sidebar user={user.reworkedUser} />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={user.reworkedUser.backgroundImage || "https://marketplace.canva.com/EAEmB3DmXk0/1/0/1600w/canva-bright-gradient-lettering-rainbow-facebook-cover-0Z5QgybLshE.jpg"}
                alt=""
              />
              <img
                className="profileUserImg"
                src={user.reworkedUser.profilePicture}
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.reworkedUser.username}</h4>
              <span className="profileInfoDesc">Hello my friends!</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed posts={post} user={user} likePostHandler={likePostHandler} />
            <Rightbar profile user={user.reworkedUser} />
          </div>
        </div>
      </div>
    </>
  );
}
