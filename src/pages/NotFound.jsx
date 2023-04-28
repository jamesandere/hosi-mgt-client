import styled from "styled-components";

const NotFound = () => {
  return (
    <Container>
      <h2>404</h2>
      <p>Page not found</p>
    </Container>
  );
};

export default NotFound;

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
