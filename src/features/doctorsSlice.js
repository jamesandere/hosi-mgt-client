import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { url, setHeaders } from "./api";
import axios from "axios";

const initialState = {
  doctors: [],
  status: null,
  editStatus: null,
  createStatus: null,
};

export const doctorsFetch = createAsyncThunk(
  "doctors/doctorsFetch",
  async () => {
    try {
      const res = await axios.get(`${url}/doctors`, setHeaders());
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const doctorsCreate = createAsyncThunk(
  "doctors/doctorsCreate",
  async (values) => {
    try {
      const res = await axios.post(`${url}/doctors`, values, setHeaders());
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const doctorsUpdate = createAsyncThunk(
  "doctors/doctorsUpdate",
  async (values) => {
    try {
      const res = await axios.put(
        `${url}/doctors/${values.id}`,
        values,
        setHeaders()
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const doctorsSlice = createSlice({
  name: "doctors",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(doctorsFetch.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(doctorsFetch.fulfilled, (state, action) => {
        state.status = "success";
        state.doctors = state.doctors.concat(action.payload);
      })
      .addCase(doctorsFetch.rejected, (state, action) => {
        state.status = "rejected";
      })
      .addCase(doctorsUpdate.pending, (state, action) => {
        state.editStatus = "pending";
      })
      .addCase(doctorsUpdate.fulfilled, (state, action) => {
        state.editStatus = "success";
        const newDoctors = state.doctors.map((doctor) =>
          doctor.id === action.payload.id ? action.payload : doctor
        );
        state.doctors = newDoctors;
      })
      .addCase(doctorsUpdate.rejected, (state, action) => {
        state.editStatus = "rejected";
      })
      .addCase(doctorsCreate.pending, (state, action) => {
        state.createStatus = "pending";
      })
      .addCase(doctorsCreate.fulfilled, (state, action) => {
        state.createStatus = "success";
        state.doctors.push(action.payload);
      })
      .addCase(doctorsCreate.rejected, (state, action) => {
        state.createStatus = "rejected";
      });
  },
});

export default doctorsSlice.reducer;
