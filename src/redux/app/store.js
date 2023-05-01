import { configureStore } from "@reduxjs/toolkit";
import searchReducer from '../features/search/searchSlice'
import authReducer from '../features/auth/authSlice'

const store = configureStore({
    reducer: {
        search: searchReducer,
        auth: authReducer
    }
})


export default store
