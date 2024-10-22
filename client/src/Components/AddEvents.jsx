import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddEvents = () => {
  const [events, setEvents] = useState({
    event_name: '',
    event_type: '',
    event_date: '',
    starting_time: '',
    ending_time: '',
    event_location: '',
    event_description: '',
    category_id: "",
    
  });
  const [category, setCategory] = useState([]);
  const navigate = useNavigate()

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
    e.preventDefault()
    const formData = new FormData();
    formData.append('event_name', events.event_name);
    formData.append('event_type', events.event_type);
    formData.append('event_date', events.event_date);
    formData.append('starting_time', events.starting_time);
    formData.append('ending_time', events.ending_time);
    formData.append('event_location', events.event_location);
    formData.append('event_description', events.event_description);
    formData.append('category_id', events.category_id);

    axios.post('http://localhost:3000/auth/add_events', formData)
    .then(result => {
        if(result.data.Status) {
            navigate('/dashboard/events')
        } else {
            alert(result.data.Error)
        }
    })
    .catch(err => console.log(err))
  }

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Add Event</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label for="inputEventName" className="form-label">
              Event Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputEventName"
              placeholder="Enter Name"
              onChange={(e) =>
                setEvents({ ...events, event_name: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputEventType" className="form-label">
              Event Type
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputEventType"
              placeholder="Enter Event Type"
              autoComplete="off"
              onChange={(e) =>
                setEvents({ ...events, event_type: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputEventDate" className="form-label">
              Event Date
            </label>
            <input
              type="date"
              className="form-control rounded-0"
              id="inputEventDate"
              placeholder="Enter Event Date"
              onChange={(e) =>
                setEvents({ ...events, event_date: e.target.value })
              }
            />
            <label for="inputStartingTime" className="form-label">
            Starting Time
            </label>
            <input
              type="time"
              className="form-control rounded-0"
              id="inputStartingTime"
              placeholder="Enter Starting Time"
              autoComplete="off"
              onChange={(e) =>
                setEvents({ ...events, starting_time: e.target.value })
              }
            />
          </div>
          <div className="col-12">
          <label for="inputEndingTime" className="form-label">
            Ending Time
            </label>
            <input
              type="time"
              className="form-control rounded-0"
              id="inputEndingTime"
              placeholder="Enter Ending Time"
              autoComplete="off"
              onChange={(e) =>
                setEvents({ ...events, ending_time: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="category" className="form-label">
              Category
            </label>
            <select name="category" id="category" className="form-select"
                onChange={(e) => setEvents({...events, category_id: e.target.value})}>
              {category.map((c) => {
                return <option value={c.id}>{c.name}</option>;
              })}
            </select>
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