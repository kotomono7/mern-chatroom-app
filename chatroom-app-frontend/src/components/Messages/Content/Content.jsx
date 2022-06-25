import "./Content.css";
import React from "react";
import ReactEmoji from "react-emoji";

const Content = ({ message: { user, text }, username }) => {
	let isSentByCurrentUser = false;

	if (user === username) {
		isSentByCurrentUser = true;
	}

	return !isSentByCurrentUser ? (
		<div className="message-left">
			<div className="sender-text justify-start">{user}</div>
			<div className="message-box bg-secondary">
				<p className="message-text color-dark">{ReactEmoji.emojify(text)}</p>
			</div>
			<div className="triangle-left"></div>
		</div>
	) : (
		<div className="message-right">
			{/* <div className="sender-text justify-end">{user}</div> */}
			<div className="message-box bg-primary">
				<p className="message-text color-white">{ReactEmoji.emojify(text)}</p>
			</div>
		</div>
	);
};

export default Content;
