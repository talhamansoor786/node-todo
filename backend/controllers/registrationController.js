var bodyParser	= require('body-parser');
var mysql		= require('mysql');

module.exports = function(app, conn){
	app.use(function(req, res, next) {
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	  next();
	});

	// create application/x-www-form-urlencoded parser
	var urlencodedParser = bodyParser.urlencoded({extended:false});

	var regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	app.post('/register', urlencodedParser, function(req, res, next){
		if (Object.keys(req.body).length === 0){
			var err = {
				status:false,
				message:"All Fields Are Mandatory"
			};
			res.send(err);
			return false;
		}else{
			if(!req.body.email){
				var err = {
					status:false,
					message:"Email is Mandatory"
				};
				res.send(err);
				return false;
			}else if(!regexEmail.test(req.body.email)){
				var err = {
					status:false,
					message:"Email Address Is Not Valid"
				};
				res.send(err);
				return false;
			}else if(!req.body.gender){
				var err = {
					status:false,
					message:"Gender is Mandatory"
				};
				res.send(err);
				return false;
			}else if(!req.body.password){
				var err = {
					status:false,
					message:"Password is Mandatory"
				};
				res.send(err);
				return false;
			}else if(req.body.password !== req.body.confirmPassword){
				var err = {
					status:false,
					message:"Password and Confirm Password Doesn't Match"
				};
				res.send(err);
				return false;
			}
			var post  = {
				name:req.body.name,
				email:req.body.email,
				password:req.body.password,
				gender:req.body.gender
			};
			conn.query('INSERT INTO users SET ?', post, function (error, results){
				if(error){
					if(error.code == 'ER_DUP_ENTRY'){
						var err = {
							status:false,
							message:"Email Address Already Registered."
						};
					}else{
						var err = {
							status:false,
							message:"Something Went Wrong."
						};
					}
					res.send(err);
					return false;
				}else{
					var err = {
						status:true,
						userId:results.insertId,
						message:"Registered"
					};
					res.send(err);
					return false;
				}
			});
		}
	});
	
}