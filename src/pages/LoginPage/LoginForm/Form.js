import React from "react"
import * as Yup from "yup"
import { FormGroup as ReactstrapFormGroup, Input, Label } from "reactstrap"
import { Field, ErrorMessage } from "formik"
import * as _ from "lodash"

export const initialValues = {
	username: "",
	password: ""
}

export const validationSchema = Yup.object().shape({
	username: Yup.string().required(),
	password: Yup.string().required()
})

export function FormGroup({
	label,
	name,
	type = "text",
	errors,
	placeholder,
	handleChange
}) {
	return (
		<ReactstrapFormGroup style={style.formGroup}>
			<Label for={name}>{label || _.startCase(name)}</Label>
			<Input
				onChange={handleChange}
				placeholder={placeholder}
				tag={Field}
				name={name}
				type={type}
				invalid={errors && errors[name]}
			/>
			<ErrorMessage name={name} />
		</ReactstrapFormGroup>
	)
}

const style = {
	formGroup: {
		// flex: 1
	}
}
