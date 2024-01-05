import React from 'react'
import { useGetNotesQuery } from './notesApiSlice'
import Note from './Note';
import useAuthHook from '../../hooks/useAuthHook';


function NotesList() {

  const { username, isManager, isAdmin } = useAuthHook()



  const { data: notes, isError, isSuccess, isLoading, error } = useGetNotesQuery(undefined, {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });



  let content;

  if (isLoading) {
    content = <p>is Loading...</p>
  }

  if (isError) {
    content = <p className='errmsg'>{error?.data.message}</p>
  }

  if (isSuccess) {

    const { ids, entities } = notes

    let filteredIds

    if (isManager || isAdmin) {
      filteredIds = [...ids]
    } else {
      filteredIds = ids.filter(itemId => entities[itemId].username === username)
    }

    const tableContent = filteredIds?.length ? filteredIds.map(noteId => <Note key={noteId} noteId={noteId} />) : null

    content = (
      <table className="table table--notes">
        <thead className="table__thead">
          <tr>
            <th scope="col" className="table__th note__status">Username</th>
            <th scope="col" className="table__th note__created">Created</th>
            <th scope="col" className="table__th note__updated">Updated</th>
            <th scope="col" className="table__th note__title">Title</th>
            <th scope="col" className="table__th note__username">Owner</th>
            <th scope="col" className="table__th note__edit">Edit</th>
          </tr>
        </thead>
        <tbody>
          {tableContent}
        </tbody>
      </table>
    )
  }

  return content
}

export default NotesList