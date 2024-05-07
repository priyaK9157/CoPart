import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    step:1,
    title:"",
    skills:[],
    BasicDetail:{}
}

const CreateProject = createSlice({
    name: 'CreateProject',
    initialState,
    reducers: {
    updateStep:(state,data)=>{
        state.step=data.payload
    },
    updateTitle:(state,data)=>{
        state.title=data.payload
    },
    updateSkills:(state,data)=>{
        state.skills=data.payload
    },
    updateBasicDetail:(state,data)=>{
        state.BasicDetail=data.payload
    }
    }
});

export const {updateStep, updateTitle,updateSkills,updateBasicDetail} = CreateProject.actions;
export default CreateProject.reducer;