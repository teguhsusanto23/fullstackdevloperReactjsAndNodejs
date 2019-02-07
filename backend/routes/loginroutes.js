var mysql = require('mysql');
// var bcrypt = require('bcrypt');
var jsonfile = require('jsonfile');
var md5 = require('md5');
var validator = require("email-validator");
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'crud_db',
  insecureAuth: false
});
connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... nn");
} else {
    console.log("Error connecting database ... nn",err);
}
});

exports.register = function(req,res){
  // console.log("req",req.body);
  var today = new Date();
  // bcrypt.hash(req.body.password, 5, function( err, bcryptedPassword) {
   //save to db
   var users={
     "first_name":req.body.first_name,
     "last_name":req.body.last_name,
     "email":req.body.userid,
     "password":md5(req.body.password),
	 "role":req.body.role,
     "created":today,
     "modified":today
   }   
   if(req.body.userid.length === 0){
	   		 res.send({
		   "code":400,
		   "failed":"email cannot empty"
		 }) 
   } else if(req.body.password.length === 0){
	   		 res.send({
		   "code":400,
		   "failed":"password cannot empty"
		 }) 
   } else if(req.body.userid.length > 50){
	   		 res.send({
		   "code":401,
		   "failed":"email cannot longer than 50 characters"
		 }) 
   } else if (req.body.password.length < 4){
		   	res.send({
		   "code":402,
		   "failed":"password cannot least 4 characters"
		 }) 
   } else if (req.body.password.length > 20){
		   	res.send({
		   "code":402,
		   "failed":"password cannot  exceed 20 characters"
		 }) 
   } else if (!validator.validate(req.body.userid)){
	   		   	res.send({
		   "code":403,
		   "failed":"email is not valid"
		 }) 
   } else if (exports.checkemail(req.body.userid)){
	   		   	res.send({
		   "code":404,
		   "failed":"email is available"
		 }) 
   } else {
	   		connection.query('INSERT INTO users SET ?',users, function (error, results, fields) {
			   if (error) {
				 console.log("error ocurred",error);
				 res.send({
				   "code":400,
				   "failed":"error ocurred"
				 })
			   } else {
				//  console.log('The solution is: ', results);
				 res.send({
				   "code":200,
				   "success":"user registered sucessfully"
					 });
			   }
			   });
   }


}
exports.checkemail = function(val){
	  connection.query('SELECT * FROM users WHERE email = ?',val, function (error, results, fields) {
    if(results.length >0){
		return true;
	} else {
		return false;
	}
  });
}
exports.login = function(req,res){
  var userid= req.body.userid;
  var password = req.body.password;
  var role = req.body.role;
     if(req.body.userid.length === 0){
	   		 res.send({
		   "code":400,
		   "success":"email cannot empty"
		 }) 
   } else if(req.body.password.length === 0){
	   		 res.send({
		   "code":400,
		   "success":"password cannot empty"
		 }) 
   } else if(req.body.userid.length > 50){
	   		 res.send({
		   "code":401,
		   "success":"email cannot longer than 50 characters"
		 }) 
   } else if (req.body.password.length < 4){
		   	res.send({
		   "code":402,
		   "success":"password cannot least 4 characters"
		 }) 
   } else if (req.body.password.length > 20){
		   	res.send({
		   "code":402,
		   "success":"password cannot  exceed 20 characters"
		 }) 
   } else if (!validator.validate(req.body.userid)){
	   		   	res.send({
		   "code":403,
		   "success":"email is not valid"
		 }) 
   } else {
	  //begin query
	  connection.query('SELECT * FROM users WHERE email = ?',[userid], function (error, results, fields) {
	  if (error) {
		console.log("error ocurred",error);
		res.send({
		  "code":400,
		  "success":"error ocurred"
		})
	  }else{
		// console.log('The solution is: ', results[0].password,req.body.password,req.body.role);
		if(results.length >0){
		  if(results[0].password == md5(req.body.password)){
			if(results[0].role == req.body.role){
			  var file = './userdata/userid.json'
			  var obj = {userid: req.body.userid}
			  jsonfile.writeFile(file, obj, function (err) {
				if(err){
				  console.log("Error ocurred in writing json during login at login handler in login routes",err);
				}
			  })
			  res.send({
				"code":200,
				"success":"login sucessfull"
			  })
			}
			else{
			  res.send({
				"code":204,
				"success":"You have logged in from wrong user role"
			  })
			}

		  }
		  else{
			res.send({
				 "code":204,
				 "success":"Email and password does not match "
			})
		  }

		}
		else{
		  res.send({
			"code":204,
			"success":"Email does not exits"
			  });
		}


	  }
	  });
	  //end query
   }
}
