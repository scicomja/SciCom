import React from "react"
import PropTypes from "prop-types"
import { FormGroup, CustomInput, Input } from "reactstrap"

export default class CheckboxWithOthers extends React.Component {
	static propTypes = {
		options: PropTypes.arrayOf(PropTypes.string).isRequired,
		onValueChange: PropTypes.func.isRequired,
		label: PropTypes.string.isRequired
	}
	constructor(props) {
		super(props)
		this.state = {
			selectedIndex: 0,
			value: null
		}
	}

	selectValue(selectedIndex) {
		const { options, onValueChange } = this.props
		const availableValues = this.availableValues()
		const value =
			selectedIndex >= availableValues.length
				? this.state.value
				: availableValues[selectedIndex]

		this.onInputChange(value)
		this.setState({ selectedIndex })
	}

	optionRow(optionName, index) {
		const selected = this.state.selectedIndex == index
		return (
			<div style={style.optionRow}>
				<CustomInput
					id={optionName}
					checked={selected}
					onClick={() => this.selectValue(index)}
					type="checkbox"
					label={optionName}
				/>
			</div>
		)
	}
	availableValues() {
		const { options = {} } = this.props
		return Object.keys(options)
	}
	onInputChange(value) {
		const { onValueChange } = this.props
		this.setState({ value })
		onValueChange && onValueChange(value)
	}
	render() {
		const { options, label, onValueChange } = this.props
		const { value, selectedIndex } = this.state
		const availableValues = this.availableValues()
		return (
			<div style={style.container}>
				<div style={style.label}>{label}</div>
				{availableValues.map((opt, i) => this.optionRow(opt, i))}
				{this.optionRow("Sonstiges", availableValues.length)}
				{selectedIndex >= availableValues.length && (
					<Input
						placeholder="Please specify..."
						type="text"
						value={value}
						onChange={e => this.onInputChange(e.currentTarget.value)}
					/>
				)}
			</div>
		)
	}
}

const style = {
	label: {},
	container: {},
	optionRow: {}
}
