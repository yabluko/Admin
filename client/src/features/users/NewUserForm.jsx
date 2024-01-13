import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useAddNewUserMutation } from './usersApiSlice'
import ROLES from '../../config/roles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'

const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

function NewUserForm() {
  const [addUser, { isSuccess, isLoading, isError, error }] = useAddNewUserMutation();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(["Employee"]);

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username))
  }, [username])

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password))
  }, [password])


  useEffect(() => {
    if (isSuccess) {
      setUsername('');
      setPassword('');
      setRoles([]);
      navigate('/dash/users');
    }


  }, [isSuccess, navigate])

  const usernameOnChanged = e => setUsername(e.target.value);
  const passwordOnChanged = e => setPassword(e.target.value);

  const onRolesChanged = e => {
    const values = Array.from(
      e.target.selectedOptions,
      (option) => option.value

    )
    setRoles(values);
  }


  const canSave = [roles.length, validUsername, validPassword].every(Boolean) && !isLoading;

  const onSaveClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addUser({ username, password, roles });
    }
  }

  const options = Object.values(ROLES).map(role => {
    return (
      <option
        key={role}
        value={role}

      > {role}</option >
    )
  })

  const errClass = isError ? "errmsg" : "offscreen"
  const validUserClass = !validUsername ? 'form__input--incomplete' : ''
  const validPwdClass = !validPassword ? 'form__input--incomplete' : ''
  const validRolesClass = !Boolean(roles.length) ? 'form__input--incomplete' : ''


  return (
    <>
      <p className={errClass}>{error?.data?.message}</p>

      <form className="form" onSubmit={onSaveClicked}>
        <div className="form__title-row">
          <h2>New User</h2>
          <div className="form__action-buttons">
            <button
              className="icon-button"
              title="Save"
              disabled={!canSave}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
          </div>
        </div>
        <label className="form__label" htmlFor="username">
          Username: <span className="nowrap">[3-20 letters]</span></label>
        <input
          className={`form__input ${validUserClass}`}
          id="username"
          name="username"
          type="text"
          autoComplete="off"
          value={username}
          onChange={usernameOnChanged}
        />

        <label className="form__label" htmlFor="password">
          Password: <span className="nowrap">[4-12 chars incl. !@#$%]</span></label>
        <input
          className={`form__input ${validPwdClass}`}
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={passwordOnChanged}
        />

        <label className="form__label" htmlFor="roles">
          ASSIGNED ROLES:</label>
        <select
          id="roles"
          name="roles"
          className={`form__select ${validRolesClass}`}
          size="3"
          value={roles}
          onChange={onRolesChanged}
        >
          {options}
        </select>

      </form>
    </>
  )
}

export default NewUserForm