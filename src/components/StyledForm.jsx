import styled from "styled-components";

export const StyledForm = styled.form`
  max-width: 400px;
  width: 100%;
  h3 {
    margin-bottom: 1.6rem;
    text-align: center;
  }

  .form-control {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 6px;
    padding: 6px 0;

    label {
      flex: 1;
    }

    input {
      flex: 2;
      height: 40px;
      outline: none;
      border: 1px solid rgb(220, 220, 220);
      border-radius: 5px;
      padding: 4px 6px;
    }
  }

  button {
    width: 100%;
    height: 40px;
    margin-top: 10px;
    background-color: #2c3333;
    cursor: pointer;
    color: white;
    padding: 6px 10px;
    outline: none;
    border: none;
    &:disabled {
      color: white;
      cursor: not-allowed;
      background-color: rgb(108, 168, 121);
    }
  }
`;
