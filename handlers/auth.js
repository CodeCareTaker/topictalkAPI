const db = require("./models");
const jwt = require("jsonwebtoken");

exports.login = async function(req, res, next){
  try {
  	//find user
  	let user = db.User.findOne({
  	  email: req.body.email
  	});
  	let { id, username, profileImageUrl } = user;
  	//checking if their password matches what was sent to the server
  	let isMatch = await user.comparePassword(req.body.password);
  	if (isMatch) {
  	  let token = jwt.sign({
  	    id,
  	    username,
  	    profileImageUrl
  	  }, process.env.SECRET_KEY)
  	return res.status(200).json({
  	  id,
  	  username,
  	  profileImageUrl,
  	  token
  	})
    } else {
  	  return next({
   	    status: 400,
  	    message: "Invalid Email/Password"
  	  })
    }
  } catch(err) {
  	return next({ status: 400, message: "Invalid Email/Password" });
  }
}

exports.register = async function(req, res, next) {
  try {
  	//create a user
  	//create a token(signing a token)
  	//process.env.SECRET_KEY
  	let user = await db.User.create(req.body);
  	let { id, username, profileImageUrl } = user;
  	let token = jwt.sign({
  	    id,
  	    username,
  	    profileImageUrl
  	  }, process.env.SECRET_KEY
  	);
  	return res.status(200).json({
  	  id,
  	  username,
  	  profileImageUrl,
  	  token
  	});
  } catch(err) {
  	//if a validation fails
  	if(err.code === 11000) {
  	  err.message = "Sorry, that username and/or email is taken";
  	}
  	//otherwise just send a generic 400
  	return next({
  	  status: 400,
  	  message: err.message
  	})
  }
}