import { useSelector } from 'react-redux'
import { tokenSelector } from '../features/auth/authSlice'
import { jwtDecode } from 'jwt-decode'


function useAuthHook() {
    let token = useSelector(tokenSelector);

    let isManager = false;
    let isAdmin = false;
    let status = 'Employee';

    if (token) {
        const decodedJwt = jwtDecode(token)
        const { username, roles } = decodedJwt.UserInfo
        isManager = roles.includes("Manager")
        isAdmin = roles.includes("Admin")
        if (isManager) {
            status = 'Manager'
        }
        if (isAdmin) {
            status = 'Admin'
        }
        return { username, roles, status, isManager, isAdmin }

    }

    return { username: '', roles: [], status, isManager, isAdmin }

}

export default useAuthHook