import React from 'react'
import { useParams } from 'react-router';
import { selectAllUsers } from '../users/usersApiSlice';
import { selectNoteById } from './notesApiSlice';
import { useSelector } from 'react-redux';
import EditNoteForm from './EditNoteForm';
import { PulseLoader } from 'react-spinners';

function EditNote() {
  const { id } = useParams();

  const notes = useSelector(state => selectNoteById(state, id));
  const users = useSelector(selectAllUsers);

  let content = notes && users ? <EditNoteForm users={users} notes={notes} /> : <PulseLoader color={'#FFF'} />

  return content

}

export default EditNote