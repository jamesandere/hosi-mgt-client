import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { url, setHeaders } from "./api";
import axios from "axios";

const initialState = {
  patients: [],
  status: null,
  createStatus: null,
  deleteStatus: null,
  updateStatus: null,
};

export const patientsFetch = createAsyncThunk(
  "patients/patientsFetch",
  async () => {
    try {
      const res = await axios.get(`${url}/patients`, setHeaders());
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const patientsCreate = createAsyncThunk(
  "patients/patientsCreate",
  async (values) => {
    try {
      const res = await axios.post(`${url}/patients`, values, setHeaders());
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const patientsUpdate = createAsyncThunk(
  "patients/patientsUpdate",
  async (values) => {
    try {
      const res = await axios.put(
        `${url}/patients/${values.id}`,
        values,
        setHeaders()
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const patientsDelete = createAsyncThunk(
  "patients/patientsDelete",
  async (id) => {
    try {
      const res = await axios.delete(`${url}/patients/${id}`, setHeaders());
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const patientsSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(patientsFetch.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(patientsFetch.fulfilled, (state, action) => {
        state.status = "success";
        state.patients = state.patients.concat(action.payload);
      })
      .addCase(patientsFetch.rejected, (state, action) => {
        state.status = "rejected";
      })
      .addCase(patientsCreate.pending, (state, action) => {
        state.createStatus = "pending";
      })
      .addCase(patientsCreate.fulfilled, (state, action) => {
        state.createStatus = "success";
        state.patients.push(action.payload);
      })
      .addCase(patientsCreate.rejected, (state, action) => {
        state.createStatus = "rejected";
      })
      .addCase(patientsDelete.pending, (state, action) => {
        state.deleteStatus = "pending";
      })
      .addCase(patientsDelete.fulfilled, (state, action) => {
        const newPatients = state.patients.filter(
          (p) => p.id !== action.payload.id
        );
        state.patients = newPatients;
        state.deleteStatus = "success";
      })
      .addCase(patientsDelete.rejected, (state, action) => {
        state.deleteStatus = "rejected";
      })
      .addCase(patientsUpdate.pending, (state, action) => {
        state.updateStatus = "pending";
      })
      .addCase(patientsUpdate.fulfilled, (state, action) => {
        state.updateStatus = "success";
        const updatedPatients = state.patients.map((patient) =>
          patient.id === action.payload ? action.payload : patient
        );
        state.patients = updatedPatients;
      })
      .addCase(patientsUpdate.rejected, (state, action) => {
        state.updateStatus = "rejected";
      });
  },
});

export default patientsSlice.reducer;
