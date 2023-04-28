import { configureStore } from "@reduxjs/toolkit";
import patientsReducer, { patientsFetch } from "./patientsSlice";
import doctorsReducer, { doctorsFetch } from "./doctorsSlice";
import diseaseReducer, { diseasesFetch } from "./diseaseSlice";
import roomsReducer, { roomsFetch } from "./roomsSlice";
import authReducer, { autoLogout, loadUser } from "./authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    patients: patientsReducer,
    doctors: doctorsReducer,
    diseases: diseaseReducer,
    rooms: roomsReducer,
  },
});

store.dispatch(loadUser(null));
store.dispatch(patientsFetch());
store.dispatch(doctorsFetch());
store.dispatch(diseasesFetch());
store.dispatch(roomsFetch());
// store.dispatch(autoLogout(null));
