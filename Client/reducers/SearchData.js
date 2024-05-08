import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedValue:"",
}

const SearchData = createSlice({
    name: 'SearchData',
    initialState,
    reducers: {
        updateSelectedValue : (state, action) => {
            state.selectedValue = action.payload;
        },
        
    }
});

export const {updateSelectedValue} = SearchData.actions;
export default SearchData.reducer;