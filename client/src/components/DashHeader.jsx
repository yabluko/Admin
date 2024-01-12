import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket, faFileCirclePlus, faFilePen, faUserGear, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import useAuthHook from '../hooks/useAuthHook'
import { useLogOutMutation } from '../features/auth/authApiSlice'
import { PulseLoader } from 'react-spinners';

const DASH_REGEX = /^\/dash(\/)?$/
const NOTES_REGEX = /^\/dash\/notes(\/)?$/
const USERS_REGEX = /^\/dash\/users(\/)?$/


function DashHeader() {
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const { isAdmin, isManager } = useAuthHook()

    const [setLogOut, { isLoading, isError, error, isSuccess }] = useLogOutMutation()

    const newNotesButtonClick = () => { navigate('/dash/notes/new') }
    const newUsersButtonClick = () => { navigate('/dash/users/new') }
    const notesButtonClick = () => { navigate('/dash/notes') }
    const usersButtonClick = () => { navigate('/dash/users') }


    useEffect(() => {
        if (isSuccess) navigate('/')
    }, [isSuccess, navigate])

    if (isLoading) return <PulseLoader color={'#FFF'} />

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

    let newNoteButton = null;
    if (NOTES_REGEX.test(pathname)) {
        newNoteButton = (
            <button
                className='icon-button'
                title='New note'
                onClick={newNotesButtonClick}
            >
                <FontAwesomeIcon icon={faFileCirclePlus} />

            </button>

        )
    }


    let newUserButton = null;
    if (USERS_REGEX.test(pathname)) {
        newUserButton = (
            <button
                className='icon-button'
                title='New user'
                onClick={newUsersButtonClick}
            >
                <FontAwesomeIcon icon={faUserPlus} />
            </button>
        )
    }

    let notesButton = null;
    if (!NOTES_REGEX.test(pathname) && pathname.includes('/dash')) {
        notesButton = (
            <button
                className='icon-button'
                title='New user'
                onClick={notesButtonClick}
            >
                <FontAwesomeIcon icon={faFilePen} />
            </button>

        )
    }

    let usersButton = null;
    if (isAdmin || isManager) {

        if (!USERS_REGEX.test(pathname) && pathname.includes('/dash')) {
            usersButton = (
                <button
                    className='icon-button'
                    title='New user'
                    onClick={usersButtonClick}
                >
                    <FontAwesomeIcon icon={faUserGear} />
                </button>

            )
        }
    }


    let buttonContent = null


    if (isLoading) {
        buttonContent = <PulseLoader color={'#FFF'} />

    } else {
        buttonContent = (
            <>
                {newNoteButton}
                {newUserButton}
                {usersButton}
                {notesButton}
                {logOutButton}
            </>
        )
    }

    const errExist = isError ? "errmsg" : "offscreen"

    const content = (
        <>
            <p className='errExist'>{error?.data?.message}</p>

            <header className="dash-header">
                <div className={`dash-header__container ${dashClass}`}>
                    <Link to="/dash">
                        <h1 className="dash-header__title">techNotes</h1>
                    </Link>
                    <nav className="dash-header__nav">

                        {buttonContent}

                    </nav>
                </div>
            </header>
        </>
    )

    return content
}

export default DashHeader