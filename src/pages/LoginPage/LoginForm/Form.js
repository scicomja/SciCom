import React from "react"
import * as Yup from "yup"
import { FormGroup as ReactstrapFormGroup, Input, Label } from "reactstrap"
import { Field, ErrorMessage } from "formik"
import * as _ from "lodash"
import Locale from "../../../locale"

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
			<Input
				onChange={handleChange}
				placeholder={placeholder}
				tag={Field}
				name={name}
				type={type}
				invalid={errors && errors[name]}
			/>
			<ErrorMessage name={name}>
				{msg => <div> Bitte geben Sie {Locale.loginForm[name]} ein </div>}
			</ErrorMessage>
		</ReactstrapFormGroup>
	)
}

const style = {
	formGroup: {
		width: "100%"
	}
}
