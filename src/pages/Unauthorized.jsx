import styled from "styled-components";

const Unauthorized = () => {
  return (
    <Container>
      <h2>401</h2>
      <p>You are not authorized!</p>
    </Container>
  );
};

export default Unauthorized;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  color: rgb(68, 68, 68);
  h2 {
    font-size: 55px;
  }
  p {
    font-size: 20px;
  }
`;
