import "./rightbar.css";
import Online from "../online/Online";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { FriendsBar } from "../friendsBar/FriendsBar";

export default function Rightbar({ profile, user }) {
  const { auth } = useContext(AuthContext)
  const [friends, setFriends] = useState([])
  const [followed, setFollowed] = useState(auth.friends?.includes(user?.id))
  console.log(auth.friends);
  useEffect(() => {
    if (auth.friends?.includes(user.id)) {
      setFollowed(data => data = true)
    } else {
      setFollowed(false)

    }
  }, [user])
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
  const handleFollowClick = async () => {
    try {
      if (followed) {
        const response = await fetch(`http://localhost:3005/unfollow/${user.id}`, {
          method: "PUT",
          headers: { "content-type": "application/json", },
          body: JSON.stringify({ userId: auth._id })
        })
        auth.friends = auth.friends.filter(id => id !== user.id);
        const authData = JSON.parse(localStorage.getItem('auth'));
        authData.friends = auth.friends;
        localStorage.setItem('auth', JSON.stringify(authData));
      } else {
        const response = await fetch(`http://localhost:3005/follow/${user.id}`, {
          method: "PUT",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify({ userId: auth._id })
          //lastly here \/
        }).then(res => res.json()).then(data => {
          console.log(data);
          auth.friends.push(...data.friends)
          localStorage.setItem('auth', JSON.stringify(auth));
        })
      }

    } catch (err) {
      console.log(err);
    }
    setFollowed(!followed)
  }


  const HomeRightbar = () => {
    return (
      <>
        {/* <div className="birthdayContainer">
          <img className="birthdayImg" src="https://imagesvc.meredithcorp.io/v3/mm/image?q=60&c=sc&poi=%5B900%2C533%5D&w=2000&h=1333&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F47%2F2021%2F03%2F12%2Fpomeranian-white-puppy-921029690-2000.jpg" alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div> */}
        {/* <img className="rightbarAd" src="https://imagesvc.meredithcorp.io/v3/mm/image?q=60&c=sc&poi=%5B900%2C533%5D&w=2000&h=1333&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F47%2F2021%2F03%2F12%2Fpomeranian-white-puppy-921029690-2000.jpg" alt="" /> */}
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {friends.length > 0 ? friends.map(friend => (< Online key={friend._id} friends={friend} ></Online>)) : <p>No friends yet</p>}

        </ul>
      </>
    );
  };
  const ProfileRightbar = () => {
    return (
      <>
        {user?.id !== auth._id && (<><button className="addFriendBtn" onClick={(e) => handleFollowClick()}> {followed ? 'Unfollow' : 'Follow'}</button></>)}
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">New York</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">Madrid</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">Single</span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends.length > 0 ? friends.map(friend => (< FriendsBar key={friend._id} friends={friend} ></FriendsBar>)) : <p>No followings yet</p>}
          {/* <div className="rightbarFollowing">
            <img
              src="/assets/person/1.jpeg"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="/assets/person/2.jpeg"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="/assets/person/3.jpeg"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="/assets/person/4.jpeg"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="/assets/person/5.jpeg"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="/assets/person/6.jpeg"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div> */}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {profile ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
