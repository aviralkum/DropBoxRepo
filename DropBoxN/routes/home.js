var ejs = require("ejs");
var mysql = require('./mysql');


function signup(req,res)
{
    console.log('Hellp');
    res.render('SignUp.ejs');
}

function afterSignUp(req,res)
{
	
// parameters are :
	console.log("hell");
	console.log("heloo this"+req.param("Fname"));
	var Fname = req.param("Fname");
	var Lname = req.param("Lname");
	var Email  = req.param("email");
	var Password = req.param("pwd");
	var insertuser = "insert into User_SignUp values('"+Fname+"','"+Lname+"','"+Email+"','"+Password+"')";
	
	console.log("Query is:"+insertuser);
	
	mysql.InsertData(insertuser);
	 //res.render('RegistrationSuccess.ejs');
	
	ejs.renderFile('./views/RegistrationSuccess.ejs',function(err, result) {
		   // render on success
		   if (!err) {
		            res.end(result);
		   }
		   // render or error
		   else {
		            res.end('An error occurred');
		            console.log(err);
		   }
	   });
	   
	}

	

function signin(req,res) {

	ejs.renderFile('./views/signin.ejs',function(err, result) {
	   // render on success
	   if (!err) {
	            res.end(result);
	   }
	   // render or error
	   else {
	            res.end('An error occurred');
	            console.log(err);
	   }
   });
}

// this function will handle the path /aftersignin
function afterSignIn(req,res)
{
	// check user already exists
	var getUser="select * from users where username='"+req.param("inputUsername")+"' and password='" + req.param("inputPassword") +"'";
	console.log("Query is:"+getUser);
	console.log("Hiii");
	// mysql is the file name which has the function fetchData
	
	mysql.fetchData(function(err,results) {
		
		if(err){
			console.log("error");
			throw err;
		}
		// if ends here
		else 
		{
			
			if(results.length > 0){
				console.log("valid Login");
				ejs.renderFile('./views/successLogin.ejs', { data: results } , function(err, result) {
			        // render on success
			        if (!err) {
			        	console.log("Hiii5");
			            res.end(result);
			        }
			        // else ends here
			        else {
			        	console.log("Hii4");
			            res.end('An error occurred');
			            console.log(err);
			        }
			    });
				
			}
			
			else {    
				
				console.log("Invalid Login");
				ejs.renderFile('./views/failLogin.ejs',function(err, result) {
			        // render on success
			        if (!err) {
			            res.end(result);
			        }
			        // render or error
			        else {
			            res.end('An error occurred');
			            console.log(err);
			        }
			    });
			}
		}  
	}, getUser);
}

function getAllUsers(req,res)
{
	var getAllUsers = "select * from users";
	console.log("Query is:"+getAllUsers);
	
	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.length > 0){
				
				var rows = results;
				var jsonString = JSON.stringify(results);
				var jsonParse = JSON.parse(jsonString);
				
				console.log("Results Type: "+(typeof results));
				console.log("Result Element Type:"+(typeof rows[0].emailid));
				console.log("Results Stringify Type:"+(typeof jsonString));
				console.log("Results Parse Type:"+(typeof jsString));
				
				console.log("Results: "+(results));
				console.log("Result Element:"+(rows[0].emailid));
				console.log("Results Stringify:"+(jsonString));
				console.log("Results Parse:"+(jsonParse));
				
				ejs.renderFile('./views/successLogin.ejs',{data:jsonParse},function(err, result) {
			        // render on success
			        if (!err) {
			            res.end(result);
			        }
			        // render or error
			        else {
			            res.end('An error occurred');
			            console.log(err);
			        }
			    });
			}
			else {    
				
				console.log("No users found in database");
				ejs.renderFile('./views/failLogin.ejs',function(err, result) {
			        // render on success
			        if (!err) {
			            res.end(result);
			        }
			        // render or error
			        else {
			            res.end('An error occurred');
			            console.log(err);
			        }
			    });
			}
		}  
	},getAllUsers);
}

exports.signin=signin;
exports.afterSignUp=afterSignUp;
exports.afterSignIn=afterSignIn;
exports.getAllUsers=getAllUsers;
exports.signup=signup;