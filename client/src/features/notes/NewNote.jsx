import React from 'react'
import { useSelector } from 'react-redux';
import { selectAllUsers } from '../users/usersApiSlice';
import NewNoteForm from './NewNoteForm';
import { PulseLoader } from 'react-spinners';


function NewNote() {
  const users = useSelector(selectAllUsers)

  if (!users?.length) return <p>Not Available</p>

  let content = users ? <NewNoteForm users={users} /> : <PulseLoader color={'#FFF'} />

  return content

}

export default NewNote