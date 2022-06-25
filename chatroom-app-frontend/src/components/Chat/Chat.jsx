import "./Chat.css";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { io } from "socket.io-client";
import Info from "../Info/Info";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";

let socket;

export default function Chat() {
	const location = useLocation();
	const navigate = useNavigate();

	const [username, setUsername] = useState("");
	const [roomId, setRoomId] = useState("");
	// const [users, setUsers] = useState("");
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState([]);

	// const ENDPOINT = "http://localhost:5000";
	const ENDPOINT = "https://kotomono.herokuapp.com/";

	useEffect(() => {
		const { username, roomId } = location.state;

		setRoomId(roomId);
		setUsername(username);

		socket = io(ENDPOINT);
		socket.emit("join", { username, roomId }, (response) => {
			console.log("Callback: " + response.status);

			if (response.status !== "success") {
				if (response.status === "required")
					alert("Oops! Username and RoomID are required.");

				if (response.status === "duplicate")
					alert(
						"Sorry! Username is taken, please choose a different username."
					);

				navigate("/");
			}
		});

		return () => {
			socket.disconnect();
			socket.off();
		};
	}, [ENDPOINT, location.state, navigate]);

	useEffect(() => {
		socket.on("connect", () => {
			console.log("Connected to server");
		});

		socket.on("message", (message) => {
			setMessages((messages) => [...messages, message]);
		});

		socket.on("disconnect", (reason) => {
			console.log("Disconnected to server");
			console.log("Reason: " + reason);

			// alert("Oops! There is a connection problem :(");
			navigate("/");
		});

		// socket.on("roomData", ({ users }) => {
		// 	setUsers(users);
		// });
	}, [navigate]);

	const sendMessage = (event) => {
		event.preventDefault();

		if (message) {
			socket.emit("sendMessage", message, (response) => {
				console.log("sendMessage: " + response.status);
			});

			setMessage("");
		}
	};

	// just checking the value...
	console.log(messages);

	return (
		<div className="outer-container">
			<div className="container">
				<Info room={roomId} />
				<Messages messages={messages} username={username} />
				<Input
					message={message}
					setMessage={setMessage}
					sendMessage={sendMessage}
				/>
			</div>
		</div>
	);
}
