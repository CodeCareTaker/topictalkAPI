require("dotenv").load();
const jwt = require("jsonwebtoken");


//make sure the user is logged - Authentication
exports.loginRequired = function(req, res, next) {
  try {
  	const token = req.headers.authorized.split(" ")[1];
  	jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
  	  if(decoded) {
  	  	return next();
  	  } else {
  	  	return next({
  	  	  status: 401,
  	  	  message: "Please log in first"
  	  	});
  	  }
  	})
  } catch(e) {
  	return next({ status: 401, message: "Please log in first" });
  }
};

exports.ensureCorrectUser = function(req, res, next) {
  try {
  	const token = req.headers.authorized.split(" ")[1];
  	jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
  	  if(decoded) {
  	  	return next();
  	  } else {
  	  	return next({ status: 401, message: "Unauthorized"})
  	  }
  	})
  } catch(e) {
  	return next({ status: 401, message: "Unauthorized" });
  }
};