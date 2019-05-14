 var express = require('express')
 var bodyParser = require('body-parser')
 var app = express() 
 var port = 3000 || process.env.port

 var mongoose = require('mongoose') //this is the same as import mongoose from 'mongoose'

 const uri = "mongodb+srv://tobigirl:tobiisagirl@expressapp-3s3ph.mongodb.net/expressApp?retryWrites=true"

 var options = {
 	reconnentTries : Number.MAX_VALUE,
 	poolSize : 10
 }

 mongoose.connect(uri).then(
 	() => {console.log("connection established")},
 	err => {console.log("Connection error due to", err) } 
 	);

 //import database model
 var Login = require('./model/login')
 var SignUp = require('./model/signup')
 var Task = require('./model/task')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 // parse application/json
app.use(bodyParser.json())

//We need to provide route for our appication
//The user will post data to the server when signing up so we need to use a post method

app.post('/signup', function(req, res){
	//I'm expecting data from a form from the server so i will use a module called Body	parser
	var signupData = req.body
	//then save the data inside my database
	var saveSignUpData = new SignUp(req.body)
	saveSignUpData.save(function(err, dataSignUp)
	{
		if(err){res.send(err)}
			else{
				var saveLoginData = new Login({username : req.body.username, password : req.body.password})

				saveLoginData.save(function(err,data){
					if(err){res.send(err)}
						else{ res.json(dataSignUp)}
				})
			}
	})

	//send server response
	res.send(signupData)
})


//handle login route
//This is also going to be a post method 
app.post('/login', function(req, res){
	//Extract the data that is coming in from your response
	var loginData = req.body
	//check if the login credentials is correct in your database
	Login.find({username: req.body.username, password:req.body.password}, function(err, data){
		if(err){
			res.send(err)}
			else{
				console.log(data)
				if(data[0]){
					res.send('Login Successful')
				}else{ 
					res.send('User does not exist')
				}
			}
		})
	})

app.post('/home', function(req, res){
	var taskname = req.body

	//send task to the database
	var saveTaskData = new Task(req.body)
	saveTaskData.save(function(err, dataTask){
		if(err){
			res.send(err) 
		}else{
			res.json(dataTask)
		}
	})
})

//route to update the task
app.patch('/update/:taskId', function(req, res){
	//get the data from the request
	// taskID = req.params.taskId    --This will allow me know which task i want to update so i check with its id in the database
	//var updateData = req.body.isCompleted
	var update = req.body
	//update your database
	Task.findByIdAndUpdate({_id : req.params.taskId}, update, function(err, data){
		if(err){res.send(err)}
			else{ res.send(data)}
	})
})
				

//handle the delete task
app.delete('/delete:taskId', function(req, res){
	//get the task ID
	var taskID = req.params.taskID  //The req.params is made available by the body parser module.
	//search for the task in the database using its ID and delete if found
	Task.findByIdAndRemove(taskId, function(err){
		if(err){res.send(err)}
			else{ res.send("Task deleted")}
	})
	
})

//handle the logout route
app.get('/logout', function(req, res){
	res.send('Logout Successful')
})


 app.listen(port, function(){
 	console.log(`Server started at port ${port}`)
 })