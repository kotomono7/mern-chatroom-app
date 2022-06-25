import "./Messages.css";
import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import Content from "./Content/Content";

export default function Messages({ messages, username }) {
	console.log(messages);

	return (
		<ScrollToBottom className="messages">
			<div className="content">
				{messages.map((message, index) => (
					<div key={index}>
						<Content message={message} username={username} />
					</div>
				))}
			</div>
		</ScrollToBottom>
	);
}
