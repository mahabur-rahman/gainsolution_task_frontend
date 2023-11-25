import { useState } from "react";
import { Card, Col, Badge, Container, Row } from "react-bootstrap";
import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaTrashCan } from "react-icons/fa6";
import { MdOutlineEdit } from "react-icons/md";
import { useSelector } from "react-redux";

const SingleEvent = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [event, setEvent] = useState({});
  const [categoryList, setCategoryList] = useState([]);

  const { id } = useParams();

  const [updateMode, setUpdateMode] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  const PF = "https://gainsolution-task-backend.onrender.com/images/";

  const navigate = useNavigate();

  useEffect(() => {
    const getSingleEvent = async () => {
      try {
        const res = await axios.get(`https://gainsolution-task-backend.onrender.com/api/events/${id}`);
        setEvent(res.data);
           // Setting initial values for update mode
        setTitle(res.data.title || "");
        setDescription(res.data.description || "");
        setLocation(res.data.location || "");
      } catch (err) {
        console.log(err.message);
      }
    };

    getSingleEvent();
  }, [id]);

  // all category fetch
  useEffect(() => {
    const fetchCat = async () => {
      try {
        const res = await axios.get(`https://gainsolution-task-backend.onrender.com/api/categories`);
        setCategoryList(res?.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchCat();
  }, []);

  const {
    title: eventTitle,
    description: eventDescription,
    startDate,
    endDate,
    username,
    location: eventLocation,
    categories,
    createdAt,
    photo,
  } = event;

  // update event api call
  const updateEvent = async () => {
    try {
      await axios.put(`https://gainsolution-task-backend.onrender.com/api/events/${event._id}`, {
        username: currentUser.username,
        title,
        description,
        location,
      });
      setUpdateMode(false);
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  // Delete event
  const handleDelete = async () => {
    try {
      await axios.delete(`https://gainsolution-task-backend.onrender.com/api/events/${event._id}`, {
        data: { username: currentUser?.username },
      });
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <Container>
        <Row>
          <Col xl={8} lg={10} md={7} className="my-2 mx-auto">
            <Card>
              {photo && (
                <img
                  style={{ maxHeight: "250px" }}
                  className="postImg object-fit-cover"
                  src={PF + photo}
                  alt={eventTitle}
                />
              )}
              <div className="d-flex align-items-center justify-content-between p-3 text-info">
                <div>
                  <span className="mx-1">Author : </span>
                  <Link to={`/?user=${username}`}>{username}</Link>
                </div>
                {event?.username === currentUser?.username && (
                  <div>
                    {/* actions */}
                    <div className="text-danger mb-3">
                      <span
                        className="text-warning mx-3"
                        onClick={() => setUpdateMode(true)}
                      >
                        <MdOutlineEdit
                          style={{ fontSize: "1.5rem", cursor: "pointer" }}
                        />
                      </span>
                      <span onClick={handleDelete}>
                        <FaTrashCan
                          style={{ fontSize: "1.2rem", cursor: "pointer" }}
                        />
                      </span>
                    </div>
                    {new Date(createdAt).toDateString()}
                  </div>
                )}
              </div>
              <Card.Body>
                {updateMode ? (
                  <>
                    <label className="fw-semibold my-2">Title : </label>
                    <input
                      type="text"
                      className="form-control"
                      value={title}
                      autoFocus
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </>
                ) : (
                  <Card.Title>{eventTitle}</Card.Title>
                )}

                {updateMode ? (
                  <>
                    <label className="fw-semibold my-2">Description : </label>
                    <textarea
                      className="form-control"
                      value={description}
                      rows={3}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </>
                ) : (
                  <Card.Text>{eventDescription}</Card.Text>
                )}

                {updateMode ? (
                  <>
                    <label className="fw-semibold my-2">Location : </label>
                    <input
                      type="text"
                      className="form-control"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </>
                ) : (
                  <Card.Text>
                    Location:{" "}
                    <span className="text-success">{eventLocation}</span>
                  </Card.Text>
                )}
              </Card.Body>
              <div className="text-end py-2">
                <Badge pill bg="light" text="dark">
                  <div className="text-secondary text-lg">
                    Start Date: {startDate}
                  </div>
                </Badge>
                <Badge pill bg="light" text="dark">
                  <div className="text-secondary text-sm">
                    End Date: {endDate}
                  </div>
                </Badge>
              </div>
              <div className="text-end text-bg-secondary cursor-pointer py-1">
                {categories?.map((cat) => (
                  <Link
                    to={`/?cat=${cat}`}
                    className="mx-1 text-white"
                    key={cat._id}
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </Card>
          {updateMode && (
            <div className="my-3">
              <button
                className="bg-success text-white px-4 py-1 btn"
                onClick={updateEvent}
              >
                Update Event
              </button>
            </div>
          )}
          </Col>


          {/*  categories list */}
          <Col xl={4} className="my-2 mx-auto">
            <Card>
              <div className="d-flex align-items-center justify-content-between p-3 text-info">
                <div>
                  <span className="mx-1">Event Categories : </span>
                </div>
              </div>
              <Card.Body>
                {categoryList?.map((cat) => (
                  <Link  to={`/?cat=${cat.name}`} key={cat._id} className="mx-2">{cat.name}</Link>
                ))}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SingleEvent;
