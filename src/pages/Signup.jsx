import styled from "styled-components";
import { StyledForm } from "../components/StyledForm";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/authSlice";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (auth.token) {
      navigate(from, { replace: true });
    }
  }, [auth.token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(
      registerUser({
        username: username,
        email: email,
        password: password,
      })
    ).then(() => navigate(`/`));
  };

  return (
    <Container>
      <StyledForm onSubmit={handleSubmit}>
        <h3>Sign Up</h3>
        <div className="form-control">
          <label>Username</label>
          <input type="text" onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="form-control">
          <label>Email</label>
          <input type="email" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-control">
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button>{auth.status === "pending" ? "Loading..." : "Sign up"}</button>
      </StyledForm>
    </Container>
  );
};

export default Signup;

const Container = styled.div`
  margin-top: 100px;
  min-height: calc(100vh - 50px);
  display: flex;
  justify-content: center;
`;
