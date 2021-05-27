import React, { useState, Component, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow, MarkerClusterer } from '@react-google-maps/api';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import TripModal from './TripModal.jsx';
import { useAsync } from "react-async"
import Modal from 'react-modal';

const fetchLocations = async () => {
  const response = await fetch(`/api/trips`)
  if (!response.ok) throw new Error(response.status)
  return response.json();
}

const fetchCoordinates = async (location) => {
  const currentCoordinate = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyA4ASEqYx1KR_ivk3v1kntziAPUi1Z3qek`);
  return currentCoordinate.json();
}

const convert = async () => {
  const array = [];
  const locationData = await fetchLocations();
  for (let i = 0; i < locationData.length; i++) {
    const coord = await fetchCoordinates(locationData[i].location);
    array.push(coord.results[0]);
  }
  return array;
}

function Map() {

  const containerStyle = {
    width: '100%',
    height: '100%'
  };
  
  const center = {
    lat: -3.745,
    lng: -38.523
  };
  
  const [clickLocation, updateClickLocation] = useState('')
  
  function openPinModal() {
    updateClickLocation(this.title);
    setPinIsOpen(true);
  }
  
  function closePinModal() {
    setPinIsOpen(false);
   
  }
  
  const [pinModalIsOpen, setPinIsOpen] = useState(false);

  const markerArray = [];


  const {data, error} = useAsync({promiseFn: convert})

  if (error) return error;
  if (data) {
    for (let i = 0; i < data.length; i++) {
      let cityName = data[i].address_components[0].long_name
      let coordinates = data[i].geometry.location
      markerArray.push(<Marker position={coordinates} id={data[i]} title={cityName} key={cityName} onClick={openPinModal}/>)
    }
    return (

      <LoadScript
        googleMapsApiKey="AIzaSyA4ASEqYx1KR_ivk3v1kntziAPUi1Z3qek"
        mapIds={["bf7191d71e0bd124"]}
      >
        <div className="map">
        <GoogleMap
        
          mapContainerStyle={containerStyle}
          center={center}
          zoom={2}
          options={{ mapId: "bf7191d71e0bd124" }}
        >
        {markerArray}
          <Modal
            isOpen={pinModalIsOpen}
            onRequestClose={closePinModal}
            contentLabel='Modal to view existing pins'
            >
              <TripModal clickLocation={clickLocation} />
          </Modal>
        </GoogleMap>
        </div>
      </LoadScript>
  
    )
  };
  return null;
}

export default Map