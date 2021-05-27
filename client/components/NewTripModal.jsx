import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { TextField } from "@material-ui/core";

Modal.setAppElement("#root");

const initialState = Object.freeze({
	name: "",
	start_date: "",
	end_date: "",
	people: "",
	location: "",
});

function NewTripModal(props) {
	const [formData, updateFormData] = useState(initialState);

	const handleChange = (e) => {
		e.preventDefault();
		updateFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	// define event handler for on click of submit to send post request to the server
	// useEffect(() => {
		const handleSubmit = (e) => {
      e.preventDefault();
			console.log('this is props', props)
			props.closeNewTrip();
			console.log(formData);
			fetch(`/api/new-trip`, {
				method: "POST",
				mode: "no-cors",
				headers: {
					"Content-type": "application/x-www-form-urlencoded",
				},
				// url: `/api/new-trip?name=${formData.tripName}&start_date=${formData.startDate}&end_date=${formData.endDate}&people=${formData.people}&location=${formData.location}`
				body: JSON.stringify(formData),
			})
				.then((response) => response.json())
				.then((data) => console.log(data))
				.then(() => {
					console.log('submitted trip')
					window.location = "http://localhost:8080";
				})
				.catch((err) => console.log("the error is client side"));
		};
	// });
	console.log("This is Link", Link);

	return (
		<form onSubmit={handleSubmit}>
			<TextField id="name" name="name" label="Give your trip a name" variant="outlined" onChange={handleChange} />
			<br></br>
			<TextField id="start_date" name="start_date" label="Start Date" variant="outlined" onChange={handleChange} />
			<br></br>
			<TextField id="end_date" name="end_date" label="End Date" variant="outlined" onChange={handleChange} />
			<br></br>
			<TextField id="people" name="people" label="Who did you go with?" variant="outlined" onChange={handleChange} />
			<br></br>
			<TextField id="location" name="location" label="City" variant="outlined" onChange={handleChange} />
			<br></br>
			<input type="submit" value="Submit" />
		</form>
	);
}

export default NewTripModal;
