import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { AppState } from "../store";

export interface FormState {
  formState: string;
}

const initialState: FormState = {
  formState: "login",
};

// Actual Slice
export const initialFormSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setFormState(state, action) {
      state.formState = action.payload;
    },
  },
});

export const { setFormState } = initialFormSlice.actions;

export const currentFormState = (state: AppState) => state.initialFormSlice;

export default initialFormSlice.reducer;
