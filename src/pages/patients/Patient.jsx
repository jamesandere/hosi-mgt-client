import styled from "styled-components";
import { BsPersonVcard } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { setHeaders, url } from "../../features/api";

const Patient = () => {
  const [patient, setPatient] = useState({});
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const res = await axios.get(
          `${url}/patients/${params.id}`,
          setHeaders()
        );
        setPatient(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPatient();
  }, []);

  return (
    <Container>
      <Details>
        <Icon>
          <BsPersonVcard />
        </Icon>
        <h3>
          {patient.first_name} {patient.last_name}
        </h3>
        <h4>Age: {patient.age}</h4>
        <h4>Sex: {patient.sex}</h4>
      </Details>
      <h3>Patient info:</h3>
      <h4>
        Disease: {patient.disease ? patient.disease : "Not diagnosed yet"}
      </h4>
      <h4>Doctor: {patient.doctor ? patient.doctor : "No doctor yet"}</h4>
      <EditBtn onClick={() => navigate(`/patients/${params.id}/edit`)}>
        Edit patient info
      </EditBtn>
    </Container>
  );
};

export default Patient;

const Container = styled.div`
  margin-top: 50px;
  margin-left: 240px;

  h4 {
    margin: 10px 0;
  }
`;

const Details = styled.div`
  background: rgba(48, 51, 78);
  color: rgba(234, 234, 255, 0.87);
  border-radius: 5px;
  width: 500px;
  padding: 1rem 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 10px;

  h3 {
    line-height: 1.9;
    font-size: 24px;
  }

  h4 {
    line-height: 1.9;
    font-size: 18px;
  }
`;

const Icon = styled.div`
  flex: 1;
  font-size: 60px;
  margin-right: 20px;
`;

const EditBtn = styled.button`
  background: #41644a;
  color: #fff;
  padding: 6px 8px;
  border: none;
  outline: none;
  border-radius: 3px;
  cursor: pointer;
  margin-top: 12px;
`;
