/* eslint-disable react/prop-types */
import Event from "./Event";

const EventList = ({ events  }) => {
  return (
    <>
      {events?.map((event) => (
        <>
          <Event key={event._id} event={event} />
        </>
      ))}
    </>
  );
};

export default EventList;
