const express = require("express");
const router = express.Router();
const chat = require("../models/chatModel");

router.get("/", (req, res) => {
	// get availale chatroom data
	// chat.find((err, result) => {
	// 	if (err) {
	// 		console.log("Error: " + err);

	// 		throw new Error(err);
	// 	} else {
	// 		console.log(result);

	// 		res.json(result);
	// 	}
	// });

	res.send("Server up and running...");
});

// get data in the chatroom
router.get("/:room", (req, res) => {
	chat.find({ chatroom: req.params.room }, (err, result) => {
		if (err) {
			console.log("Error: " + err);

			throw new Error(err);
		} else {
			console.log(result);

			res.json(result);
		}
	});
});

// add new chat
router.post("/", (req, res) => {
	chat.create(req.body, (err, result) => {
		if (err) {
			console.log("Error: " + err);

			throw new Error(err);
		} else {
			console.log(result);

			res.json(result);
		}
	});
});

module.exports = router;
