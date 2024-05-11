import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userGithubData:[],
    useLinkedinData: []
}


const LinkSlice = createSlice({
    name: 'Links',
    initialState,
    reducers: {
        setuserGithubData : (state, action) => {
            console.log("action",state,action)
            state.userGithubData = action.payload;
        },
        setuseLinkedinData : (state, action) => {
            state.useLinkedinData = action.payload
        }
        
    }
});

export const {setuserGithubData,setLinkedInLink} = LinkSlice.actions;
export default LinkSlice.reducer;