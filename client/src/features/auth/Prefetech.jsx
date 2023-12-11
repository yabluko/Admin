import {store} from '../../app/store'
import { notesApiSlice } from '../notes/notesApiSlice'
import { usersApiSlice } from '../users/usersApiSlice'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'


import React from 'react'

function Prefetech() {
  useEffect(() => {
    console.log('subscribing');
    const notes = store.dispatch(notesApiSlice.endpoints.getNotes.initiate())
    const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate())

    return () => {
        notes.unsubscribe()
        users.unsubscribe()
    }

  }, [])
  return (
      <Outlet/>
  )

}

export default Prefetech













