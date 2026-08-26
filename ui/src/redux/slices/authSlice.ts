
import { createSlice } from '@reduxjs/toolkit'
const initialState: any = {}
const authSlice: any = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            return state = action.payload
        },
        logOut: (state) => {
            return state = null
        }
    }
})

export const { login, logOut }: any = authSlice.actions;
export default authSlice.reducer;