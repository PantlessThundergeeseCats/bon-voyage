import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import DayView from './DayView.jsx';

// decalre react hook function
function NewEvent(props) {
  const [eventFormData, updateEventFormData] = useState(initialState);

  const initialState = Object.freeze({
    time: "",
    eventName: "",
    location: "",
    link: "",
    story: "",
    tripLocation: props
  });
  
  const handleChange = (e) => {
    e.preventDefault();
    updateEventFormData({
      ...eventFormData,
      [e.target.name]: e.target.value,
    });
  };
  
  function handleSubmit(e) {
    // functionality
    e.preventDefault();
    console.log('handle click entered');
    console.log('eventFormData:', eventFormData);
    fetch(`/api/new-event`, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
      // url: `/api/new-trip?name=${formData.tripName}&start_date=${formData.startDate}&end_date=${formData.endDate}&people=${formData.people}&location=${formData.location}`
      body: JSON.stringify(eventFormData),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .then(() => {
        console.log('submitted event')
        window.location = "http://localhost:8080";
      })
      .catch((err) => console.log("the error is client side"));
  }
  
  console.log('newEvent props', props)
  // return 
  return(
    // form element
    <Router>
      <Switch>
        <Route exact path='/add-event'>
          <form onSubmit={handleSubmit}>
            {/* 6 text inputs */}
            <label>   
              Time: 
              <input type='text' name='time' onChange={handleChange} />
            </label>
            <label>           
              Name: 
              <input type='text' name='eventName' onChange={handleChange} />
            </label>
            <label>
              Location: 
              <input type='text' name='location' onChange={handleChange} />
            </label>
            <label>
              Link: 
              <input type='text' name='link' onChange={handleChange} />
            </label>
            <label>
              Stories: 
              <input type='textarea' name='story' onChange={handleChange} />
            </label>
            <label>
              Add Photos: 
              <input type='file' name='photos' />
            </label>
            <input type='submit' value='Submit' />
          </form>
            <button>Back</button>
        </Route>
        <Route exact path='/day-view' component={DayView} />
      </Switch>
    </Router>
  )
}


// export 
export default NewEvent;