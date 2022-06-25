const chat = require("../models/chatModel");
const users = [];

const addUser = ({ id, username, roomId }) => {
	const existingUser = users.find(
		(user) => user.roomId === roomId && user.username === username
	);

	let existingChat = true;

	chat.find({ username: username, chatroom: roomId }, (err, result) => {
		if (err) console.log("Error: " + err);

		if (result.length > 0) {
			console.log("Username is taken");
			console.log("Existing data: " + result);

			existingChat = false;
		}
	});

	if (!username || !roomId) return { error: "error-required" };
	if (existingUser || existingChat) return { error: "error-duplicate" };

	const user = { id, username, roomId };

	users.push(user);

	return { user };
};

const removeUser = (id) => {
	const index = users.findIndex((user) => user.id === id);

	if (index !== -1) {
		return users.splice(index, 1)[0];
	}
};

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (roomId) =>
	users.find((roomId) => users.filter((user) => user.roomId === roomId));

module.exports = { getUser, getUsersInRoom, addUser, removeUser };
