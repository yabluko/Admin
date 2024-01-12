import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'

import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLogInMutation } from "./authApiSlice";
import usePersist from "../../hooks/usePersistHook";
import { PulseLoader } from "react-spinners";

function Login() {
  const userRef = useRef();
  const errRef = useRef();


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [toLogin, { isLoading }] = useLogInMutation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrorMessage] = useState('');
  const [persist, setPersist] = usePersist();



  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
    setErrorMessage('')
  }, [username, password])

  const handleUserInput = (e) => {
    setUsername(e.target.value)
  }

  const handlePasswordInput = (e) => {
    setPassword(e.target.value)
  }

  const handleToggle = () => {
    setPersist(prev => !prev)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { accessToken } = await toLogin({ username, password }).unwrap();
      dispatch(setCredentials({ accessToken }));
      setUsername('');
      setPassword('');
      navigate('/dash');
    } catch (err) {
      if (!err.status) {
        setErrorMessage('No response from Server');
      }
      else if (err.status === 400) {
        setErrorMessage('All fields are required');
      }
      else if (err.status === 401) {
        setErrorMessage('Unathorized');
      }
      else {
        setErrorMessage(err.data?.message)
      }
      errRef.current.focus();
    }
  }



  const errClass = errMsg ? 'errmsg' : 'offscreen'

  if (isLoading) return <PulseLoader color={'#FFF'} />

  return (
    <section className="public">
      <header>
        <h1>Employee login</h1>
      </header>
      <main className="login">
        <p ref={errRef} className={errClass} aria-live="assertive">{errMsg}</p>
        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="username">Username : </label>
          <input
            type="text"
            id='username'
            className='form__input'
            ref={userRef}
            value={username}
            onChange={handleUserInput}
            autoComplete="off"
            required
          />

          <label htmlFor="password">Password : </label>
          <input type="password"
            id="password"
            className="form__input"
            value={password}
            onChange={handlePasswordInput}
            required />
          <button className="form__submit-button">Sign In</button>

          <label htmlFor="persist" className="form__persist">
            <input type="checkbox"
              className="form__checkbox"
              id="persist"
              onChange={handleToggle}
              checked={persist}
            />
            Remember me
          </label>

        </form>
      </main>
      <footer>
        <Link to='/'>Back to Home</Link>
      </footer>
    </section>
  )
}

export default Login