import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import * as userService from '../../service/userService'
export function Logout() {
    const { auth, userLogout } = useContext(AuthContext)
    useEffect(() => {

        userService.logout(auth.payload)
            .then(() => {
                userLogout()

            })
    }, [userLogout, auth])
    return <Navigate to={'/posts'}></Navigate>
}