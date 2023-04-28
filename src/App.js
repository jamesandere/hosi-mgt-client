import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Patients from "./pages/patients/Patients";
import PatientsHub from "./pages/patients/PatientsHub";
import AddPatient from "./pages/patients/AddPatient";
import EditPatient from "./pages/patients/EditPatient";
import Patient from "./pages/patients/Patient";
import Doctors from "./pages/doctors/Doctors";
import Doctor from "./pages/doctors/Doctor";
import DoctorsHub from "./pages/doctors/DoctorsHub";
import AddDoctor from "./pages/doctors/AddDoctor";
import EditDoctor from "./pages/doctors/EditDoctor";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";
import RequireAuth from "./components/RequireAuth";

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route element={<RequireAuth />}>
            <Route path="/patients" element={<PatientsHub />}>
              <Route index element={<Patients />} />
              <Route path="add" element={<AddPatient />} />
              <Route path=":id" element={<Patient />} />
              <Route path=":id/edit" element={<EditPatient />} />
            </Route>
            <Route path="/doctors" element={<DoctorsHub />}>
              <Route index element={<Doctors />} />
              <Route path="add" element={<AddDoctor />} />
              <Route path=":id" element={<Doctor />} />
              <Route path=":id/edit" element={<EditDoctor />} />
            </Route>
          </Route>
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
