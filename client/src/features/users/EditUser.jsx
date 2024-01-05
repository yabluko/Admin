import React from 'react'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux';
import { selectUserById } from './usersApiSlice';
import EditUserForm from './EditUserForm';

function EditUser() {
  const { id } = useParams()
  console.log("EditUser")

  const user = useSelector(state => selectUserById(state, id));

  const content = <EditUserForm user={user} />

  return content
}

export default EditUser