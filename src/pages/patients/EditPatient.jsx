import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { setHeaders, url } from "../../features/api";
import axios from "axios";
import { patientsUpdate } from "../../features/patientsSlice";

const EditPatient = () => {
  const { patients } = useSelector((state) => state.patients);
  const { diseases } = useSelector((state) => state.diseases);
  const { doctors } = useSelector((state) => state.doctors);
  const { rooms } = useSelector((state) => state.rooms);
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [patient, setPatient] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [date, setDate] = useState("");
  const [hasDoctor, setHasDoctor] = useState(true);
  const [hasDisease, setHasDisease] = useState(true);
  const [hasRoom, setHasRoom] = useState(true);
  const [tempDoctor, setTempDoctor] = useState(null);
  const [tempDisease, setTempDisease] = useState(null);
  const [tempRoom, setTempRoom] = useState(null);

  const formatDate = (date) => {
    let birthday = new Date(date);
    setDate(birthday.toISOString().slice(0, 10));
  };

  const onOptionChange = (e) => {
    setGender(e.target.value);
  };

  const toggleDisease = () => {
    setHasDisease((prevState) => !prevState);
  };

  const handleAddDisease = (disease) => {
    toggleDisease();
    setTempDisease(disease);
  };

  const toggleDoctor = () => {
    setHasDoctor((prevState) => !prevState);
  };

  const handleAddDoctor = (doctor) => {
    toggleDoctor();
    setTempDoctor(doctor);
  };

  const toggleRoom = () => {
    setHasRoom((prevState) => !prevState);
  };

  const handleAddRoom = (room) => {
    toggleRoom();
    setTempRoom(room);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      patientsUpdate({
        id: params.id,
        first_name: firstName,
        last_name: lastName,
        sex: gender,
        birth_date: date,
        room_id: tempRoom.id,
        doctor_id: tempDoctor.id,
        disease_id: tempDisease.id,
      })
    ).then(() => navigate(`/patients/${params.id}`));
  };

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const res = await axios.get(
          `${url}/patients/${params.id}`,
          setHeaders()
        );
        setPatient(res.data);
        setFirstName(res.data.first_name);
        setLastName(res.data.last_name);
        setGender(res.data.sex);
        formatDate(res.data.birth_date);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPatient();
  }, []);

  return (
    <Container>
      <h3>Edit Patient</h3>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <label htmlFor="">First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="">Last Name:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="">Date of birth:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="DD/MM/YYYY"
            required
          />
        </FormGroup>
        <FormGroup>
          <p>Sex</p>
          <div className="radios">
            <div className="radio-group">
              <input
                type="radio"
                value="Male"
                checked={gender === "Male"}
                onChange={onOptionChange}
              />
              <label for="html">Male</label>
            </div>
            <div className="radio-group">
              <input
                type="radio"
                value="Female"
                checked={gender === "Female"}
                onChange={onOptionChange}
              />
              <label for="html">Female</label>
            </div>
            <div className="radio-group">
              <input
                type="radio"
                value="Other"
                checked={gender === "Other"}
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
              <span>{tempDisease ? tempDisease.name : patient.disease}</span>
              <button onClick={toggleDisease}>Edit</button>
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
                      <button onClick={() => handleAddDisease(disease)}>
                        Add
                      </button>
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
                {tempDoctor
                  ? tempDoctor.first_name + " " + tempDoctor.last_name
                  : patient.doctor}
              </span>
              <button onClick={toggleDoctor}>Edit</button>
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
                      <button onClick={() => handleAddDoctor(doctor)}>
                        Add
                      </button>
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
              <span>{tempRoom ? tempRoom.name : patient.room}</span>
              <button onClick={toggleRoom}>Edit</button>
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
                      <button onClick={() => handleAddRoom(room)}>Add</button>
                    </td>
                  </tr>
                ))}
              </table>
            </TableContainer>
          </>
        )}
        <EditPatientBtn>Edit Patient</EditPatientBtn>
      </form>
    </Container>
  );
};

export default EditPatient;

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

const EditPatientBtn = styled.button`
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

const DoctorTitles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  border: 1px solid #dddddd;
  padding: 4px;
  margin-top: 30px;
`;
