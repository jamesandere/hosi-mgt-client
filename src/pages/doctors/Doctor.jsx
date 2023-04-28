import styled from "styled-components";
import { BsPersonVcard } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../features/api";

const Doctor = () => {
  const [doctor, setDoctor] = useState({});
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await axios.get(`${url}/doctors/${params.id}`);
        setDoctor(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDoctor();
  }, []);

  return (
    <Container>
      <Details>
        <Icon>
          <BsPersonVcard />
        </Icon>
        <h3>
          {doctor.first_name} {doctor.last_name}
        </h3>
      </Details>
      <EditBtn onClick={() => navigate(`/doctors/${params.id}/edit`)}>
        Edit doctor info
      </EditBtn>
    </Container>
  );
};

export default Doctor;

const Container = styled.div`
  margin-top: 50px;
  margin-left: 240px;
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
