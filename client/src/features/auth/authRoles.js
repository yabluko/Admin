import React from 'react'
import { useLocation, Outlet, Navigate } from 'react-router-dom'
import useAuthHook from '../../hooks/useAuthHook'



const AuthRoles = ({ allowedRoles }) => {
    console.log(allowedRoles)
    const location = useLocation()
    const { roles } = useAuthHook()

    const content = (roles.some(item => allowedRoles.includes(item))
        ? <Outlet />
        : <Navigate to="/login" state={{ from: location }} replace />
    )
    return content
}
export default AuthRoles