import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token:"",
    data: {},
    skill: [],
    desc: []
};

const signupSlice = createSlice({
    name: 'signup',
    initialState,
    reducers: {
        updateToken: (state, action) => {
            state.token= action.payload
        },
        updateSignupData: (state, action) => {
                state.data= action.payload
        },
        updateSkill: (state, action) => {
            state.skill = action.payload
        },
        updateDesc : (state,action) =>{
            state.desc = action.payload
        }
    }
});

export const { updateSignupData, updateSkill, updateDesc,updateToken } = signupSlice.actions;
export default signupSlice.reducer;