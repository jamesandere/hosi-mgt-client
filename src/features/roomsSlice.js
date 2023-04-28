import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { url, setHeaders } from "./api";
import axios from "axios";

const initialState = {
  rooms: [],
  status: null,
  editStatus: null,
  createStatus: null,
};

export const roomsFetch = createAsyncThunk("rooms/roomsFetch", async () => {
  try {
    const res = await axios.get(`${url}/rooms`, setHeaders());
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

const roomsSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(roomsFetch.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(roomsFetch.fulfilled, (state, action) => {
        state.status = "success";
        state.rooms.push(action.payload);
      })
      .addCase(roomsFetch.rejected, (state, action) => {
        state.status = "rejected";
      });
  },
});

export default roomsSlice.reducer;
