import React from "react";
import "./Header.css";
import Logo from "../../assets/Azent.jpeg";

function Header() {
	return (
		<div id="HeadContainer">
			<div className="LogoContainer">
				<img id="LogoImage" src={Logo} />
			</div>
		</div>
	);
}

export default Header;
