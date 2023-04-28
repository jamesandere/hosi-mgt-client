import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../features/api";
import { useDispatch } from "react-redux";
import { doctorsCreate } from "../../features/doctorsSlice";

const AddDoctor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(
      doctorsCreate({
        first_name: firstName,
        last_name: lastName,
      })
    ).then(() => navigate(`/doctors`));
  };

  return (
    <Container>
      <h3>Add Doctor</h3>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <label>First Name:</label>
          <input
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <label>Last Name:</label>
          <input
            type="text"
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </FormGroup>
        <button>Add Doctor</button>
      </form>
    </Container>
  );
};

export default AddDoctor;

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
