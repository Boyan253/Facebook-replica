import "./closeFriend.css";

export default function CloseFriend({ friends }) {
  return (
    <li className="sidebarFriend">
      <img className="sidebarFriendImg" src={friends.profilePicture} alt="" />
      <span className="sidebarFriendName">{friends.username}</span>
    </li>
  );
}
