var mongoose = require('mongoose');

var cat = mongoose.Schema(
	{
		name: String,
		age: Number,
		colors: [String]
	}
);

exports.cat = cat;
