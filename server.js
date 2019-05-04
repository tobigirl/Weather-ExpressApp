var http = require('http');
var fs = require('fs');
var url = require('url');
var formidable = require('formidable');

	//creating the server 
	http.createServer(function(req, res){
		var tobi = url.parse(req.url, true)
		var filename = '.' + tobi.pathname
		//var path = req.url

		fs.readFile(filename, function(err, data){
			if(err){
				//defining what the system should do if there is an error
				res.writeHead(404, {'Content-Type': 'text/html'});
				//the error message
				return res.end('File not found')
			}

				res.writeHead(200, {'Content-Type': 'text/html'});
				//indicating it is an html file.
				res.write(data);
				return res.end();
		})

		//uploading a file using node module - formidable
		if(req.url == '/uploadfile'){ 
			var form = new formidable.IncomingForm();
			form.parse(req, function(err, fields, files){
				//carry out the task after the file has been uploaded
				var oldpath = files.filetoupload.path;
				//open folder to select file from
				var newpath = 'C:\wamp\www\JS_class\task2' + files.filetoupload.name;
				//this is the folder the file will be uploaded to
				fs.rename(oldpath, newpath, function(err){
				//saving the file in a new folder
					if(err) throw err;
					res.write('File Uploaded and Moved');
					res.end();
				})
			})
		}

	}).listen(5000);