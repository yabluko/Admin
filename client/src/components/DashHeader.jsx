import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { useLogOutMutation } from '../features/auth/authApiSlice'


const DASH_REGEX = /^\/dash(\/)?$/
const NOTES_REGEX = /^\/dash\/notes(\/)?$/
const USERS_REGEX = /^\/dash\/users(\/)?$/


function DashHeader() {
    const navigate = useNavigate();
    const { pathname } = useLocation();


    const [setLogOut, { isLoading, isError, error, isSuccess }] = useLogOutMutation();


    useEffect(() => {
        if (isSuccess) navigate('/');
    }, [isSuccess, navigate])

    if (isLoading) return <p>Loging out...</p>

    if (isError) return <p>Error : {error.data?.message}</p>

    let dashClass = null;
    if (!DASH_REGEX.test(pathname) && !USERS_REGEX.test(pathname) && !NOTES_REGEX.test(pathname)) {
        dashClass = 'dash-header__container--small'
    }

    const logOutButton = (
        <button
            className='icon-button'
            title='Logout'
            onClick={setLogOut}
        >
            <FontAwesomeIcon icon={faRightFromBracket} />
        </button>

    )

    const content = (
        <header className="dash-header">
            <div className={`dash-header__container ${dashClass}`}>
                <Link to="/dash">
                    <h1 className="dash-header__title">techNotes</h1>
                </Link>
                <nav className="dash-header__nav">
                    {logOutButton}
                </nav>
            </div>
        </header>
    )

    return content
}

export default DashHeader