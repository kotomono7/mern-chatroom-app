import "./Join.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Join() {
	const [username, setUsername] = useState("");
	const [roomId, setRoomId] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [validInput, setValidInput] = useState(false);

	const validateInput = (event) => {
		if (!username || !roomId) {
			event.preventDefault();
			setErrorMessage("Oops! Username and RoomID are required.");
		} else {
			setValidInput(true);
		}

		console.log(errorMessage);
	};

	return (
		<div className="join-outer-container">
			<div className="join-inner-container">
				<div className="join-chat">
					<div className="input">
						<h3 className="heading">Join Chatroom</h3>
						<input
							type="text"
							className="join-input"
							placeholder="Username"
							onChange={(event) => setUsername(event.target.value)}
						/>
						<input
							type="text"
							className="join-input"
							placeholder="RoomID"
							onChange={(event) => setRoomId(event.target.value)}
						/>

						<div className={validInput ? "error-info hide" : "error-info show"}>
							{errorMessage}
						</div>
					</div>

					<Link
						to="/chat"
						state={{ username: username, roomId: roomId }}
						onClick={(event) => validateInput(event)}
					>
						<button className="join-btn" type="submit">
							Join
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
}
