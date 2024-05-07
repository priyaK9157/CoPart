import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    email:""
};

const updatepassword = createSlice({
    name: 'updatepassword',
    initialState,
    reducers: {
        updateEmail: (state, action) => {
            state.email= action.payload
        },
        
    }
});

export const { updateEmail } = updatepassword.actions;
export default updatepassword.reducer;