import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bottomSheetType: "",
  isOpen: false,
};

export const bottomSheetSlice = createSlice({
  name: "bottomSheet",
  initialState,
  reducers: {
    openBottomSheet: (state, action) => {
      const { bottomSheetType } = action.payload;
      state.bottomSheetType = bottomSheetType;
      state.isOpen = true;
    },
    closeBottomSheet: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openBottomSheet, closeBottomSheet } = bottomSheetSlice.actions;
export default bottomSheetSlice.reducer;
