const mongoose = require("mongoose");

const dbUrl =
	"mongodb+srv://kotomono:kotomono.7@cluster0.qasbffu.mongodb.net/chatroomAppMern?retryWrites=true&w=majority";

const connParams = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

mongoose
	.connect(dbUrl, connParams)
	.then(() => {
		console.log("Connected to MongoDB");
	})
	.catch((err) => {
		console.log("Error: " + err);
	});
