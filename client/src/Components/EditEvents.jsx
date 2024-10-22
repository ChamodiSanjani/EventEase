import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditEvents = () => {
    const {id} = useParams()
    const [events, setEvents] = useState({
        event_name: '',
        event_type: '',
        event_date: '',
        starting_time: '',
        ending_time: '',
        event_location: '',
        event_description: '',
        
      });
      
      const navigate = useNavigate()

      useEffect(()=> {

        axios.get('http://localhost:3000/auth/events/'+id)
        .then(result => {
            setEvents({
                ...events,
                event_name: result.data.Result[0].event_name,
                event_type: result.data.Result[0].event_type,
                event_date: result.data.Result[0].event_date,
                starting_time: result.data.Result[0].starting_time,
                ending_time: result.data.Result[0].ending_time,
                event_location: result.data.Result[0].event_location,
                event_description: result.data.Result[0].event_description,
            })
        }).catch(err => console.log(err))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put('http://localhost:3000/auth/edit_events/'+id, employee)
        .then(result => {
            if(result.data.Status) {
                navigate('/dashboard/events')
            } else {
                alert(result.data.Error)
            }
        }).catch(err => console.log(err))
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
            <button type="submit" className="btn btn-primary w-100">
              Edit Event
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditEvents