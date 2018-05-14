require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const db = require("./models");
const errorHandler = require("./handlers/error");
const authRoutes = require("./routes/auth");
const topicRoutes = require("./routes/topics");
const postRoutes = require("./routes/posts");
const { loginRequired, ensureCorrectUser } = require("./middleware/auth");
const PORT = 8081;

app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use(
  "/api/topics",
  loginRequired,
  ensureCorrectUser,
  topicRoutes
);
app.use(
  "/api/topics/:id/posts",
   loginRequired,
   ensureCorrectUser,
   postRoutes
);

// TopicTalk section index routes
app.get("/api/topics/general", loginRequired, async function(req, res, next) {
  try {
  	let topics = await db.Topic.find({ section: "General" })
  	  .sort({ created: -1 })
  	  .populate("user", {
  	  	username: true,
  	  	profileImageUrl: true
  	  });
  	  return res.status(200).json(topics);
  } catch(err) {
  	return next(err);
  }
});

app.get("/api/topics/generalNewest", async function(req, res, next) {
  try {
  	let topics = await db.Topic.find({ section: "General" })
  	  .sort({ created: 1 })
  	  .populate("user", {
  	  	username: true,
  	  	profileImageUrl: true
  	  });
  	  return res.status(200).json(topics);
  } catch(err) {
  	return next(err);
  }
});

app.get("/api/topics/media", async function(req, res, next) {
  try {
  	let topics = await db.Topic.find({ section: "Media" })
  	  .sort({ created: -1 })
  	  .populate("user", {
  	  	username: true,
  	  	profileImageUrl: true
  	  });
  	  return res.status(200).json(topics);
  } catch(err) {
  	return next(err);
  }
});

app.get("/api/topics/mediaNewest", async function(req, res, next) {
  try {
  	let topics = await db.Topic.find({ section: "Media" })
  	  .sort({ created: 1 })
  	  .populate("user", {
  	  	username: true,
  	  	profileImageUrl: true
  	  });
  	  return res.status(200).json(topics);
  } catch(err) {
  	return next(err);
  }
});

app.get("/api/topics/technology", async function(req, res, next) {
  try {
  	let topics = await db.Topic.find({ section: "Technology" })
  	  .sort({ created: -1 })
  	  .populate("user", {
  	  	username: true,
  	  	profileImageUrl: true
  	  });
  	  return res.status(200).json(topics);
  } catch(err) {
  	return next(err);
  }
});

app.get("/api/topics/technologyNewest", async function(req, res, next) {
  try {
  	let topics = await db.Topic.find({ section: "Technology" })
  	  .sort({ created: 1 })
  	  .populate("user", {
  	  	username: true,
  	  	profileImageUrl: true
  	  });
  	  return res.status(200).json(topics);
  } catch(err) {
  	return next(err);
  }
});

app.get("/api/topics/news", async function(req, res, next) {
  try {
  	let topics = await db.Topic.find({ section: "News" })
  	  .sort({ created: -1 })
  	  .populate("user", {
  	  	username: true,
  	  	profileImageUrl: true
  	  });
  	  return res.status(200).json(topics);
  } catch(err) {
  	return next(err);
  }
});

app.get("/api/topics/newsNewest", async function(req, res, next) {
  try {
  	let topics = await db.Topic.find({ section: "News" })
  	  .sort({ created: 1 })
  	  .populate("user", {
  	  	username: true,
  	  	profileImageUrl: true
  	  });
  	  return res.status(200).json(topics);
  } catch(err) {
  	return next(err);
  }
});

//404 Handler
app.use(function(req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(errorHandler);

app.listen(PORT, function(){
  console.log(`Server is starting on port: $(PORT)`);
});