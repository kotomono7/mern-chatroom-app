const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const {
	getUser,
	addUser,
	removeUser,
	getUsersInRoom,
} = require("./controllers/chatController");

const router = require("./routes/chatRoutes");
const chat = require("./models/chatModel");

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"],
	},
});

require("./config/dbConnection");

app.use(express.json());
app.use(cors());

app.use(router);

io.on("connection", (socket) => {
	console.log("We had a new connection :)");
	console.log("SocketID: " + socket.id);

	socket.on("join", ({ username, roomId }, callback) => {
		const { user, error } = addUser({ id: socket.id, username, roomId });

		if (error) {
			if (error === "error-required") callback({ status: "required" });
			if (error === "error-duplicate") callback({ status: "duplicate" });
		}

		if (user) {
			chat.create({ username: username, chatroom: roomId }, (err, result) => {
				if (err) console.log("Error: " + err);

				console.log(result);
			});

			socket.join(user.roomId);
			console.log(`'${username}' has joined the room '${roomId}'`);

			// send welcome message to the client who just joined in the chatroom
			socket.emit("message", {
				user: "Admin",
				text: `Hi ${user.username}, welcome to the room ${user.roomId}!`,
			});

			// broadcast notification message to all clients in the chatroom
			socket.to(user.roomId).emit("message", {
				user: "Admin",
				text: `${user.username} has joined!`,
			});

			io.to(user.roomId).emit("roomData", {
				roomId: user.roomId,
				users: getUsersInRoom(user.roomId),
			});

			callback({ status: "success" });
		}
	});

	socket.on("sendMessage", (message, callback) => {
		const user = getUser(socket.id);

		if (user) {
			chat.findOneAndUpdate(
				{ username: user.username, chatroom: user.roomId },
				{ messages: { text: message } },
				{ new: true },
				(err, result) => {
					if (err) console.log("Error: " + err);

					console.log(result);
				}
			);

			io.to(user.roomId).emit("message", {
				user: user.username,
				text: message,
			});

			callback({ status: "success" });
		}
	});

	socket.on("disconnect", () => {
		const user = removeUser(socket.id);

		if (user) {
			console.log(`'${user.username}' has left the room '${user.roomId}'`);

			io.to(user.roomId).emit("message", {
				user: "Admin",
				text: `${user.username} has left.`,
			});

			io.to(user.roomId).emit("roomData", {
				roomId: user.roomId,
				users: getUsersInRoom(user.roomId),
			});
		}
	});
});

server.listen(PORT, () => {
	console.log(`Server started and running on port ${PORT}`);
});
