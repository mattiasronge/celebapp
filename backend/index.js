/**
 * 
 *  It's backend using nodejs.
 */

/**
 * Setting configuration
 * 
 */
const PORT = 3000;
const express = require('express');
const jsonwebtoken = require('jsonwebtoken');
const mongoose = require('mongoose');
const cors = require('cors');

const URL = "mongodb+srv://Mattias:Admin123!@cluster0-feh7x.mongodb.net/celeb?retryWrites=true";

mongoose.connect(`${URL}`, { useNewUrlParser: true })

.then(()=> {
    console.log(`Database Connected.`);
})
.catch(err => console.error(err.stack))

/**
 * Setting Routing
 * 
 */

let celebsRoute = require('./routes/celebs');

/**
 * Routing 
 * 
 */
let App = express();

App.use(express.json());
App.use(cors()); // Dev

/**
 * Handling 
 * 
 */
App.route('/celebs/all')
.get(celebsRoute.all)

App.route('/celebs/add')
.post(celebsRoute.add)

App.route('/celebs/delete/:celebId')
.get(celebsRoute.del)

App.route('/celebs/update/:celebId')
.post(celebsRoute.update)

App.route('/celebs/seen/:celebId')
.post(celebsRoute.seen)

App.route('/celebs/seenList')
.get(celebsRoute.seenList)

App.listen(PORT, () => {
    console.info(`Node API running on port ${PORT}.`);
    console.info(`Connecting to the database...`);
})