import { useState } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateEvent = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [location, setLocation] = useState("");
  const [file, setFile] = useState("");
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
      // Validation
  if (!title || !description || !startDate || !endDate || !location || !file) {
    alert("Please fill in all fields");
    return;
  }
  
    const newEvent = {
      username: currentUser?.username,
      title,
      description,
      startDate,
      endDate,
      location,
      file,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newEvent.photo = filename;
      try {
        await axios.post("https://gainsolution-task-backend.onrender.com/api/upload", data);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      const res = await axios.post(
        "https://gainsolution-task-backend.onrender.com/api/events/create-event",
        newEvent
      );
      res.data && navigate('/')
     
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Container className="mb-5">
        <h3 className="text-center my-3">Create An Event</h3>
        <Row>
          <Col xl={6} lg={6} md={6} className="mx-auto">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="eventTitle">
                <Form.Label>Event Title :</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Write event title"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="eventDesc">
                <Form.Label>Description Of Event</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Description"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>

              <div className="d-flex items-center justify-content-between">
                <Form.Group className="mb-3" controlId="startDate">
                  <Form.Label>Start Date :</Form.Label>
                  <Form.Control
                    type="date"
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="endDate">
                  <Form.Label>End Date :</Form.Label>
                  <Form.Control
                    type="date"
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Choose File</Form.Label>
                  <Form.Control
                    type="file"
                    size="sm"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </Form.Group>
              </div>

              <Form.Group className="mb-3" controlId="location">
                <Form.Label>Location :</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Location"
                  onChange={(e) => setLocation(e.target.value)}
                />
              </Form.Group>

              <div className="gap-2">
                <Button variant="secondary" type="submit">
                  Create Event
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CreateEvent;
