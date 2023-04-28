import styled from "styled-components";
import { Link } from "react-router-dom";

const Widget = ({ data }) => {
  return (
    <Container>
      <Link to={`/${data.link}`}>
        <Icon>{data.icon}</Icon>
        <h3>{data.title}</h3>
        <p>
          {data.desc}: {data.total}
        </p>
      </Link>
    </Container>
  );
};

export default Widget;

const Container = styled.div`
  border-radius: 10px;
  min-height: 140px;
  color: ${({ color }) => color || "white"};
  background: ${({ bgColor }) => bgColor || "#CF5551"};
  padding: 10px 14px;
  cursor: pointer;
  a {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-decoration: none;
    color: white;
  }

  &:first-child {
    background: rgb(61, 122, 186);
  }

  &:nth-child(3) {
    background: #e89223;
  }
`;

const Icon = styled.div`
  font-size: 40px;
`;
