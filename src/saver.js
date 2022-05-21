import { createSlice } from "@reduxjs/toolkit";

export const saveBook = createSlice({
    name: 'saver',
    initialState:{
        items: [],
        enableButton: false,
        opacity: 1,
    },
    reducers: {
        adding: (state, action) => {
            state.items.push(action.payload+'\n')
        },
        removing: (state, action) => {
            state.items = state.items.filter(item => item !== action.payload)
        },
        disable: (state, action) => {
            return {
                ...state,
                enableButton: action.payload
            }
        },
        enable: (state) => {
            //state.enableButton = payload
        }
    }
})
export const { adding, removing, enable, disable } = saveBook.actions
export default saveBook.reducer