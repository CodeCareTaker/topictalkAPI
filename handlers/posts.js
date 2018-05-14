const db = require("./models");

exports.createPost = async function(req, res, next) {
  try {
  	let post = await db.Post.create({
  	  text: req.body.text,
  	  topic: req.params.id,
	  user: req.user.id
  	});
  	let foundTopic = await db.Topic.findById(req.params.id);
  	foundTopic.posts.push(post.id);
  	let foundUser = await db.User.findById(req.user.id);
  	foundUser.posts.push(post.id);
  	await foundUser.save();
  	let foundPost = db.Post.findById(post._id).populate("user", {
  		username: true,
  		profileImageUrl: true
  	});
  	return res.status(200).json(foundPost);
  } catch(err) {
  	return next(err);
  }
}

exports.getPost = async function(req, res, next) {
  try {
  	let post = await db.Post.findById(req.params.post_id)
  	.populate("user", {
  	  username: true,
  	  profileImageUrl: true
  	});
  	return res.status(200).json(post);
  } catch(err) {
  	return next(err);
  }
}

exports.updatePost = async function(req, res, next) {
  try {
  	let post = await db.Post.findByIdAndUpdate(req.params.post_id, req.body.post);
  	return res.status(200).json(post);
  } catch(err) { 
    return next(err);
  }
}

exports.deletePost = async function(req, res, next) {
  try {
  	let foundPost = await db.Post.findById(req.params.post_id);
  	await foundPost.remove();
  	return res.status(200).json(foundPost);
  } catch(err) {
  	return next(err);
  }
}