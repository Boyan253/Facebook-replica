import { Link } from 'react-router-dom'
import './friendsbar.css'


export function FriendsBar(friends) {
  const friend = friends.friends
  return (<> <div className="rightbarFollowing">
    <Link to={`/profile/${friend._id}`}> <img
      src={friend.profilePicture}
      alt=""
      className="rightbarFollowingImg"
    /></Link>
    <span className="rightbarFollowingName">{friend.username}</span>
  </div></>)

}