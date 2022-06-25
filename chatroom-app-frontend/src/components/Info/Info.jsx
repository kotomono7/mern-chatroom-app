import "./Info.css";
import React from "react";
import onlineIcon from "../../assets/online-icon.png";

export default function Info({ room }) {
	return (
		<div className="info-bar">
			<a href="/">Exit</a>
			<h3>{room}</h3>

			<div className="online-icon">
				<img src={onlineIcon} alt="online-icon" />
			</div>
		</div>
	);
}
