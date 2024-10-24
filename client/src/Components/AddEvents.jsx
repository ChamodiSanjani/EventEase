import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddEvents = () => {
  const [event, setEvent] = useState({
    event_name: "",
    event_type: "",
    event_date: "",
    starting_time: "",
    ending_time: "",
    event_location: "",
    event_description: "",
    category_id: ""
  });

  const [category, setCategory] = useState([]);
  const navigate = useNavigate();

  // Fetch categories for event types
  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/category")
      .then((result) => {
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Log the event data for debugging
    console.log(event);

    // Send the event data to the server
    axios.post('http://localhost:3000/add_event', event, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(result => {
      if (result.data.Status) {
        navigate('/dashboard/events');
      } else {
        alert(result.data.Error);
      }
    })
    .catch(err => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Add Event</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="inputName" className="form-label">Event Name</label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Enter Name"
              onChange={(e) => setEvent({ ...event, event_name: e.target.value })}
              value={event.event_name} // Add value to track form field
            />
          </div>
          <div className="col-12">
            <label htmlFor="event_type" className="form-label">Event Type</label>
            <select
              name="category"
              id="category"
              className="form-select"
              onChange={(e) => setEvent({ ...event, category_id: e.target.value })}
              value={event.category_id}  // Use category_id instead of event_type
            >
              <option value="">Select Category</option>
              {category.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div className="col-12 mt-3">
            <label htmlFor="inputDate" className="form-label">Event Date</label>
            <input
              type="date"
              className="form-control rounded-0"
              id="inputDate"
              onChange={(e) => setEvent({ ...event, event_date: e.target.value })}
              value={event.event_date} // Add value to track form field
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputStartTime" className="form-label">Starting Time</label>
            <input
              type="time"
              className="form-control rounded-0"
              id="inputStartTime"
              onChange={(e) => setEvent({ ...event, starting_time: e.target.value })}
              value={event.starting_time} // Add value to track form field
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputEndTime" className="form-label">Ending Time</label>
            <input
              type="time"
              className="form-control rounded-0"
              id="inputEndTime"
              onChange={(e) => setEvent({ ...event, ending_time: e.target.value })}
              value={event.ending_time} // Add value to track form field
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputLocation" className="form-label">Event Location</label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputLocation"
              placeholder="Enter Location"
              onChange={(e) => setEvent({ ...event, event_location: e.target.value })}
              value={event.event_location} // Add value to track form field
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputDescription" className="form-label">Event Description</label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputDescription"
              placeholder="Enter Description"
              onChange={(e) => setEvent({ ...event, event_description: e.target.value })}
              value={event.event_description} // Add value to track form field
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Add Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEvents;
