import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import Widget from "../components/Widget";
import { FaBed, FaHeadSideVirus } from "react-icons/fa";
import { BsHospital } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import PatientsChart from "../components/PatientsChart";

const Home = () => {
  const { patients } = useSelector((state) => state.patients);
  const { doctors } = useSelector((state) => state.doctors);
  const { diseases } = useSelector((state) => state.diseases);

  const data = [
    {
      icon: <FaBed />,
      title: "Patient's Hub",
      desc: "Current patients in hospital",
      total: patients.length,
      color: "#fff",
      bgColor: "rgb(61, 122, 186)",
      link: "patients",
    },
    {
      icon: <BsHospital />,
      title: "Doctor's Hub",
      desc: "Current doctors in hospital",
      total: doctors.length,
      color: "#fff",
      bgColor: "rgb(61, 122, 186)",
      link: "doctors",
    },
    {
      icon: <FaHeadSideVirus />,
      title: "Disease Hub",
      desc: "Number of diseases recorded",
      total: diseases[0]?.length,
      color: "#fff",
      bgColor: "rgb(61, 122, 186)",
      link: "diseases",
    },
  ];

  return (
    <Container>
      <Sidebar />
      <Content>
        <WidgetWrapper>
          {data?.map((data, index) => (
            <Widget key={index} data={data} />
          ))}
        </WidgetWrapper>
        <PatientsChart />
      </Content>
    </Container>
  );
};

export default Home;

const Container = styled.div`
  display: flex;
  margin-top: 50px;
  min-height: 100vh;
`;

const Content = styled.div`
  margin-left: 240px;
  width: 100%;
  padding: 10px 20px;
`;

const WidgetWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
`;
