import React from 'react'
import { useCreateNewNoteMutation } from './notesApiSlice'
import { useState, useEffect } from 'react'
import { faSave } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useAuthHook from '../../hooks/useAuthHook'
import { useNavigate } from 'react-router'

function NewNoteForm({ users }) {

  const navigate = useNavigate()
  const { username } = useAuthHook()
  const [createNote, { isSuccess, isLoading, error, isError }] = useCreateNewNoteMutation()

  const [title, setNewTitle] = useState('')
  const [text, setNewText] = useState('')
  const [selectedUser, setValue] = useState(username)

  useEffect(() => {
    if (isSuccess) {
      setNewTitle('')
      setNewText('')
      setValue('')
      navigate('/dash/notes')
    }
  }, [isSuccess, navigate])


  const canSave = [title, text, selectedUser].every(Boolean) && !isLoading

  const onFormSubmit = async (e) => {
    e.preventDefault();
    if (canSave) {
      await createNote({ username: selectedUser, title, text })
    }

  }

  const setTitle = (e) => {
    setNewTitle(e.target.value)
  }

  const setText = (e) => {
    setNewText(e.target.value)
  }

  const setSelectedValue = (e) => {
    setValue(e.target.value)
  }


  let options = null
  options = users.map(user => (
    <option
      key={user.id}
      value={user.username}
    >
      {user.username}
    </option>

  ))



  const errClass = isError ? "errmsg" : "offscreen"
  const validTitleClass = !title ? "form__input--incomplete" : ''
  const validTextClass = !text ? "form__input--incomplete" : ''

  const content = (
    <>
      <p className={errClass}>{error?.data?.message}</p>

      <form className="form" onSubmit={onFormSubmit}>
        <div className="form__title-row">
          <h2>New Note</h2>
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
        <label className="form__label" htmlFor="title">
          Title:</label>
        <input
          className={`form__input ${validTitleClass}`}
          id="title"
          name="title"
          type="text"
          autoComplete="off"
          value={title}
          onChange={setTitle}
        />

        <label className="form__label" htmlFor="text">
          Text:</label>
        <textarea
          className={`form__input form__input--text ${validTextClass}`}
          id="text"
          name="text"
          value={text}
          onChange={setText}
        />

        <label className="form__label form__checkbox-container" htmlFor="username">
          ASSIGNED TO:</label>
        <select
          id="username"
          name="username"
          className="form__select"
          value={selectedUser}
          onChange={setSelectedValue}
        // defaultValue={username}
        >
          {options}
        </select>

      </form>
    </>
  )

  return content
}

export default NewNoteForm