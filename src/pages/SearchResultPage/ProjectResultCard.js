import React from "react"

export default class ProjectResultCard extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isHovering: false
		}
	}

	extraStyle() {
		const { isHovering } = this.state
		return {} // TODO: this
	}

	render() {
		const { project, onClick } = this.props
		return (
			<div
				style={{ ...style.container, ...this.extraStyle() }}
				onClick={onClick}
				onMouseLeave={() => this.setState({ isHovering: false })}
				onMouseOver={() => this.setState({ isHovering: true })}
			/>
		)
	}
}

const style = {
	container: {
		display: "flex",
		flexDirection: "column",
		padding: 16
	}
}
