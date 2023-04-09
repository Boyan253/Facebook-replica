import Topbar from "../../components/topbar/Topbar";
import "./login.css";
import * as userService from "../../service/userService"
import { AuthContext } from "../../contexts/AuthContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { useForm } from 'react-hook-form'




export default function Login() {
  const { userLogin, isAuthenticated } = useContext(AuthContext)
  let { register, handleSubmit, formState: { errors }, setError } = useForm({
    defaultValues: {
      email: "",
      password: "",
    }
  })

  const errorResponse = (error) => { console.log(error); }


  const loginOptions = {
    email: {
      required: "Email is required",
      pattern: {
        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        message: "Please enter a valid email address"
      }
    },
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
        console.log(authData.errors);
        if (authData.errors) {
          console.log(errors);
          const errorMessage = "Username or Password is incorrect";
          setError('password', { message: errorMessage });

          console.log(errors);
          return
        }
        localStorage.setItem('userName', email);

        navigate('/posts')
      })
      .catch((err) => {
        console.log(err);
        return
      })
  }


  return (

    <>
      {isAuthenticated && <Navigate to={"/posts"}></Navigate>}
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
                <input placeholder="Password" type="password" className="loginInput" name="password"{...register("password", loginOptions.password)} />
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
