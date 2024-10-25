import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditEvents = () => {
<<<<<<< HEAD
    const { id } = useParams();
    const [event, setEvent] = useState({
        event_name: "",
        event_type: "",  // Add event_type to the state
        event_date: "",
        starting_time: "",
        ending_time: "",
        event_location: "",
        event_description: "",
        category_id: ""
    });
    const [category, setCategory] = useState([]);
    const navigate = useNavigate();
=======
    const {id} = useParams()
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
      const [category, setCategory] = useState([])
      const navigate = useNavigate()
>>>>>>> ad81b83e95ea1cb5221fb63b3695897ea5856b19

    useEffect(() => {
        axios.get('http://localhost:3000/auth/category')
            .then(result => {
                if (result.data.Status) {
                    setCategory(result.data.Result);
                } else {
                    alert(result.data.Error);
                }
            }).catch(err => console.log(err));

<<<<<<< HEAD
        axios.get('http://localhost:3000/auth/event/' + id)
            .then(result => {
                if (result.data.Status) {
                    const eventData = result.data.Result[0];
                    const formattedDate = eventData.event_date.split('T')[0];
                    setEvent({
                        event_name: result.data.Result[0].event_name,
                        event_type: result.data.Result[0].event_type,  // Prefill event_type
                        event_date: formattedDate,
                        starting_time: result.data.Result[0].starting_time,
                        ending_time: result.data.Result[0].ending_time,
                        event_location: result.data.Result[0].event_location,
                        event_description: result.data.Result[0].event_description,
                        category_id: result.data.Result[0].category_id
                    });
                } else {
                    alert(result.data.Error);
                }
            }).catch(err => console.log(err));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put('http://localhost:3000/auth/edit_event/' + id, event)
            .then(result => {
                if (result.data.Status) {
                    navigate('/dashboard/events');
                } else {
                    alert(result.data.Error);
                }
            }).catch(err => console.log(err));
    };
=======
        axios.get('http://localhost:3000/auth/employee/'+id)
        .then(result => {
            setEvent({
                ...event,
                event_name: result.data.Result[0].event_name,
                event_type: result.data.Result[0].event_type,
                event_date: result.data.Result[0].event_date,
                starting_time: result.data.Result[0].starting_time,
                ending_time: result.data.Result[0].ending_time,
                event_location: result.data.Result[0].event_location, 
                event_description: result.data.Result[0].event_description,
                category_id: result.data.Result[0].category_id
            })
        }).catch(err => console.log(err))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put('http://localhost:3000/auth/edit_event/'+id, event)
        .then(result => {
            if(result.data.Status) {
                navigate('/dashboard/event')
            } else {
                alert(result.data.Error)
            }
        }).catch(err => console.log(err))
    }
    
  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Edit Event</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label for="inputName" className="form-label">
              Event Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Enter Event Name"
              value={event.event_name}
              onChange={(e) =>
                setEvent({ ...event, event_name: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="event_type" className="form-label">
              Event Type
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="event_type"
              placeholder="Enter Event Type"
              autoComplete="off"
              value={event.event_type}
              onChange={(e) =>
                setEvent({ ...event, event_type: e.target.value })
              }
            />
          </div>
          <div className='col-12'>
            <label for="inputDate" className="form-label">
              Date
            </label>
            <input
              type="date"
              className="form-control rounded-0"
              id="inputDate"
              
              autoComplete="off"
              value={event.event_date}
              onChange={(e) =>
                setEvent({ ...event, event_date: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputStartTime" className="form-label">
              Starting Time
            </label>
            <input
              type="time"
              className="form-control rounded-0"
              id="inputStartTime"
              
              autoComplete="off"
              value={event.starting_time}
              onChange={(e) =>
                setEvent({ ...event, starting_time: e.target.value })
              }
            />
          </div>
          <div className="col-12">
          <label for="inputEndTime" className="form-label">
              Ending Time
            </label>
            <input
              type="time"
              className="form-control rounded-0"
              id="inputEndTime"
              
              autoComplete="off"
              value={event.ending_time}
              onChange={(e) =>
                setEvent({ ...event, ending_time: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputLocation" className="form-label">
              Location
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputLocation"
              placeholder="Enter Location"
              autoComplete="off"
              value={event.event_type}
              onChange={(e) =>
                setEvent({ ...event, event_type: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputDescription" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputDescription"
              placeholder="Enter Description"
              autoComplete="off"
              value={event.event_type}
              onChange={(e) =>
                setEvent({ ...event, event_type: e.target.value })
              }
            />
          </div>
          
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Edit Event
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
>>>>>>> ad81b83e95ea1cb5221fb63b3695897ea5856b19

    return (
        <div className="d-flex justify-content-center align-items-center mt-3">
            <div className="p-3 rounded w-50 border">
                <h3 className="text-center">Edit Event</h3>
                <form className="row g-1" onSubmit={handleSubmit}>
                    <div className="col-12">
                        <label htmlFor="eventName" className="form-label">Event Name</label>
                        <input
                            type="text"
                            className="form-control rounded-0"
                            id="eventName"
                            placeholder="Enter Event Name"
                            value={event.event_name}
                            onChange={(e) => setEvent({ ...event, event_name: e.target.value })}
                        />
                    </div>

                    <div className="col-12">
                        <label htmlFor="category" className="form-label">Category</label>
                        <select
                            name="category"
                            id="category"
                            className="form-select"
                            value={event.event_type}
                            onChange={(e) => setEvent({ ...event, event_type: e.target.value })}
                        >
                            {category.map((c) => (
                                <option key={c.id} value={c.name}>{c.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="col-12">
                        <label htmlFor="eventDate" className="form-label">Event Date</label>
                        <input
                            type="date"
                            className="form-control rounded-0"
                            id="eventDate"
                            value={event.event_date}
                            onChange={(e) => setEvent({ ...event, event_date: e.target.value })}
                        />
                    </div>

                    <div className="col-12">
                        <label htmlFor="startTime" className="form-label">Starting Time</label>
                        <input
                            type="time"
                            className="form-control rounded-0"
                            id="startTime"
                            value={event.starting_time}
                            onChange={(e) => setEvent({ ...event, starting_time: e.target.value })}
                        />
                    </div>

                    <div className="col-12">
                        <label htmlFor="endTime" className="form-label">Ending Time</label>
                        <input
                            type="time"
                            className="form-control rounded-0"
                            id="endTime"
                            value={event.ending_time}
                            onChange={(e) => setEvent({ ...event, ending_time: e.target.value })}
                        />
                    </div>

                    <div className="col-12">
                        <label htmlFor="location" className="form-label">Location</label>
                        <input
                            type="text"
                            className="form-control rounded-0"
                            id="location"
                            value={event.event_location}
                            onChange={(e) => setEvent({ ...event, event_location: e.target.value })}
                        />
                    </div>

                    <div className="col-12">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea
                            className="form-control rounded-0"
                            id="description"
                            value={event.event_description}
                            onChange={(e) => setEvent({ ...event, event_description: e.target.value })}
                        />
                    </div>

                    <div className="col-12">
                        <button type="submit" className="btn btn-primary w-100">
                            Edit Event
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditEvents;