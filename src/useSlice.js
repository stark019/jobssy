import { createSlice } from "@reduxjs/toolkit";

const initialValOfState = {
    isLoggedIn: false,
    currRole: '',
    currUserId: ''
}
const userSlice = createSlice({
    name: 'users',
    initialState: {
        value: initialValOfState
    },
    reducers: {
        setUserRole: (state, action) => {
            state.value.currRole = action.payload.role;
        },
        setUserId: (state, action) => {
            state.value.currUserId = action.payload.id;
        },
    },
})
export const {setUserRole, setUserId} = userSlice.actions;
export default userSlice.reducer;