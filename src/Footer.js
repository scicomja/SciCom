import React from "react"
import { withRouter } from "react-router"

const style = {
	block: {
		flex: 1
	},
	centerBlock: {
		textAlign: "center",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "column",
		color: "white"
	}
}
export default class Footer extends React.Component {
	render() {
		return (
			<div className="Footer">
				<div style={style.block} />

				<div style={{ ...style.block, ...style.centerBlock }}>
					2019 sci-com.org®
					<div className="FooterContainer">
						<a href="#">Impressum</a> | <a href="#">Datenschutz</a> |{" "}
						<a href="#">Nutzungsbedingungen</a>
					</div>
				</div>
				<div style={style.block} />
			</div>
		)
	}
}
