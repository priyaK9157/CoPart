import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedId: 0,
};

const buttonSlice = createSlice({
  name: 'button',
  initialState,
  reducers: {
    updateSelectedId(state, action) {
      state.selectedId = action.payload;
    },
  },
});

export const { updateSelectedId } = buttonSlice.actions;
export default buttonSlice.reducer;
