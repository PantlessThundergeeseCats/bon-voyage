const db = require("../models/model.js");

const tripController = {};

tripController.getTrips = (req, res, next) => {
  const query = `SELECT * FROM trips`;
  db.query(query)
    .then((data) => {
      // console.log('data.rows', data.rows)
      return res.status(200).json(data.rows);
    })
    .catch(err => {
      console.log('tripController.getTrips: error getting trips');
      next(err);
    })
}

tripController.addTrip = (req, res, next) => {
	console.log("made it inside trip controller");
	console.log("before json", req.body);
	const { name, start_date, end_date, people, location } = req.body;

	const input = [name, start_date, end_date, people, location];

	const tripQuery = `INSERT INTO trips (name, start_date, end_date, people, location)
  VALUES ($1,$2,$3,$4,$5)`;

	db.query(tripQuery, input)
		.then((data) => {
			console.log(data, 'data')
			console.log("made it to dbQuery");
			next();
		})
		.catch((err) => {
			console.log("went into error in tripcontroller");
			next(err);
		});
};

tripController.removeTrip = (req, res, next) => {
	console.log("made it inside trip controller");
	console.log("req.body tripcontroller.removeTrip", req.body);
	const { tripName } = req.body;

	const input = [tripName];

	const tripQuery = `DELETE FROM trips 
  WHERE location = ($1)`;

	db.query(tripQuery, input)
		.then((data) => {
			console.log("made it to removetrip dbQuery");
			next();
		})
		.catch((err) => {
			console.log("went into error in tripcontroller.removetrip");
			next(err);
		});
};

module.exports = tripController;
