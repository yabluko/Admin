import { createEntityAdapter, createSelector } from "@reduxjs/toolkit"; 
import { apiSlice } from "../../app/api/ApiSlice";


const notesAdapter = createEntityAdapter({});


const initialState = notesAdapter.getInitialState();


export const notesApiSlice = apiSlice.injectEndpoints({
    endpoints : (builder) => ({
        getNotes : builder.query({
            query : () => 'notes',
            validateStatus : (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse : (data) => {
                const loadedNotes = data.map(note => {
                    note.id = note._id
                    return note
                })
                return notesAdapter.setAll(initialState , loadedNotes);
            },
            providesTags : (result , err, args) => {
                if(result?.ids){
                    return [
                        {type : 'Note', id : "LIST"},
                        ...result.ids.map(id => ({type : 'Note', id}))
                    ]

                }else return [{type : 'Note', id : "LIST"}]
            }

        }),
        createNewNote : builder.mutation({
            query : ({body}) => ({
                method : 'POST',
                url : '/notes',
                body
            }),
            invalidatesTags : [{type : 'Notes', id : 'LIST'}]
        }),
        updateNote : builder.mutation({
            query : ({body}) => ({
                method : 'PATCH',
                url : "/notes",
                body,
            }),
            invalidatesTags : (res, err, arg) => [
                {type : 'Notes', id : arg.id}
            ]
        }),
        deleteNote : builder.mutation({
            query : ({id}) => ({
                url : 'notes',
                method : 'DELETE',
                body : id
            }),
            invalidatesTags : (res , err, arg) => [
                {type : 'Note', id : arg.id}
            ]
        })
    })
})


export const { useGetNotesQuery, useCreateNewNoteMutation, useDeleteNoteMutation, useUpdateNoteMutation } = notesApiSlice;


export const selectNoteResult = notesApiSlice.endpoints.getNotes.select();


const selectNoteData = createSelector(
    selectNoteResult,
    noteResult => noteResult.data // noteResult приймає результат функції selectnoteResult

)

export const {
    selectAll : selectAllNotes,
    selectById : selectNoteById,
    selectIds : selectNoteIds
} = notesAdapter.getSelectors(state => selectNoteData(state) ?? initialState)