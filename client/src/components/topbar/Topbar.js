import "./topbar.css";
import { Search, Person, Chat, Settings } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export default function Topbar(user) {
  //isAuthenticated
  const { auth } = useContext(AuthContext)
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <span className="logo">TheFuture</span>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          {auth?.payload && <span className="topbarLink"><Link className={'a'} to="/create">Create</Link>
            <Link className={'a'} to="/logout">Logout</Link>
          </span>}
          {!auth?.payload  && (<span className="topbarLink"><Link className={'a'} to="/login">Login</Link>
            <Link className={'a'} to="/register">Register</Link>
          </span>)}
          <span className="topbarLink">     <Link className={'a'} to="/posts">Homepage</Link></span>


        </div>
        {auth?.payload  && (<div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            {/* <span className="topbarIconBadge">1</span> */}
          </div>
          <div className="topbarIconItem">
            <Link className={'a'} to="/chat"><Chat></Chat></Link>
            {/* <span className="topbarIconBadge">2</span> */}
          </div>
          <div className="topbarIconItem">
            <Settings />
            {/* <span className="topbarIconBadge">20</span> */}
          </div>
        </div>)}

        <Link className={'a'} to={`/profile/${auth?._id}`}><img src={auth?.profilePicture ? auth.profilePicture : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8SiTWYOrsL_Ea5ILRPJlK9bLlBUFgxvyu1TFL4F2JBQ&s"} alt="" className="topbarImg" /></Link>

      </div>
    </div >
  );
}
