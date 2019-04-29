const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let celebsSchema = new Schema({
    name: String,
	done: Number
})

let celebs = mongoose.model('celebs', celebsSchema);

module.exports = celebs;
