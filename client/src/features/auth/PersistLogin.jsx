import { useSelector } from "react-redux";
import { useRefreshMutation } from "./authApiSlice";
import { useEffect, useRef, useState } from "react";
import usePersist from "../../hooks/usePersistHook";
import { Outlet, Link } from "react-router-dom";
import { tokenSelector } from "./authSlice";

function PersistLogin() {

    const [persist] = usePersist();
    const [succesRecieving, setSuccessRecieving] = useState(false);
    const token = useSelector(tokenSelector);
    const effectRan = useRef(false)

    const [refresh, { isLoading, isSuccess, isError, isUninitialized, error }] = useRefreshMutation();
    useEffect(() => {
        console.log(effectRan.current)
        if (effectRan.current === true || process.env.NODE_ENV !== 'development') {
            const verifyRefreshToken = async () => {
                try {
                    console.log("Verifying refresh token");
                    await refresh();

                    setSuccessRecieving(true);

                } catch (err) {
                    console.log(err)
                }
            }
            if (!token && persist) {
                verifyRefreshToken();
            }
        }

        return () => {
            console.log("Turned on effectRan")
            effectRan.current = true
        }

    }, [])

    let content;

    if (!persist) {

        content = <Outlet />
    }
    else if (isLoading) {
        console.log('isLoading');
        content = <p>...Loading</p>
    } else if (isError) {
        content = (
            <p className="errmsg">
                {error.data?.message}
                <Link to="login">Please login again</Link>
            </p>
        )
    } else if (isSuccess && succesRecieving) { // isSuccess повертається швидше ніж виконується setCredentials({ accessToken })
        console.log("isSuccess");
        content = <Outlet />
    } else if (token && isUninitialized) { // When true, indicates that the mutation has not been fired yet.
        console.log('unInit');
        content = <Outlet />
    }

    return content

}

export default PersistLogin