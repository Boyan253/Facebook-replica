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

export default function Sidebar({ user }) {
  const { auth } = useContext(AuthContext)
  // const [user, setUser] = useState()
  if (auth?._id) {

    user = auth
    user.id = auth._id


  }

  const [friends, setFriends] = useState([])
  useEffect(() => {
    const getFriends = async () => {
      try {
        if (user.id) {
          const response = await fetch(`http://localhost:3005/friends/${user.id}`)
          const friendList = await response.json()
          setFriends(friendList)
        }
      } catch (err) {
        console.log(err)
      }
    }
    getFriends()

  }, [user?.id])
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeed className="sidebarIcon" />
            <span className="sidebarListItemText">Posts</span>
          </li>
          <li className="sidebarListItem">
            <Chat className="sidebarIcon" />
            <span className="sidebarListItemText">Chat</span>
          </li>
          {/* <li className="sidebarListItem">
            <PlayCircleFilledOutlined className="sidebarIcon" />
            <span className="sidebarListItemText">Videos</span>
          </li>
          <li className="sidebarListItem">
            <Group className="sidebarIcon" />
            <span className="sidebarListItemText">Groups</span>
          </li>
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
          {/* <li className="sidebarListItem">
            <School className="sidebarIcon" />
            <span className="sidebarListItemText">Courses</span>
          </li> */}
        </ul>
        <button className="sidebarButton">Show More</button>
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
