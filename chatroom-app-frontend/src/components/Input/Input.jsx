import "./Input.css";
import React from "react";
import { FaArrowUp } from "react-icons/fa";

export default function Input({ message, setMessage, sendMessage }) {
	return (
		<form className="form" onSubmit={(event) => sendMessage(event)}>
			<div className="input-chat">
				<input
					type="text"
					className="input"
					placeholder="Message here..."
					value={message}
					onChange={(event) => setMessage(event.target.value)}
				/>
				<button className="send-btn" type="submit">
					<FaArrowUp />
				</button>
			</div>
		</form>
	);
}
