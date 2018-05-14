const mongoose = require("mongoose");
const User = require("./user");


const topicSchema = new mongoose.Schema({
  title: { type: String, required: true, maxLength: 50 },
  text: { type: String, required: true, maxLength: 3000 },
  section: { type: String, required: true },
  created: { type: String, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }]
});

topicSchema.pre('remove', async function(next){
  try {
  	//find a user
  	let user = await User.findById(this.userId);
  	//remove the topic from, their list of topics
  	user.topics.remove(this.id);
  	//save that user
  	await user.save();
  } catch(err) {
  	return next(err);
  }
});

const Topic = mongoose.model("Topic", topicSchema);

module.exports = Topic;