// import the useState hook from React, which lets us keep local state in a function component
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Modal from 'react-modal';
import FullTripView from './FullTripView.jsx';
// import api from '../server/routes/api.js';

// Modal.setAppElement('#root');

function TripModal(props) {
  console.log(props)
  // declare new state variables by calling the useState Hook. useState returns an array with a pair of values, a variable and a function that allows us to update that variable
  // array destructuring 
  const [tripName, updateTrip] = useState('Colombia');

  const [date, updateDate] = useState('May 22');

  const [people, updatePeople] = useState('Team Pink Fairy Armadillos');

  const [clickLocation, updateClickLocation] = useState('')

  // const [_id, updateId] = useState('')

  function passLocation() {
    updateClickLocation(props.clickLocation);
  }

  function deleteLocation(e) {
    e.preventDefault();
    console.log(e.target.value)
    fetch(`/api/remove-trip`, {
      method: "DELETE",
      // mode: "no-cors",
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
      // body: JSON.stringify(e.target.value),
    })
    .then((response) => response.json())
    .then((data) => console.log(data))
    // .then(() => {
    //   console.log('submitted trip')
    //   window.location = "http://localhost:8080";
    // })
    .catch((err) => console.log("the error is client side"));
  }

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path='/'>
            <h3>Trip: {props.clickLocation}</h3>
            <h3>Date: {date}</h3>
            <h3>PLACEHOLDER FOR IMG</h3>
            {/* <img/> */}
            <h3>People: {people}</h3>
            <Link to='/full-trip'  onClick={passLocation}>
              <button>
                See Trip Details
              </button>
            </Link>
              <button id="deleteButton" value={props.clickLocation} onClick={deleteLocation}>
                Delete trip
              </button>
          </Route>
          <Route exact path='/full-trip'>
            <FullTripView location={props.clickLocation} />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}


export default TripModal;