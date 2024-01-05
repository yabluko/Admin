import React from 'react'
import { useState, useEffect } from 'react'
import { useUpdateNoteMutation, useDeleteNoteMutation } from '../notes/notesApiSlice'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ROLES from '../../config/roles'
import { useNavigate } from 'react-router'
import useAuthHook from '../../hooks/useAuthHook'

function EditNoteForm({ notes, users }) {
  const navigate = useNavigate()
  const { isManager, isAdmin } = useAuthHook()


  const [updateNote, { isSuccess, isError, isLoading, error }] = useUpdateNoteMutation()
  const [deleteNote, { isSuccess: isSuccessDel, isError: isErrorDel }] = useDeleteNoteMutation()


  const [title, setTitle] = useState(notes.title)
  const [text, setText] = useState(notes.text)
  const [completed, setCompleted] = useState(notes.completed)
  const [usersAll, setUsersAll] = useState(notes.user)

  const createdAt = new Date(notes.createdAt).toLocaleString()
  const updatedAt = new Date().toLocaleString()


  const onTitleChange = (e) => { setTitle(e.target.value) }
  const onTextChange = (e) => { setText(e.target.value) }
  const onChekedChange = () => { setCompleted(!completed) }

  const onSelectChange = (e) => { setUsersAll(e.target.value) }

  const canSave = [title, text, usersAll].every(Boolean) && !isLoading

  const onFormUpdate = async (e) => {
    e.preventDefault()
    if (canSave) {
      await updateNote({ id: notes.id, user: usersAll, title, text, completed })
    }
  }

  const onFormDelete = async (e) => {
    e.preventDefault()
    await deleteNote({ id: notes.id })
  }

  console.log(isSuccessDel)

  useEffect(() => {
    if (isSuccess || isSuccessDel) {
      setTitle('')
      setText('')
      setCompleted(value => !value)
      navigate('/dash/notes')
    }
  }, [isSuccess, isSuccessDel, navigate])

  const errClass = (isError || isErrorDel) ? "errmsg" : "offscreen"
  const validTitleClass = !title ? "form__input--incomplete" : ''
  const validTextClass = !text ? "form__input--incomplete" : ''

  let options = null
  options = users.map(user => (
    <option
      key={user.id}
      value={user.username}
    >
      {user.username}
    </option>
  ))

  let deleteButton = null
  if (isManager || isAdmin) {
    deleteButton = (
      <button
        className="icon-button"
        title="Delete"
        onClick={onFormDelete}
      >
        <FontAwesomeIcon icon={faTrashCan} />
      </button>
    )
  }

  const content = (
    <>
      <p className={errClass}>{error?.data.message}</p>

      <form className="form" onSubmit={e => e.preventDefault()}>
        <div className="form__title-row">
          <h2>Edit Note #{notes.ticket}</h2>
          <div className="form__action-buttons">
            <button
              className="icon-button"
              title="Save"
              onClick={onFormUpdate}
              disabled={!canSave}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
            {deleteButton}
          </div>
        </div>
        <label className="form__label" htmlFor="note-title">
          Title:</label>
        <input
          className={`form__input ${validTitleClass}`}
          id="note-title"
          name="title"
          type="text"
          autoComplete="off"
          value={title}
          onChange={onTitleChange}
        />

        <label className="form__label" htmlFor="note-text">
          Text:</label>
        <textarea
          className={`form__input form__input--text ${validTextClass}`}
          id="note-text"
          name="text"
          value={text}
          onChange={onTextChange}
        />
        <div className="form__row">
          <div className="form__divider">
            <label className="form__label form__checkbox-container" htmlFor="note-completed">
              WORK COMPLETE:
              <input
                className="form__checkbox"
                id="note-completed"
                name="completed"
                type="checkbox"
                checked={completed}
                onChange={onChekedChange}
              />
            </label>

            <label className="form__label form__checkbox-container" htmlFor="note-username">
              ASSIGNED TO:</label>
            <select
              id="note-username"
              name="username"
              className="form__select"
              value={usersAll}
              onChange={onSelectChange}
            >
              {options}
            </select>
          </div>
          <div className="form__divider">
            <p className="form__created">Created:<br />{createdAt}</p>
            <p className="form__updated">Updated:<br />{updatedAt}</p>
          </div>
        </div>
      </form>
    </>
  )
  return content
}

export default EditNoteForm