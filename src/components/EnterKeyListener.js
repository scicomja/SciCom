// HOC listening to enter key cnd call it's method accordingly
import React from "react"

export default function(WrappedComponent) {
	class Component extends React.Component {
		constructor(props) {
			super(props)

			this.state = {
				isListeningToEnterKey: false
			}

			this.ref = React.createRef()
		}
		listenToEnterKey(isListening) {
			this.setState({
				isListeningToEnterKey: isListening
			})
		}
		handleKey(e) {
			if (e.key === "Enter" && this.state.isListeningToEnterKey) {
				const { onEnter } = this.ref.current
				// call the 'onEnter' method of the wrapped component in case
				// make sure the "this" is really the wrapped component to make others' life easier
				onEnter && onEnter.bind(this.ref.current)()
			}
		}
		render() {
			return (
				<WrappedComponent
					ref={this.ref}
					{...this.props}
					onKeyDown={this.handleKey.bind(this)}
					onBlur={() => this.listenToEnterKey(false)}
					onFocus={() => this.listenToEnterKey(true)}
				/>
			)
		}
	}

	return Component
}
