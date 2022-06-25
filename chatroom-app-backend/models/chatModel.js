const mongoose = require("mongoose");

const MsgSchema = new mongoose.Schema({
	text: {
		type: String,
		// required: true,
	},
});

const ChatSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	chatroom: {
		type: String,
		required: true,
	},
	messages: [MsgSchema],
});

module.exports = mongoose.model("Chat", ChatSchema);
