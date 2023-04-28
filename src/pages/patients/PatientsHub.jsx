import { NavLink, Outlet } from "react-router-dom";
import styled from "styled-components";

const PatientsHub = () => {
  return (
    <Container>
      <SideNav>
        <SideMenu>
          <NavLink to="">
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/patients">
            <span>See patients</span>
          </NavLink>
          <NavLink to="/patients/add">
            <span>Add Patient</span>
          </NavLink>
        </SideMenu>
      </SideNav>
      <Content>
        <Outlet />
      </Content>
    </Container>
  );
};

export default PatientsHub;

const Container = styled.div`
  display: flex;
`;

const SideNav = styled.div`
  height: 100vh;
  border-right: 1px solid var(--grayish-blue);
  width: 240px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  overflow-x: hidden;
  margin-top: 50px;
  background-color: #f8f8f8;
`;

const SideMenu = styled.div`
  background-color: #eeeeee;

  a {
    text-decoration: none;
    color: inherit;

    span {
      line-height: 1.5;
      display: block;
      padding: 10px 16px;
      border-bottom: 1px solid #ddd;

      &:last-child {
        border: none;
      }
    }
  }
`;

const Content = styled.div`
  padding: 20px 30px;
`;
