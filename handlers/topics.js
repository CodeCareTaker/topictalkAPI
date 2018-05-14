const db = require("./models");

exports.createTopic = async function(req, res, next) {
  try {
  	let topic = await db.Topic.create({
  	  title: req.body.title,
  	  text: req.body.text,
  	  section: req.body.section,
  	  user: req.user.id
  	});
  	let foundUser = await db.Topic.findById(req.user.id);
  	foundUser.topics.push(topic.id);
  	await foundUser.save();
  	let foundTopic = db.Topic.findById(topic._id).populate("user", {
  	  username: true,
  	  profileImageUrl: true
  	});
  	return res.status(200).json(foundTopic);
  } catch(err) {
  	return next(err);
  }
};

exports.getTopic = async function(req, res, next) {
  try {
  	let topic = await db.Topic.findById(req.params.id)
  	  .populate("user", {
  	  	username: true,
  	  	profileImageUrl: true
  	  })
  	  .populate("post");
  	return res.status(200).json(topic);
  } catch(err) {
  	return next(err);
  }
};

exports.updateTopic = async function(req, res, next) {
  try {
  	let topic = await db.Topic.findByIdAndUpdate(req.params.id, req.body.topic)
  } catch(err) {
  	return next(err);
  }
};

exports.deleteTopic = async function(req, res, next) {
  try {
  	let foundTopic = await db.Topic.findById(req.params.id);
  	await foundTopic.remove();
  	return res.status(200).json(foundTopic);
  } catch(err) {
  	return next(err);
  }
};