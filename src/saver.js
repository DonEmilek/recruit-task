import { createSlice } from "@reduxjs/toolkit";

export const saveBook = createSlice({
    name: 'saver',
    initialState:{
        items: [],
    },
    reducers: {
        //reducer for add book to library
        adding: (state, action) => {
            state.items.push(action.payload+'\n')
        },
        //reducer for remove book from library
        removing: (state, action) => {
            state.items = state.items.filter(item => item !== action.payload)
        },
    }
})
export const { adding, removing } = saveBook.actions
export default saveBook.reducer