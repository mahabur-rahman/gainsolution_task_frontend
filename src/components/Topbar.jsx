import { Container, Navbar, Dropdown } from "react-bootstrap";
import logo from "../images/mainLogo.webp";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice";

const Topbar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const navigate = useNavigate()

  // logout
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login')
  };
  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Link to="/" className="text-black">
            <img src={logo} alt="logo" className="logo" />
          </Link>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <Link to={`/`} className=" mx-4">
                Events
              </Link>
            </Navbar.Text>
            <Navbar.Text>
              <Link to={`/register`}>Register</Link>
            </Navbar.Text>
            <Navbar.Text className="mx-3">
              <Link to={`/login`}>Login</Link>
            </Navbar.Text>

            {currentUser && (
              <Navbar.Text>
                <Link to={`/create-event`}>Create Event</Link>
              </Navbar.Text>
            )}

            {currentUser && (
              <Navbar.Text className="mx-3">
                <Dropdown>
                  <Dropdown.Toggle variant="light">
                    <img
                      width="40"
                      height="40"
                      style={{ borderRadius: "50%" }}
                      src={
                        "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=826&t=st=1700806218~exp=1700806818~hmac=44b8c6f3584d7b7dffca7c5127dfdcbb797d4c76883f2a16e5f0cecc5c16b21f"
                      }
                    />
                    <span className="mx-2 text-capitalize">
                      {currentUser.username}
                    </span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item>
                      <div
                        className="logout_btn bg-transparent border-0 text-danger"
                        onClick={handleLogout}
                      >
                        Logout
                      </div>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Navbar.Text>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Topbar;
