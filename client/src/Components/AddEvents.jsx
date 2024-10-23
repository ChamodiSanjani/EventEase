import axios from "axios";
import React, { useEffect, useState } from "react";
import { startTransition } from "react";
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
    formData.append('event_name', event.event_name);
    formData.append('event_type', event.event_type);
    formData.append('event_date', event.event_date);
    formData.append('starting_time', event.starting_time);
    formData.append('ending_time', event.ending_time);
    formData.append('event_location', event.event_location);
    formData.append('event_description', event.event_description);
    formData.append('category_id', event.category_id);

    axios.post('http://localhost:3000/auth/add_event', formData)
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
            <label for="inputName" className="form-label">
            Event Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Enter Name"
              onChange={(e) =>
                setEvent({ ...event_name, name: e.target.value })
              }
            />
            
          </div>
          <div className="col-12">
            <label for="event_type" className="form-label">
            Event Type
            </label>
            <select name="category" id="category" className="form-select"
                onChange={(e) => setEvent({...event_type, category_id: e.target.value})}>
              {category.map((c) => {
                return <option value={c.id}>{c.name}</option>;
              })}
            </select>
            
          </div>
          <div className="col-12 mt-3">
            <label htmlFor="inputDate" className="form-label">
            Event Date
            </label>
            <input
              type="date"
              className="form-control rounded-0"
              id="inputDate"
              onChange={(e) => setEvent({ ...event_date, date: e.target.value })
              }
            />

<div className="col-12">
  

          </div>
          <div className="col-12">
  <label htmlFor="inputTime" className="form-label">
    Starting Time
  </label>
  <input
    type="time"
    className="form-control rounded-0"
    id="inputTime"
    onChange={(e) =>
      setEvent({ ...starting_time, time: e.target.value })
    }
            />
          </div>

          </div>
          <div className="col-12">
  <label htmlFor="inputTime" className="form-label">
    Ending Time
  </label>
  <input
    type="time"
    className="form-control rounded-0"
    id="inputTime"
    onChange={(e) =>
      setEvent({ ...ending_time, time: e.target.value })
    }
            />
</div>
            <div className="col-12">
            
            
</div>
<div className="col-12">
            <label for="inputName" className="form-label">
            Event Location
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Enter Name"
              onChange={(e) =>
                setEvent({ ...event_location, name: e.target.value })
              }
            />
          </div>

          <div className="col-12">
            <label for="inputName" className="form-label">
            Event Description
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Enter Name"
              onChange={(e) =>
                setEvent({ ...event_ds, name: e.target.value })
              }
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