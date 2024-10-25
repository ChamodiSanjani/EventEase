import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Events = () => {
<<<<<<< HEAD
  const [events, setEvents] = useState([]); // Corrected the variable name
  const navigate = useNavigate();
=======
  const [event, setEvent] = useState([]);
  const navigate = useNavigate()
>>>>>>> ad81b83e95ea1cb5221fb63b3695897ea5856b19

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/event")
      .then((result) => {
        if (result.data.Status) {
          setEvents(result.data.Result); // Corrected the setter
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3000/auth/delete_event/" + id)
      .then((result) => {
        if (result.data.Status) {
          window.location.reload();
        } else {
          alert(result.data.Error);
        }
      });
  };

  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Event List</h3>
      </div>
      <Link to="/dashboard/add_event" className="btn btn-success">
        Add Event
      </Link>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Event Type</th>
              <th>Event Date</th>
              <th>Starting Time</th>
              <th>Ending Time</th>
              <th>Event Location</th>
              <th>Event Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
<<<<<<< HEAD
            {events.map((e) => (
              <tr key={e.id}>
                <td>{e.event_name}</td>
                <td>{e.event_type}</td>
                <td>{e.event_date.split('T')[0]}</td>
=======
            {event.map((e) => (
              <tr>
                <td>{e.event_name}</td>
                <td>{e.event_type}</td>
                <td>{e.event_date}</td>
>>>>>>> ad81b83e95ea1cb5221fb63b3695897ea5856b19
                <td>{e.starting_time}</td>
                <td>{e.ending_time}</td>
                <td>{e.event_location}</td>
                <td>{e.event_description}</td>
<<<<<<< HEAD
=======
              
>>>>>>> ad81b83e95ea1cb5221fb63b3695897ea5856b19
                <td>
                  <Link
                    to={`/dashboard/edit_event/${e.id}`}
                    className="btn btn-info btn-sm me-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleDelete(e.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Events;