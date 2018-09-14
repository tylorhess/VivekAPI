let express = require('express');
let app = express();
let port = process.env.PORT || 3018; // process.env.PORT <--(for heroku)

// use 'body-parser' module to parse HTTP requests
let bodyParser = require('body-parser');
// app.use(bodyParser.json());	// contentType: 'application/json' 
app.use(bodyParser.urlencoded({ extended: true })); // contentType: 'application/x-www-form-urlencoded'

//----- static server -----//
app.use('/', express.static(__dirname+'/public')); // hosts any 'file.html' in 'public' folder at url.com/file.html

//----- dynamic server -----//
// CRUD = Create, Read, Update, Delete
//      = POST    GET   PUT     DELETE

app.get('/locations/search', (req, res, next) => {
	let lat  = +req.query.lat;
	let long = +req.query.long;

	let locationsArray = getLocations();
	let closestLocation = findClosestLocation(lat, long, locationsArray);
	let photosIdArray = closestLocation.photos;
	let photosArray = [];
	for (let i = 0; i < photosIdArray.length; i++){
		let photo = photosIdArray[i];
		photosArray.push(getPhotoById(photo.id));
	}

	res.json(photosArray);
	
});
function getLocations(){
	let location = {
		id: 'as98daw8dg',
		name: 'location name',
		lat: 123.456,
		long: 234.567,
		photos: [
			'0a8sdyawh97h'
		]
	};
	return [location];
}
function getPhotoById(id) {
	let photo = {
		id: '0a8sdyawh97h',
		photo_uri: 'https://..',
		tags: '#hastag'
	};
	return photo;
}
function findClosestLocation(lat, long, locationsArray) {
	return locationsArray[0];
}



/*

// POST /users --> create/respond with new user
app.post('/users', function (req, res, next) {
	req.body --> newUser
	//res.sendStatus(200); // send HTTP response status 200 (success)
	res.json(newUser); // newUser.id from database
});

// GET /users --> get all users
app.get('/users', function (req, res, next) {
	res.json(usersArray);
});

// GET /users/:id --> get user with :id
app.get('/users/:id', function (req, res, next) {
	req.params.id --> id
	res.json(user);
});

// PUT /users/:id --> update user with :id
app.put('/users/:id', function (req, res, next) {
	req.params.id --> id
	req.body --> updatedUser
	//res.sendStatus(200); // send HTTP response status 200 (success)
	res.json(updatedUser);
});

// DELETE /users/:id --> delete user with :id
app.delete('/users/:id', function (req, res, next) {
	req.params.id --> id
	//res.sendStatus(200); // send HTTP response status 200 (success)
	res.json(deletedPlayer);
});

*/

//----- run server -----//
app.listen(port, function() { console.log('localhost:'+port); });

