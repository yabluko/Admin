import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouse } from "@fortawesome/free-solid-svg-icons"
import { useNavigate, useLocation } from 'react-router'


function DashFooter() {

    const navigate = useNavigate();
    const {path} = useLocation;

    const onHomeClicked = () => {
        navigate('/dash')
    }

    let goHomeButton = null;

    if(path !== '/dash'){
        goHomeButton = (
            <button
            className='dash-footer__button icon-button'
            title='Home'
            onClick={onHomeClicked}
            >
                <FontAwesomeIcon icon={faHouse}/>
            </button>


        )
    }



    return (
        <footer className="dash-footer">
            {goHomeButton}
            <p>Current User:</p>
            <p>Status:</p>
        </footer>
    )
}

export default DashFooter