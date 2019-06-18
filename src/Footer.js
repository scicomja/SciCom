import React from "react"
import { withRouter } from "react-router"
import footer from "./footer.png"

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
	},
	footerContainer: {
		margin: 16,
		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-end"
	},
	logo: {
		height: 96
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
				<div style={{ ...style.block, ...style.footerContainer }}>
					<img src={footer} style={style.logo} />
				</div>
			</div>
		)
	}
}
