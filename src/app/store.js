import { configureStore } from '@reduxjs/toolkit';
import saverReducer from '../saver';
export default configureStore({
    reducer: {
        saver: saverReducer,
    },
})