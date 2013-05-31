
/*
 * GET cat related pages.
 */

var path = require('path'),
	mongoose = require('mongoose');

var schemas = require(path.join(__dirname,"..","models","schemas"));
var Cat = mongoose.model('Cat', schemas.cat);

var catNames = [
	'Pixie',
	'Shadow',
	'Jade',
	'Jewel'
];

var catColors = [
	'brown',
	'black',
	'white',
	'grey',
	'orange'
];

function getRandomInt(low, high) {
	var len = high-low+1;
	var idx = Math.round(Math.random()*len)+low;
	if (idx == low+len) {idx = low;}
	return (idx);
}

exports.get_all = function(req, res){
	Cat
	.find()
	.sort('age')
	.exec(function (err, allCats) {
		if (err) {
			console.log(err);
			res.send("Error getting cats from collection.");
		}
		else {
			res.render('cat_list', {
				cats: allCats,
				title: 'Listing of all cats'
			});
		}
	});
}

exports.add_cat = function(req, res){
	
	// Create copy of catColors array
	var colorOptions = catColors.slice(0);
	var colorSelections = [];
	for (var i = 0; i < getRandomInt(1,catColors.length); i++) {
		var newIdx = getRandomInt(0,colorOptions.length-1);
		colorSelections.push(colorOptions[newIdx]);
		colorOptions.splice(newIdx,1);
	}
	var newCat = new Cat(
		{
			name: catNames[getRandomInt(0,catNames.length-1)],
			age: getRandomInt(0,18),
			colors: colorSelections
		}
	);
	
	newCat.save(function(err) {
		if (err) {console.log("Problem saving new cat.", err);}
	});
	
	res.send(
		"New cat created with\n\t"+
		"Name: "+newCat.name+"\n\t"+
		"Age: "+newCat.age+"\n\t"+
		"Colors: "+newCat.colors
	);
};

exports.get_by_color = function(req, res){
	Cat
	.find()
	.where('colors').in([req.params.color])
	.sort('age')
	.exec(function (err, cats) {
		if (err) {
			console.log(err);
			res.send("Error getting cats from collection.");
		}
		else {
			res.render('cat_list', {
				cats: cats,
				title: 'Listing of all cats with color '+req.params.color
			});
		}
	});
};

exports.delete_oldest = function(req, res){
	Cat
	.find()
	.limit(1)
	.sort('-age')
	.exec(function (err, cats) {
		if (err) {
			console.log(err);
			res.send("Error getting cats from collection.");
		}
		else {
			// Cats should only have 1 element.
			// Remove it from collection.
			for (var i = 0; i < cats.length; i++) {cats[i].remove();}
			res.render('cat_list', {
				cats: cats,
				title: 'All removed cats'
			});
		}
	});
};
