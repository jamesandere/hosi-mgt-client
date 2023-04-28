import styled from "styled-components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { patientsCreate } from "../../features/patientsSlice";
import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const AddPatient = () => {
  const { diseases } = useSelector((state) => state.diseases);
  const { doctors } = useSelector((state) => state.doctors);
  const { rooms } = useSelector((state) => state.rooms);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [date, setDate] = useState("");
  const [sex, setSex] = useState("");
  const [hasDisease, setHasDisease] = useState(false);
  const [hasDoctor, setHasDoctor] = useState(false);
  const [hasRoom, setHasRoom] = useState(false);
  const [tempDisease, setTempDisease] = useState({});
  const [tempDoctor, setTempDoctor] = useState({});
  const [tempRoom, setTempRoom] = useState({});

  console.log(tempDisease);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      patientsCreate({
        first_name: firstName,
        last_name: lastName,
        sex: sex,
        birth_date: date,
        room_id: tempRoom.id,
        doctor_id: tempDoctor.id,
        disease_id: tempDisease.id,
      })
    ).then(() => navigate(`/patients`));
  };

  const formatDate = (date) => {
    let birthday = new Date(date);
    setDate(birthday);
  };

  const onOptionChange = (e) => {
    setSex(e.target.value);
  };

  const handleDisease = () => {
    setHasDisease((prevState) => !prevState);
  };

  const handleDoctor = () => {
    setHasDoctor((prevState) => !prevState);
  };

  const handleRoom = () => {
    setHasRoom((prevState) => !prevState);
  };

  const btnFunc = (disease) => {
    handleDisease();
    setTempDisease(disease);
  };

  const btnFuncDoc = (doctor) => {
    handleDoctor();
    setTempDoctor(doctor);
  };

  const btnFuncRoom = (room) => {
    handleRoom();
    setTempRoom(room);
  };

  return (
    <Container>
      <h3>Add Patient</h3>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <label>First Name:</label>
          <input type="text" onChange={(e) => setFirstName(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <label>Last Name:</label>
          <input type="text" onChange={(e) => setLastName(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <label>Date of birth:</label>
          <input
            type="date"
            onChange={(e) => formatDate(e.target.value)}
            placeholder="DD/MM/YYYY"
          />
        </FormGroup>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker />
        </LocalizationProvider>
        <FormGroup>
          <p>Sex</p>
          <div className="radios">
            <div className="radio-group">
              <input
                type="radio"
                value="Male"
                checked={sex === "Male"}
                onChange={onOptionChange}
              />
              <label for="html">Male</label>
            </div>
            <div className="radio-group">
              <input
                type="radio"
                value="Female"
                checked={sex === "Female"}
                onChange={onOptionChange}
              />
              <label for="html">Female</label>
            </div>
            <div className="radio-group">
              <input
                type="radio"
                value="Other"
                checked={sex === "Other"}
                onChange={onOptionChange}
              />
              <label for="html">Other</label>
            </div>
          </div>
        </FormGroup>
        {hasDisease ? (
          <FormGroup>
            <h4>Disease</h4>
            <div>
              <span>{tempDisease.name}</span>
              <button onClick={handleDisease}>Remove</button>
            </div>
          </FormGroup>
        ) : (
          <>
            <Titles>
              <h4>Disease</h4>
              <h4>Add</h4>
            </Titles>
            <TableContainer>
              <table>
                {diseases[0].map((disease, i) => (
                  <tr key={i}>
                    <td>{disease.name}</td>
                    <td>
                      <button onClick={() => btnFunc(disease)}>Add</button>
                    </td>
                  </tr>
                ))}
              </table>
            </TableContainer>
          </>
        )}
        {hasDoctor ? (
          <FormGroup>
            <h4>Doctor</h4>
            <div>
              <span>
                {tempDoctor.first_name} {tempDoctor.last_name}
              </span>
              <button onClick={handleDoctor}>Remove</button>
            </div>
          </FormGroup>
        ) : (
          <>
            <DoctorTitles>
              <h4>Doctor</h4>
              <h4>Add</h4>
            </DoctorTitles>
            <TableContainer>
              <table>
                {doctors.map((doctor, i) => (
                  <tr key={i}>
                    <td>
                      {doctor.first_name} {doctor.last_name}
                    </td>
                    <td>
                      <button onClick={() => btnFuncDoc(doctor)}>Add</button>
                    </td>
                  </tr>
                ))}
              </table>
            </TableContainer>
          </>
        )}
        {hasRoom ? (
          <FormGroup>
            <h4>Room</h4>
            <div>
              <span>{tempRoom.name}</span>
              <button onClick={handleRoom}>Remove</button>
            </div>
          </FormGroup>
        ) : (
          <>
            <DoctorTitles>
              <h4>Room</h4>
              <h4>Add</h4>
            </DoctorTitles>
            <TableContainer>
              <table>
                {rooms[0].map((room, i) => (
                  <tr key={i}>
                    <td>{room.name}</td>
                    <td>
                      <button onClick={() => btnFuncRoom(room)}>Add</button>
                    </td>
                  </tr>
                ))}
              </table>
            </TableContainer>
          </>
        )}
        <AddPatientBtn>Add Patient</AddPatientBtn>
      </form>
    </Container>
  );
};

export default AddPatient;

const Container = styled.div`
  margin-top: 50px;
  margin-left: 240px;

  h3 {
    margin-bottom: 20px;
  }

  form {
    width: 450px;
  }
`;

const FormGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
  padding: 6px 0;

  label,
  p {
    flex: 1;
  }

  input[type="text"] {
    flex: 2;
    height: 40px;
    outline: none;
    border: 1px solid rgb(220, 220, 220);
    border-radius: 5px;
    padding: 4px 6px;
  }

  .radios {
    flex: 2;
    display: flex;
  }

  .radio-group {
    margin-right: 10px;

    input {
      margin-right: 4px;
    }
  }
`;

const TableContainer = styled.div`
  height: auto;
  max-height: 200px;
  overflow-y: scroll;

  table {
    border-collapse: collapse;
    width: 100%;
    height: 100%;
  }

  td,
  th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }

  tr {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  tr:nth-child(even) {
    background-color: #dddddd;
  }
`;

const Titles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  border: 1px solid #dddddd;
  padding: 4px;
  margin-top: 10px;
`;

const DoctorTitles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  border: 1px solid #dddddd;
  padding: 4px;
  margin-top: 30px;
`;

const AddPatientBtn = styled.button`
  margin-top: 10px;
  background-color: #018849;
  color: #fff;
  width: 100%;
  text-align: center;
  text-transform: uppercase;
  height: 41px;
  letter-spacing: 1px;
  cursor: pointer;
  border: none;
  outline: none;
  font-weight: 700;
`;
