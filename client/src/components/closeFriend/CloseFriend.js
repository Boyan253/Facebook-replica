import { Link } from "react-router-dom";
import "./closeFriend.css";

export default function CloseFriend({ friends }) {
  return (
    <li className="sidebarFriend">
      <Link to={`/profile/${friends._id}`}><img className="sidebarFriendImg" src={friends.profilePicture} alt="" /></Link>
      <span className="sidebarFriendName">{friends.username}</span>
    </li>
  );
}
