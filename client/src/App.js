import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import ErrorPage from "./pages/404/404"
import { Routes, Route, useNavigate } from 'react-router-dom'
import * as postService from './service/postService'
import * as userService from './service/userService'
import { Create } from "./pages/create/Create";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { Details } from "./pages/details/Details";
import { Logout } from "./pages/logout/Logout";
import ChatPage from "./pages/chatpage/ChatPage";
import { Edit } from "./pages/edit/Edit";
import { RouteGuard } from "./utils/route-guards/RouteGuards";
import { OptionsModal } from "./components/modals/optionsModal/OptionsModal";


function App() {
  const [posts, setPosts] = useState([])
  const navigate = useNavigate()
  const { auth } = useContext(AuthContext)
  const [like, setLike] = useState(0)

  const likePostHandler = (postId, userId) => {
    const result = fetch(`http://localhost:3005/like/${postId}`, {
      method: 'POST',
      headers: {
        'authorization': auth.payload,
        "content-type": "application/json",

      },
      body: JSON.stringify({ userId })
    }).then(response => response.json())
      .then(data =>
        setLike(data.like)
      )
    window.location.reload()
  }

  const dislikePostHandler = (postId, userId) => {
    const result = fetch(`http://localhost:3005/dislike/${postId}`, {
      method: 'POST',
      headers: {
        'authorization': auth.payload,
        'content-type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    })
      .then(response => response.json())
      .then(data => {
        setLike(data.like)
        window.location.reload()
      }
      )
      .catch(error => console.log(error));

  }

  useEffect(() => {
    postService.getAllPosts()
      .then(posts => {
        setPosts(posts)
      }
      )
  }, [])

  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = (event) => {
    if (event.target.classList.contains('modal-overlay') || event.target.classList.contains('close')) {
      setIsOpen(false);
    }
  }

  const postCreateHandler = async (formData) => {
    const userData = {
      title: formData.get('title'),
      location: formData.get('location'),
      tags: formData.get('tags'),
      description: formData.get('description'),
      image: formData.get('image'),
      owner: auth._id,
      ownerName: auth.username,
      ownerProfilePicture: auth.profilePicture
    };
    if (userData.image && userData.image.name !== '') {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const filePath = e.target.result;
        const imageData = filePath.toString();
        const base64Data = imageData.split(",")[1];

        const binaryData = atob(base64Data);
        userData.image = btoa(binaryData);

        const createdUser = await postService.createPost(userData);
        setPosts(posts => [createdUser, ...posts]);
        navigate('/posts');
      }
      reader.readAsDataURL(userData.image);
    } else {
      const createdUser = await postService.createPost(userData);
      setPosts(posts => [createdUser, ...posts])
      navigate('/posts');
    }
  }

  const postEditHandler = async (formData, postId) => {
    const userData = Object.fromEntries(formData)
    if (userData.image !== undefined) {
      const reader = new FileReader(userData.image)
      reader.onload = async (e) => {
        const filePath = e.target.result;
        const imageData = filePath.toString();
        const base64Data = imageData.split(",")[1];

        const binaryData = atob(base64Data); // vurni b64 kum atob decoding

        userData.image = btoa(binaryData);

        await postService.editPost(postId, userData, auth);
        console.log(userData);
        navigate(`/posts/${postId}`);
        window.location.reload()

      }
      reader.readAsDataURL(userData.image);
    } else {

      //TODO edit filltering pravi posledno 27.03.2023:12:27 v lekciqta za aksiomni mutacii
      await postService.editPost(postId, userData, auth).then(response => { })

      navigate(`/posts/${postId}`);

    }

  };

  const profileEditHandler = async (formData) => {
    const userData = formData
    console.log(userData.image.length === 0 && userData.backgroundImage.length === 0);

    if (userData.image && userData.image.length > 0) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const filePath = e.target.result;
        const imageData = filePath.toString();
        const base64Data = imageData.split(",")[1];

        const binaryData = atob(base64Data);
        userData.image = btoa(binaryData);
        const newAuth = JSON.parse(localStorage.getItem('auth'));
        newAuth.profilePicture = `data:image/png;base64,${userData.image}`;
        localStorage.setItem('auth', JSON.stringify(newAuth));
        await userService.editProfile(auth._id, userData, auth);
        console.log(userData);
        navigate(`/profile/${auth._id}`);
        window.location.reload();
      };
      reader.readAsDataURL(userData.image[0]);
    }

    if (userData.backgroundImage && userData.backgroundImage.length > 0) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const filePath = e.target.result;
        const imageData = filePath.toString();
        const base64Data = imageData.split(",")[1];

        const binaryData = atob(base64Data);
        userData.backgroundImage = btoa(binaryData);
        const newAuth = JSON.parse(localStorage.getItem('auth'));
        newAuth.backgroundImage = `data:image/png;base64,${userData.backgroundImage}`;
        localStorage.setItem('auth', JSON.stringify(newAuth));


        await userService.editProfile(auth._id, userData, auth);
        console.log(userData);
        navigate(`/profile/${auth._id}`);
        window.location.reload();
      };
      reader.readAsDataURL(userData.backgroundImage[0]);
    }

    if (userData.image.length === 0 && userData.backgroundImage.length === 0) {
      console.log('going');
      await userService.editProfile(auth._id, userData, auth);
      console.log(userData);
      navigate(`/profile/${auth._id}`);
      window.location.reload();
    }
  };




  const postDeleteHandler = (postId) => {
    //TODO delete filltering pravi posledno, dovurshi go
    postService.deletePost(postId).then(response => {
      const filteredPosts = posts.filter(post => post._id !== response.deletedPost._id);
      setPosts(filteredPosts);
      // set(filteredUsers);
    })
    navigate('/posts')
  }

  return (
    <>
      {isOpen && <OptionsModal isOpen={isOpen} closeModal={closeModal} openModal={openModal} profileEditHandler={profileEditHandler}></OptionsModal>}
      <Routes>
        <Route path="/posts" element={<Home posts={posts} like={like} likePostHandler={likePostHandler} dislikePostHandler={dislikePostHandler} openModal={openModal} />}></Route>
        <Route path="/posts/:postId" element={<Details posts={posts} postDeleteHandler={postDeleteHandler} />}></Route>
        <Route path="/create" element={<RouteGuard><Create postCreateHandler={postCreateHandler}></Create></RouteGuard>}></Route>
        <Route path="/edit/:postId" element={<RouteGuard><Edit postEditHandler={postEditHandler}></Edit></RouteGuard>}></Route>

        <Route path="/profile/:userId" element={<Profile posts={posts} openModal={openModal} likePostHandler={likePostHandler} dislikePostHandler={dislikePostHandler}> </Profile>}></Route>
        <Route path="/login" element={<Login ></Login>}></Route>
        <Route path="/logout" element={<Logout></Logout>}></Route>

        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/chat" element={<RouteGuard><ChatPage ></ChatPage></RouteGuard>}></Route >
        <Route path="/*" element={<ErrorPage></ErrorPage>}></Route>

      </Routes >
    </>
  )

}

export default App;
