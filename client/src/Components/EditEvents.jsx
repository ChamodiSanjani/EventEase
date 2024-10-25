import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditEvents = () => {
    const [events, setEvents] = useState({
        event_name: '',
        event_type: '',
        event_date: '',
        starting_time: '',
        ending_time: '',
        event_location: '',
        event_description: '',
        category_id: ''
    });
    const [category, setCategory] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    // Fetch categories and event data
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const result = await axios.get('http://localhost:3000/auth/category');
                if (result.data.Status) {
                    setCategory(result.data.Result);
                } else {
                    alert(result.data.Error);
                }
            } catch (err) {
                console.error(err);
            }
        };

        const fetchEvent = async () => {
            try {
                const result = await axios.get(`http://localhost:3000/auth/events/${id}`);
                if (result.data.Status) {
                    const eventData = result.data.Result[0];
                    setEvents({
                        event_name: eventData.event_name,
                        event_type: eventData.event_type,
                        event_date: eventData.event_date,
                        starting_time: eventData.starting_time,
                        ending_time: eventData.ending_time,
                        event_location: eventData.event_location,
                        event_description: eventData.event_description,
                        category_id: eventData.category_id // Set the category_id
                    });
                } else {
                    alert(result.data.Error);
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchCategories();
        fetchEvent();
    }, [id]); // Add id as a dependency

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3000/auth/edit_events/${id}`, events)
        .then(result => {
            if (result.data.Status) {
                navigate('/dashboard/events');
            } else {
                alert(result.data.Error);
            }
        }).catch(err => console.error(err));
    };

    return (
        <div className="container">
            <h2>Edit Event</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="inputEventName" className="form-label">Event Name</label>
                    <input
                        type="text"
                        className="form-control rounded-0"
                        id="inputEventName"
                        placeholder="Enter Event Name"
                        value={events.event_name}
                        onChange={(e) => setEvents({ ...events, event_name: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="inputEventType" className="form-label">Event Type</label>
                    <input
                        type="text"
                        className="form-control rounded-0"
                        id="inputEventType"
                        placeholder="Enter Event Type"
                        value={events.event_type}
                        onChange={(e) => setEvents({ ...events, event_type: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="inputEventDate" className="form-label">Event Date</label>
                    <input
                        type="date"
                        className="form-control rounded-0"
                        id="inputEventDate"
                        value={events.event_date}
                        onChange={(e) => setEvents({ ...events, event_date: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="inputStartingTime" className="form-label">Starting Time</label>
                    <input
                        type="time"
                        className="form-control rounded-0"
                        id="inputStartingTime"
                        value={events.starting_time}
                        onChange={(e) => setEvents({ ...events, starting_time: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="inputEndingTime" className="form-label">Ending Time</label>
                    <input
                        type="time"
                        className="form-control rounded-0"
                        id="inputEndingTime"
                        value={events.ending_time}
                        onChange={(e) => setEvents({ ...events, ending_time: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="inputEventLocation" className="form-label">Event Location</label>
                    <input
                        type="text"
                        className="form-control rounded-0"
                        id="inputEventLocation"
                        placeholder="Enter Event Location"
                        value={events.event_location}
                        onChange={(e) => setEvents({ ...events, event_location: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="inputEventDescription" className="form-label">Event Description</label>
                    <textarea
                        className="form-control rounded-0"
                        id="inputEventDescription"
                        placeholder="Enter Event Description"
                        value={events.event_description}
                        onChange={(e) => setEvents({ ...events, event_description: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="category" className="form-label">Category</label>
                    <select
                        name="category"
                        id="category"
                        className="form-select"
                        value={events.category_id}
                        onChange={(e) => setEvents({ ...events, category_id: e.target.value })}
                        required
                    >
                        <option value="">Select Category</option>
                        {category.map((c) => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Save Changes</button>
            </form>
        </div>
    );
};

export default EditEvents;
