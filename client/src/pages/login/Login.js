import Topbar from "../../components/topbar/Topbar";
import "./login.css";
import * as userService from "../../service/userService"
import { AuthContext } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { useForm } from 'react-hook-form'
import socketIO from 'socket.io-client'

const socket = socketIO.connect('http://localhost:3005');

export default function Login() {
  const { userLogin } = useContext(AuthContext)
  let { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: "",
      password: "",
    }
  })

  const errorResponse = (error) => { console.log(error); }


  const loginOptions = {
    email: { required: "Email is required" },
    password: {
      required: "Password is required",
      minLength: {
        value: 8,
        message: "Password must have at least 8 characters"
      },

    },

  }
  const navigate = useNavigate()
  const onLoginHandler = (data) => {
    let email = data.email
    let password = data.password


    userService.login(email, password)
      .then(authData => {
        userLogin(authData)
        localStorage.setItem('userName', email);

        socket.emit('newUser', { email, socketID: socket.id });
        navigate('/posts')
      })
      .catch((err) => {
        console.log(err);
        return
      })
  }


  return (

    <>
      <div className="errorContainer">
        {errors?.email && <p className="fade-in">{errors?.email.message}</p>}
        {errors?.password && <p className="fade-in">{errors?.password.message}</p>}

      </div>
      <Topbar />
      <div className="login">
        <form onSubmit={handleSubmit(onLoginHandler, errorResponse)}>
          <div className="loginWrapper">
            <div className="loginLeft">
              <h3 className="loginLogo">The Future</h3>
              <span className="loginDesc">
                Be with friends in the BobVerse world on TheFuture from &copy;BobCompany.
              </span>

            </div>
            <div className="loginRight">
              <div className="loginBox">
                <input placeholder="Email" className="loginInput" name="email"{...register("email", loginOptions.email)} />
                <input placeholder="Password" className="loginInput" name="password"{...register("password", loginOptions.password)} />
                <button className="loginButton">Log In</button>
                <span className="loginForgot">

                </span>

                <Link to={"/register"}><button className="loginRegisterButton">Sign Up</button></Link>

              </div>
            </div>
          </div></form>
      </div>




    </>
  );
}