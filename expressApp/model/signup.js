var mongoose = require('mongoose')
var Schema = mongoose.Schema;
let SignupSchema = new Schema({
	"firstName": String,
	"lastName": String,
	"username": String,
	"password": String,
	"bio": String,
	"email": String,
	"gender": String,
	"phoneNumber": String,
	"address": String,
	"state": String 
})

module.exports = mongoose.model('Signup', SignupSchema)
