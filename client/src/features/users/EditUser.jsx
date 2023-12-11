import React from 'react'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'; 
import { selectUserById } from './usersApiSlice';
import EditUserForm from './EditUserForm';

function EditUser() {
  const {id} = useParams();

  const user = useSelector(state => selectUserById(state, id));

  const content = user ? <EditUserForm user={user}/> : <p>Fuck..</p>

  return content
}

export default EditUser