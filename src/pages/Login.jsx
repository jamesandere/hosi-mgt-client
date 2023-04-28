import styled from "styled-components";
import { StyledForm } from "../components/StyledForm";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/authSlice";

const Login = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      loginUser({
        username: username,
        password: password,
      })
    );
  };

  return (
    <Container>
      <StyledForm onSubmit={handleSubmit}>
        <h3>Login</h3>
        <div className="form-control">
          <label>Username</label>
          <input type="text" onChange={(e) => setUsername(e.target.value)} />
        </div>
        {/* <div className="form-control">
          <label>Email</label>
          <input type="email" />
        </div> */}
        <div className="form-control">
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button>
          {auth.loginStatus === "pending" ? "Loading..." : "Login"}
        </button>
      </StyledForm>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  margin-top: 100px;
  min-height: calc(100vh - 50px);
  display: flex;
  justify-content: center;
`;
