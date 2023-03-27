import "./register.css";
import * as userService from '../../service/userService'
import { useContext } from 'react'
import Topbar from "../../components/topbar/Topbar";

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import socketIO from 'socket.io-client'

import { AuthContext } from "../../contexts/AuthContext";
const socket = socketIO.connect('http://localhost:3005');

export default function Register() {
  const navigate = useNavigate()
  const { userRegister } = useContext(AuthContext)
  let { register, handleSubmit, formState: { errors }, getValues } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      repass: ""
    }
  })

  const errorResponse = (error) => { console.log(error); }


  const registerOptions = {
    name: { required: "Name is required" },
    email: { required: "Email is required" },
    password: {
      required: "Password is required",
      minLength: {
        value: 8,
        message: "Password must have at least 8 characters"
      },

    },
    repass: {
      validate: (value) => value === getValues().password || "Passwords don't match"
    }
  }


  const handleRegistration = (data) => {


    // Validirai !! \/
    if (data.password !== data.repass) {

      console.log('passwords dont match');
      return
    }

    // prashtam inputa kum back end apito
    userService.register(data)
      .then((authData) => {
        userRegister(authData)
        const email = data.email
        localStorage.setItem('userName', email);

        socket.emit('newUser', { email, socketID: socket.id });
        navigate('/posts')
      }).catch(() => {
        navigate('/404')
      })
  };
  return (
    <>
      <Topbar></Topbar>
      <div className="errorContainer">
        {errors?.username && <p className="fade-in">{errors.username.message}</p>}
        {errors?.email && <p className="fade-in">{errors.email.message}</p>}
        {errors?.password && <p className="fade-in">{errors.password.message}</p>}
        {errors?.repass && <p className="fade-in">{errors.repass.message}</p>}


      </div>
      <form onSubmit={handleSubmit(handleRegistration, errorResponse)}>
        <div className="login">
          <div className="loginWrapper">
            <div className="loginLeft">
              <h3 className="loginLogo">TheFuture</h3>
              <span className="loginDesc">
                Be with friends in the BobVerse world on TheFuture from &copy;BobCompany.
              </span>
            </div>
            <div className="loginRight">
              <div className="loginBox">
                <input placeholder="Username" className="loginInput" name="username" {...register('username', registerOptions.name)} />
                <input placeholder="Email" className="loginInput" name="email"{...register('email', registerOptions.email)} />

                <input placeholder="Password" className="loginInput" name="password" {...register('password', registerOptions.password)} />
                <input placeholder="Password Again" className="loginInput" name="repass" {...register('repass', registerOptions.repass)} />
                <button className="loginButton" type="submit" >Sign Up</button>

                <button className="loginRegisterButton">
                  Log into Account
                </button>
              </div>
            </div>
          </div>
        </div >
      </form>
    </>
  );
}
