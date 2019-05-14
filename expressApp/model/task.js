var mongoose = require('mongoose')
//This is defining the database structure
var Schema = mongoose.Schema;

let TaskSchema = new Schema({
	"taskname": String,
	"time": String,
	"description": String,
	"isCompleted": Boolean,
	"reminderTime": String
})

//we need to export the database structure

module.exports = mongoose.model('Task', TaskSchema)
