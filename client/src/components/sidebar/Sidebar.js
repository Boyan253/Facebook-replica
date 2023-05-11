import "./sidebar.css";
import {
  RssFeed,
  Chat,
  Group,
  Event,
} from "@material-ui/icons";
import CloseFriend from "../closeFriend/CloseFriend";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function Sidebar({ user }) {
  const { auth } = useContext(AuthContext);
  const [showMore, setShowMore] = useState(false);
  const [friends, setFriends] = useState([]);

  if (auth?._id) {
    user = auth;
    user.id = auth._id;
  }

  useEffect(() => {
    const getFriends = async () => {
      try {
        if (user.id) {
          const response = await fetch(`http://localhost:3005/friends/${user.id}`);
          const friendList = await response.json();
          setFriends(friendList);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user?.id]);

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeed className="sidebarIcon" />
            <Link to={'/posts'}> <span className="sidebarListItemText">Posts</span></Link>
          </li>
          {auth?._id ? (
            <>
              <li className="sidebarListItem">
                <Chat className="sidebarIcon" />
                <Link to={'/chat'}><span className="sidebarListItemText">Chat</span></Link>
              </li>
              <li className="sidebarListItem">
                <Group className="sidebarIcon" />
                <Link to={`/profile/${auth._id}`}> <span className="sidebarListItemText">My Profile</span></Link>
              </li>
              {showMore && (
                <>
                  <li className="sidebarListItem">
                    <Event className="sidebarIcon" />
                    <span className="sidebarListItemText">Contact Us</span>
                  </li>
                </>
              )}
            </>
          ) : <p style={{ color: 'red' }}>login to see more</p>}
        </ul>
        <button className="sidebarButton" onClick={(e) => {
          let btn = e.target
          if (btn.textContent == 'More') {
            btn.textContent = 'Less'

          } else {
            btn.textContent = 'More'

          }
          setShowMore(!showMore);
        }}>More</button>
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
          {friends.length > 0 ? friends.map((friend) => (
            <CloseFriend key={friend._id} friends={friend} />
          )) : <p>No friends yet</p>}
        </ul>
      </div>
    </div >
  );
}
