import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

export function RouteGuard({ children }) {

    const { isAuthenticated } = useContext(AuthContext)

    if (!isAuthenticated) {

        return (<Navigate to={'/login'}></Navigate>)
    }

    return (
        <>
            {children}
        </>
    )

}