import styled from "styled-components";
import nhs from "../assets/images/nhs.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/authSlice";

const Navbar = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    dispatch(logout(null)).then(() => navigate(`/`));
  };

  return (
    <Container>
      <div className="logo">
        <Link to={`/`}>
          <img src={nhs} alt="nhs" />
        </Link>
      </div>
      <div className="cred">
        {!auth.token ? (
          <>
            <Link to={`/signup`}>
              <span>Sign up</span>
            </Link>
            <Link to={`/login`}>
              <span>Login</span>
            </Link>
          </>
        ) : (
          <>
            <Link to={`/`}>
              <span>{auth.user?.username}</span>
            </Link>
            <span>
              <span onClick={handleLogout}>Logout</span>
            </span>
          </>
        )}
      </div>
    </Container>
  );
};

export default Navbar;

const Container = styled.div`
  height: 50px;
  background-color: var(--very-dark-blue);
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100%;

  .logo {
    height: 100%;

    img {
      height: 100%;
    }
  }

  .cred {
    span {
      margin-right: 14px;
      cursor: pointer;
    }
  }

  a {
    text-decoration: none;
    color: white;
  }
`;
