/* eslint-disable react/prop-types */
import { Card, Col, Badge } from "react-bootstrap";
import { useState } from "react";
import { FacebookIcon, TwitterIcon, WhatsappIcon } from "react-share";
import { Link } from "react-router-dom";

const Event = ({ event }) => {
  const [copied, setCopied] = useState(false);
  const PF = "https://gainsolution-task-backend.onrender.com/images/";
  const eventUrl = `https://gainsolution-task-backend.onrender.com/event/${event._id}`;

  const copyLinkToClipboard = () => {
    navigator.clipboard
      .writeText(eventUrl)
      .then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 3000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const shareCopiedLink = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Check out this event!",
          url: eventUrl,
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error sharing:", error));
    }
  };

  const getDescription = () => {
    const words = event.description.split(' ');
    if (words.length > 15) {
      return words.slice(0, 15).join(' ') + '...';
    }
    return event.description;
  };

  return (
    <>
      <Col xl={4} lg={6} md={4} className="my-2" key={event._id}>
        <Card style={{ height: "500px" }}>
          {event.photo && (
            <img
              width="100%"
              height="300px"
              className="object-fit-cover"
              src={PF + event.photo}
              alt={event.title}
            />
          )}
          <Link to={`/event/${event._id}`} style={{ color: "inherit" }}>
            <Card.Body>
              <Card.Title>{event.title}</Card.Title>
              <Card.Text>{getDescription(event.description)}</Card.Text>
              <Card.Text>
                Location: <span className="text-success">{event.location}</span>
              </Card.Text>
            </Card.Body>
          </Link>
          <div className="text-end py-2">
            <Badge
              pill
              bg="light"
              text="dark"
              className="mx-1"
              onClick={() => {
                copyLinkToClipboard();
                shareCopiedLink();
              }}
              style={{ cursor: "pointer" }}
            >
              {copied ? "Link Copied!" : "Copy & Share Link"}
            </Badge>
            <FacebookIcon
              style={{ cursor: "pointer" }}
              size={32}
              round
              onClick={shareCopiedLink}
            />
            <TwitterIcon
              style={{ cursor: "pointer" }}
              className="mx-2"
              size={32}
              round
              onClick={shareCopiedLink}
            />
            <WhatsappIcon
              style={{ cursor: "pointer" }}
              size={32}
              round
              onClick={shareCopiedLink}
            />
          </div>
          <div className="text-end text-bg-secondary cursor-pointer py-1">
            {event?.categories?.map((cat) => (
              <span className="mx-1" key={cat._id}>
                {cat}
              </span>
            ))}
          </div>
        </Card>
      </Col>
    </>
  );
};

export default Event;
