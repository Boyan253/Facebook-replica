import "./sidebar.css";
import {
  RssFeed,
  Chat,
  // PlayCircleFilledOutlined,
  // Group,
  // Bookmark,
  // HelpOutline,
  // WorkOutline,
  Event,
  // School,
} from "@material-ui/icons";
import CloseFriend from "../closeFriend/CloseFriend";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function Sidebar({ user }) {
  const { auth } = useContext(AuthContext)
  // const [user, setUser] = useState()
  if (auth?._id) {

    user = auth
    user.id = auth._id

  }

  useEffect(() => {
    const getFriends = async () => {
      try {
        if (user.id) {
          const response = await fetch(`https://future-server.onrender.com/friends/${user.id}`)
          const friendList = await response.json()
          setFriends(friendList)
        }
      } catch (err) {
        console.log(err)
      }
    }
    getFriends()

  }, [user?.id])
  const [friends, setFriends] = useState([])

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeed className="sidebarIcon" />
            <Link to={'/posts'}> <span className="sidebarListItemText">Posts</span></Link>
          </li>
          {auth?._id ? <li className="sidebarListItem">
            <Chat className="sidebarIcon" />
            <Link to={'/chat'}><span className="sidebarListItemText">Chat</span></Link>
          </li> : ''}

          {/* <li className="sidebarListItem">
            <PlayCircleFilledOutlined className="sidebarIcon" />
            <span className="sidebarListItemText">Videos</span>
          // </li>
          // // <li className="sidebarListItem">
          // //   <Group className="sidebarIcon" />
          // //   <span className="sidebarListItemText">Groups</span>
          // // </li>
          <li className="sidebarListItem">
            <Bookmark className="sidebarIcon" />
            <span className="sidebarListItemText">Bookmarks</span>
          </li>
          <li className="sidebarListItem">
            <HelpOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Questions</span>
          </li>
          <li className="sidebarListItem">
            <WorkOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Jobs</span>
          </li> */}
          <li className="sidebarListItem">
            <Event className="sidebarIcon" />
            <span className="sidebarListItemText">Contact Us</span>
          </li>
           
        </ul>
        <button className="sidebarButton">More</button>
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
          {friends.length > 0 ? friends.map((friend) => (
            <CloseFriend key={friend._id} friends={friend} />
          )) : <p>No friends yet</p>}
        </ul>
      </div>
    </div>
  );
}
