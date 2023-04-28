import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { url, setHeaders } from "./api";
import axios from "axios";

const initialState = {
  diseases: [],
  status: null,
  editStatus: null,
  createStatus: null,
};

export const diseasesFetch = createAsyncThunk(
  "diseases/diseasesFetch",
  async () => {
    try {
      const res = await axios.get(`${url}/diseases`, setHeaders());
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const diseaseSlice = createSlice({
  name: "diseases",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(diseasesFetch.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(diseasesFetch.fulfilled, (state, action) => {
        state.status = "success";
        state.diseases.push(action.payload);
      })
      .addCase(diseasesFetch.rejected, (state, action) => {
        state.status = "rejected";
      });
  },
});

export default diseaseSlice.reducer;
