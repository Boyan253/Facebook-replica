import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import ErrorPage from "./pages/404/404"
import { Routes, Route, useNavigate } from 'react-router-dom'
import * as postService from './service/postService'
import { Create } from "./pages/create/Create";
import { useContext, useEffect, useState } from "react";
import { AuthContext, AuthProvider } from "./contexts/AuthContext";
import { Details } from "./pages/details/Details";
import { Logout } from "./pages/logout/Logout";
import ChatPage from "./pages/chatpage/ChatPage";
import { Edit } from "./pages/edit/Edit";
import { RouteGuard } from "./utils/route-guards/RouteGuards";

function App() {
  const [posts, setPosts] = useState([])
  const navigate = useNavigate()
  const { auth } = useContext(AuthContext)
  console.log(auth);
  useEffect(() => {
    postService.getAllPosts()
      .then(posts => setPosts(posts)
      )
  }, [])

  const postCreateHandler = async (formData) => {


    const userData = {
      title: formData.get('title'),
      location: formData.get('location'),
      tags: formData.get('tags'),
      description: formData.get('description'),
      image: formData.get('image'),
      owner: auth._id,
      ownerName: auth.username
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
        setPosts(posts => [...posts, createdUser]);
        navigate('/posts');
      }
      reader.readAsDataURL(userData.image);
    } else {
      const createdUser = await postService.createPost(userData);
      setPosts(posts => [...posts, createdUser]);
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

        navigate(`/posts/${postId}`);

      }
      reader.readAsDataURL(userData.image);
    } else {
      //TODO edit filltering pravi posledno 27.03.2023:12:27 v chas po IT
      const editedUser = await postService.editPost(postId, userData, auth).then(response => {
        console.log(response);
      })




      navigate(`/posts/${postId}`);

    }

  };
  const postDeleteHandler = (postId) => {
    //TODO delete filltering pravi posledno, dovurshi go
    const deletedPost = postService.deletePost(postId).then(response => {
      console.log(response);
      const filteredPosts = posts.filter(post => post._id !== response.deletedPost._id);
      setPosts(filteredPosts);
      // set(filteredUsers);
    })
    navigate('/posts')
  }

  return (


    <Routes>
      <Route path="/posts" element={<Home posts={posts} />}></Route>
      <Route path="/posts/:postId" element={<Details posts={posts} postDeleteHandler={postDeleteHandler} />}></Route>
      <Route path="/create" element={<Create postCreateHandler={postCreateHandler}></Create>}></Route>
      <Route path="/edit/:postId" element={<RouteGuard><Edit postEditHandler={postEditHandler}></Edit></RouteGuard>}></Route>

      <Route path="/profile/:userId" element={<Profile posts={posts}></Profile>}></Route>
      <Route path="/login" element={<Login ></Login>}></Route>
      <Route path="/logout" element={<Logout></Logout>}></Route>

      <Route path="/register" element={<Register></Register>}></Route>
      <Route path="/chat" element={<ChatPage ></ChatPage>}></Route>
      <Route path="/*" element={<ErrorPage></ErrorPage>}></Route>
    </Routes>
  )

}

export default App;
