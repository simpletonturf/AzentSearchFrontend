import React from "react";
import "./Card.css";
import { Avatar } from "@material-ui/core";

function Card({ collegeName }) {
	return (
		<div className="CardContainer">
			<Avatar alt={collegeName} src="Javascript.void(0)" />
			<div className="CollegeName">{collegeName}</div>
			<div className="Description">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
				tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
				veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
				commodo consequat.
			</div>
		</div>
	);
}

export default Card;
