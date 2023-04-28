import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../features/api";
import { useDispatch } from "react-redux";
import { doctorsUpdate } from "../../features/doctorsSlice";

const EditDoctor = () => {
  const [doctor, setDoctor] = useState({});
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await axios.get(`${url}/doctors/${params.id}`);
        setDoctor(res.data);
        setFirstName(res.data.first_name);
        setLastName(res.data.last_name);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDoctor();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(
      doctorsUpdate({
        id: params.id,
        first_name: firstName,
        last_name: lastName,
      })
    ).then(() => navigate(`/doctors/${params.id}`));
  };

  return (
    <Container>
      <h3>Edit Doctor</h3>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <label>First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <label>Last Name:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </FormGroup>
        <button>Edit Doctor</button>
      </form>
    </Container>
  );
};

export default EditDoctor;

const Container = styled.div`
  margin-top: 50px;
  margin-left: 240px;

  h3 {
    margin-bottom: 20px;
  }

  form {
    width: 450px;

    button {
      margin-top: 10px;
      background-color: #018849;
      color: #fff;
      width: 200px;
      text-align: center;
      text-transform: uppercase;
      height: 41px;
      letter-spacing: 1px;
      cursor: pointer;
      border: none;
      outline: none;
      font-weight: 700;
      float: right;
    }
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
`;
